import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Heart,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Flame,
  Tag,
  Sparkles,
  CreditCard,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function QuickViewModal() {
  const {
    quickViewProperty,
    setQuickViewProperty,
    openPropertyDetail,
    formatPrice,
    formatDualPrice,
    formatArea,
    calculatePricePerM2,
    currency,
    isInWishlist,
    toggleWishlist,
    setInquiryModalProperty
  } = useApp();

  const [activeIdx, setActiveIdx] = useState(0);

  if (!quickViewProperty) return null;

  const images = quickViewProperty.images || [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
  ];
  const isFavorited = isInWishlist(quickViewProperty.id);
  const dual = formatDualPrice(quickViewProperty.priceUSD);
  const secondary = currency === 'USD' ? dual.uzs : dual.usd;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProperty(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Carousel */}
          <div className="relative aspect-[4/3] md:aspect-auto h-full min-h-[300px] bg-slate-950">
            <img
              src={images[activeIdx]}
              alt={quickViewProperty.title}
              className="w-full h-full object-cover"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {quickViewProperty.isHotDeal && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-rose-500 text-white">
                  <Flame className="w-3 h-3" /> Hot Deal
                </span>
              )}
              {quickViewProperty.hasInstallment && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-slate-900/90 text-emerald-400 border border-emerald-500/30">
                  <CreditCard className="w-3 h-3" /> 0% Installment
                </span>
              )}
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveIdx(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveIdx(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            <div className="absolute bottom-3 left-3 text-white text-[10px] bg-black/60 px-2 py-0.5 rounded-md">
              {activeIdx + 1} / {images.length} photos
            </div>
          </div>

          {/* Right Info */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  {quickViewProperty.location.district}
                </span>
                <span className="font-bold uppercase text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                  {quickViewProperty.type}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
                {quickViewProperty.title}
              </h3>

              <div className="my-3">
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {formatPrice(quickViewProperty.priceUSD)}
                </div>
                <div className="text-xs text-slate-500 space-x-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {calculatePricePerM2(quickViewProperty.priceUSD, quickViewProperty.areaM2)}
                  </span>
                  <span>•</span>
                  <span>{secondary}</span>
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 mb-3">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Bedrooms</span>
                  <strong>{quickViewProperty.bedrooms} Beds</strong>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Bathrooms</span>
                  <strong>{quickViewProperty.bathrooms} Baths</strong>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Area</span>
                  <strong>{formatArea(quickViewProperty.areaM2)}</strong>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {quickViewProperty.description}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const prop = quickViewProperty;
                    setQuickViewProperty(null);
                    openPropertyDetail(prop);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Full Property Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProperty.id)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isFavorited
                      ? 'border-rose-300 bg-rose-50 text-rose-500 dark:bg-rose-950/60'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  const prop = quickViewProperty;
                  setQuickViewProperty(null);
                  setInquiryModalProperty(prop);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5"
              >
                <span>Schedule VIP Tour</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
