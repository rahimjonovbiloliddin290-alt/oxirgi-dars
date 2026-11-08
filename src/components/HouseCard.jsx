import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Sparkles,
  Flame,
  Tag,
  CreditCard,
  Eye,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function HouseCard({ property, viewMode = 'grid' }) {
  const {
    formatPrice,
    formatDualPrice,
    formatArea,
    calculatePricePerM2,
    currency,
    areaUnit,
    isInWishlist,
    toggleWishlist,
    openPropertyDetail,
    setQuickViewProperty,
    setInquiryModalProperty
  } = useApp();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = property.images && property.images.length > 0 ? property.images : [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
  ];

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const isFavorited = isInWishlist(property.id);

  // Discount percentage calculation
  const discountPercent =
    property.originalPriceUSD && property.originalPriceUSD > property.priceUSD
      ? Math.round(((property.originalPriceUSD - property.priceUSD) / property.originalPriceUSD) * 100)
      : null;

  const dualPrice = formatDualPrice(property.priceUSD);
  const secondaryPrice = currency === 'USD' ? dualPrice.uzs : dualPrice.usd;

  // Grid layout
  if (viewMode === 'grid') {
    return (
      <div
        onClick={() => openPropertyDetail(property)}
        className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1.5"
      >
        {/* Image Carousel Container */}
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20 pointer-events-none" />

          {/* Status Badges */}
          <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
            {property.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}

            {property.isHotDeal && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-md animate-pulse">
                <Flame className="w-3 h-3" />
                Hot Deal
              </span>
            )}

            {discountPercent && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-emerald-600 text-white shadow-md">
                <Tag className="w-3 h-3" />
                -{discountPercent}%
              </span>
            )}

            {property.hasInstallment && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-slate-900/85 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                <CreditCard className="w-3 h-3" />
                0% Installment
              </span>
            )}
          </div>

          {/* Quick Actions (Wishlist & Quick View) */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuickViewProperty(property);
              }}
              className="p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-md opacity-0 group-hover:opacity-100 duration-200"
              title="Quick preview"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(property.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                isFavorited
                  ? 'bg-rose-500 text-white shadow-rose-500/30 scale-105'
                  : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-900'
              }`}
              title={isFavorited ? 'Remove from saved' : 'Save to wishlist'}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Carousel Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Image Count & Dots */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-semibold pointer-events-none z-10">
            <span className="px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md">
              {currentImageIndex + 1} / {images.length} photos
            </span>

            {/* Dots */}
            {images.length > 1 && (
              <div className="flex items-center gap-1">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex ? 'w-4 bg-emerald-400' : 'w-1.5 bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col flex-1">
          {/* Location & Property Type */}
          <div className="flex items-center justify-between gap-2 text-xs mb-2">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium truncate">
              <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span className="truncate">{property.location.district}, {property.location.city}</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
              {property.type}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-500 transition-colors mb-2">
            {property.title}
          </h3>

          {/* Key Specs Row */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300 mb-4">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-emerald-500" />
              <span className="font-semibold">{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-emerald-500" />
              <span className="font-semibold">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-emerald-500" />
              <span className="font-semibold">{formatArea(property.areaM2)}</span>
            </div>
          </div>

          {/* Amenities preview tags */}
          <div className="flex flex-wrap gap-1 mb-4 overflow-hidden max-h-6">
            {property.amenities.slice(0, 3).map((amenity, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/90 text-slate-500 dark:text-slate-400 font-medium"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 text-slate-400 font-medium">
                +{property.amenities.length - 3}
              </span>
            )}
          </div>

          {/* Pricing & Footer Row */}
          <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  {formatPrice(property.priceUSD)}
                </span>
                {property.originalPriceUSD && property.originalPriceUSD > property.priceUSD && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(property.originalPriceUSD)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {calculatePricePerM2(property.priceUSD, property.areaM2)}
                </span>
                <span>•</span>
                <span>{secondaryPrice}</span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setInquiryModalProperty(property);
              }}
              className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-slate-950 transition-all font-semibold"
              title="Schedule tour or contact agent"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // List layout
  return (
    <div
      onClick={() => openPropertyDetail(property)}
      className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col md:flex-row cursor-pointer transform hover:-translate-y-1"
    >
      {/* Image Carousel (Left) */}
      <div className="relative md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
          {property.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-500 text-white shadow-md">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
          {property.isHotDeal && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-rose-500 text-white shadow-md">
              <Flame className="w-3 h-3" />
              Hot Deal
            </span>
          )}
          {discountPercent && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-600 text-white">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(property.id);
          }}
          className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-all shadow-md z-10 ${
            isFavorited
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-rose-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
        </button>

        {/* Carousel controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-all z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-all z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        <div className="absolute bottom-3 left-3 text-white text-[11px] font-semibold bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md">
          {currentImageIndex + 1} / {images.length} photos
        </div>
      </div>

      {/* Details & Specs (Right) */}
      <div className="p-6 md:w-3/5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>{property.location.address}</span>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider">
              {property.type}
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors mb-2">
            {property.title}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
            {property.description}
          </p>

          {/* Specs */}
          <div className="flex flex-wrap items-center gap-4 py-2.5 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 mb-4">
            <span className="flex items-center gap-1.5 font-semibold">
              <Bed className="w-4 h-4 text-emerald-500" /> {property.bedrooms} Bedrooms
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <Bath className="w-4 h-4 text-emerald-500" /> {property.bathrooms} Bathrooms
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <Maximize2 className="w-4 h-4 text-emerald-500" /> {formatArea(property.areaM2)}
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {calculatePricePerM2(property.priceUSD, property.areaM2)}
            </span>
          </div>

          {/* Amenities tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {property.amenities.slice(0, 5).map((amenity, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {formatPrice(property.priceUSD)}
              </span>
              {property.originalPriceUSD && property.originalPriceUSD > property.priceUSD && (
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(property.originalPriceUSD)}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Equivalent: <span className="font-semibold text-slate-700 dark:text-slate-300">{secondaryPrice}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuickViewProperty(property);
              }}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Quick View
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setInquiryModalProperty(property);
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <span>Schedule Tour</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
