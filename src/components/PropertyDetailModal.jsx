import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import MortgageCalculator from './MortgageCalculator';
import {
  X,
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Building,
  Car,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Flame,
  Tag,
  Sparkles,
  CreditCard,
  Phone,
  Send,
  ExternalLink,
  Navigation,
  Compass,
  ArrowRight,
  Wifi,
  Trees,
  Maximize,
  Layers
} from 'lucide-react';

export default function PropertyDetailModal() {
  const {
    selectedProperty,
    closePropertyDetail,
    formatPrice,
    formatDualPrice,
    formatArea,
    calculatePricePerM2,
    currency,
    areaUnit,
    isInWishlist,
    toggleWishlist,
    setInquiryModalProperty,
    properties,
    openPropertyDetail,
    showToast
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!selectedProperty) return null;

  const images = selectedProperty.images && selectedProperty.images.length > 0
    ? selectedProperty.images
    : ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"];

  const isFavorited = isInWishlist(selectedProperty.id);
  const dualPrice = formatDualPrice(selectedProperty.priceUSD);
  const secondaryPrice = currency === 'USD' ? dualPrice.uzs : dualPrice.usd;

  const discountPercent =
    selectedProperty.originalPriceUSD && selectedProperty.originalPriceUSD > selectedProperty.priceUSD
      ? Math.round(((selectedProperty.originalPriceUSD - selectedProperty.priceUSD) / selectedProperty.originalPriceUSD) * 100)
      : null;

  // Similar properties in same district or category
  const similarProps = properties
    .filter(p => p.id !== selectedProperty.id && (p.location.district === selectedProperty.location.district || p.type === selectedProperty.type))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property link copied to clipboard!', 'success');
    } else {
      showToast('Sharing link: ' + selectedProperty.title, 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-start justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
        {/* Sticky Modal Top Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedProperty.location.city}</span>
            <span>/</span>
            <span>{selectedProperty.location.district}</span>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-bold truncate max-w-[200px]">{selectedProperty.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(selectedProperty.id)}
              className={`p-2 rounded-xl transition-all ${
                isFavorited
                  ? 'bg-rose-50 text-rose-500 dark:bg-rose-950/60'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isFavorited ? 'Remove from saved' : 'Save to wishlist'}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={closePropertyDetail}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 space-y-8">
          {/* High-Res Gallery Showcase */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-950 group">
              <img
                src={images[activeImageIndex]}
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
              />

              {/* Badges on main photo */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                {selectedProperty.featured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase bg-amber-500 text-white shadow-lg">
                    <Sparkles className="w-3.5 h-3.5" /> Featured
                  </span>
                )}
                {selectedProperty.isHotDeal && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase bg-rose-500 text-white shadow-lg animate-pulse">
                    <Flame className="w-3.5 h-3.5" /> Hot Deal
                  </span>
                )}
                {discountPercent && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-600 text-white shadow-lg">
                    <Tag className="w-3.5 h-3.5" /> -{discountPercent}% OFF
                  </span>
                )}
                {selectedProperty.hasInstallment && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase bg-slate-900/90 text-emerald-400 border border-emerald-500/40">
                    <CreditCard className="w-3.5 h-3.5" /> 0% Installment Available
                  </span>
                )}
              </div>

              {/* Prev / Next Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Fullscreen view trigger */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white text-xs font-bold backdrop-blur-md flex items-center gap-1.5 z-10 transition-colors"
              >
                <Maximize className="w-3.5 h-3.5" />
                <span>View Fullscreen ({images.length})</span>
              </button>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-16 sm:w-28 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0 transition-all ${
                      idx === activeImageIndex
                        ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-900 scale-95 opacity-100'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`thumbnail-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title, Address, and Price Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  {selectedProperty.type}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Ref ID: #{selectedProperty.id}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {selectedProperty.title}
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{selectedProperty.location.address}</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="md:text-right bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-baseline gap-2 md:justify-end">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  {formatPrice(selectedProperty.priceUSD)}
                </span>
                {selectedProperty.originalPriceUSD && selectedProperty.originalPriceUSD > selectedProperty.priceUSD && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(selectedProperty.originalPriceUSD)}
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 space-y-0.5">
                <p className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {calculatePricePerM2(selectedProperty.priceUSD, selectedProperty.areaM2)}
                </p>
                <p>Local Currency: <strong className="text-slate-700 dark:text-slate-300">{secondaryPrice}</strong></p>
              </div>
            </div>
          </div>

          {/* Key Specs Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
              <Bed className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <span className="block text-xs text-slate-400">Bedrooms</span>
              <strong className="text-sm font-bold text-slate-900 dark:text-white">{selectedProperty.bedrooms} Beds</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
              <Bath className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <span className="block text-xs text-slate-400">Bathrooms</span>
              <strong className="text-sm font-bold text-slate-900 dark:text-white">{selectedProperty.bathrooms} Baths</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
              <Maximize2 className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <span className="block text-xs text-slate-400">Area ({areaUnit})</span>
              <strong className="text-sm font-bold text-slate-900 dark:text-white">{formatArea(selectedProperty.areaM2)}</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
              <Layers className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <span className="block text-xs text-slate-400">Floor Level</span>
              <strong className="text-sm font-bold text-slate-900 dark:text-white">{selectedProperty.floor} / {selectedProperty.totalFloors}</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
              <Car className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <span className="block text-xs text-slate-400">Parking Bays</span>
              <strong className="text-sm font-bold text-slate-900 dark:text-white">{selectedProperty.parkingSpaces} Cars</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
              <Calendar className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <span className="block text-xs text-slate-400">Year Built</span>
              <strong className="text-sm font-bold text-slate-900 dark:text-white">{selectedProperty.yearBuilt}</strong>
            </div>
          </div>

          {/* Property Description & Amenities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Property Overview & Architectural Highlights
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {selectedProperty.description}
                </p>
              </div>

              {/* Verified Amenities Grid */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  Interior & Exterior Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedProperty.amenities.map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="truncate">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Visual Map Simulator */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-emerald-500" />
                    Location & Neighborhood Infrastructure
                  </h3>
                  <span className="text-xs text-slate-400">GPS: {selectedProperty.location.coordinates.lat}°N, {selectedProperty.location.coordinates.lng}°E</span>
                </div>

                <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 p-6 text-white min-h-[220px] flex flex-col justify-between shadow-inner">
                  {/* Visual Map Background Grid Simulation */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Property Center Pin */}
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-bounce">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{selectedProperty.title}</h4>
                      <p className="text-xs text-emerald-400">{selectedProperty.location.address}</p>
                    </div>
                  </div>

                  {/* Nearby Infrastructure Points */}
                  <div className="relative z-10 mt-6 pt-4 border-t border-slate-800">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Nearby Walking & Driving Distances:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {selectedProperty.nearbyPoints?.map((pt, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                          <span className="text-[10px] text-emerald-400 font-extrabold uppercase">{pt.distance}</span>
                          <p className="text-xs font-semibold text-slate-200 truncate">{pt.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dedicated Agent Card & Inquiry Action */}
            <div className="space-y-6">
              {/* Agent Card */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  Dedicated Listing Broker
                </span>

                <div className="flex items-center gap-3">
                  <img
                    src={selectedProperty.agent.image}
                    alt={selectedProperty.agent.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/30"
                  />
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {selectedProperty.agent.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {selectedProperty.agent.role}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" /> Licensed & Verified
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={`tel:${selectedProperty.agent.phone}`}
                    className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Call {selectedProperty.agent.phone}</span>
                  </a>

                  <button
                    onClick={() => setInquiryModalProperty(selectedProperty)}
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Schedule VIP In-Person Tour</span>
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-400 space-y-1">
                  <p>• Free consultation with licensed real estate attorney</p>
                  <p>• Title deed & cadastral verification guaranteed</p>
                  <p>• Zero agency markup on developer properties</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preloaded Mortgage & Installment Calculator */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Financing & Installment Breakdown for {selectedProperty.title}
            </h3>
            <MortgageCalculator initialPrice={selectedProperty.priceUSD} property={selectedProperty} />
          </div>

          {/* Similar Recommended Properties */}
          {similarProps.length > 0 && (
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Similar Properties in {selectedProperty.location.district}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {similarProps.map((simProp) => (
                  <div
                    key={simProp.id}
                    onClick={() => openPropertyDetail(simProp)}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-emerald-500 cursor-pointer transition-all flex gap-3 group"
                  >
                    <img
                      src={simProp.images[0]}
                      alt={simProp.title}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase block truncate">
                        {simProp.location.district}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-500">
                        {simProp.title}
                      </h4>
                      <p className="text-xs font-black text-slate-900 dark:text-white mt-1">
                        {formatPrice(simProp.priceUSD)}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {simProp.bedrooms} Beds • {formatArea(simProp.areaM2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-between p-4">
          <div className="w-full flex justify-between items-center text-white py-2">
            <span className="text-xs font-bold">{selectedProperty.title} ({activeImageIndex + 1}/{images.length})</span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="relative max-w-5xl max-h-[80vh] flex items-center justify-center">
            <img
              src={images[activeImageIndex]}
              alt="Fullscreen"
              className="max-h-[80vh] max-w-full object-contain rounded-2xl"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-2 p-3 rounded-full bg-black/60 text-white hover:bg-black/80"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setActiveImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 p-3 rounded-full bg-black/60 text-white hover:bg-black/80"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumb"
                onClick={() => setActiveImageIndex(idx)}
                className={`w-16 h-12 object-cover rounded-lg cursor-pointer transition-opacity ${
                  idx === activeImageIndex ? 'ring-2 ring-emerald-500 opacity-100' : 'opacity-40 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
