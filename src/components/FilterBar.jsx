import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DISTRICTS_LIST, PROPERTY_TYPES, AMENITIES_LIST } from '../data/mockProperties';
import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  Search,
  MapPin,
  Home,
  DollarSign,
  ChevronDown,
  Sparkles,
  Flame,
  Tag,
  CreditCard,
  X
} from 'lucide-react';

export default function FilterBar({ totalResults }) {
  const { filters, setFilters, resetFilters, formatPrice, currency } = useApp();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handlePriceMinChange = (e) => {
    const val = Number(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceMin: Math.min(val, prev.priceMax - 10000)
    }));
  };

  const handlePriceMaxChange = (e) => {
    const val = Number(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceMax: Math.max(val, prev.priceMin + 10000)
    }));
  };

  const toggleAmenity = (amenity) => {
    setFilters(prev => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity]
      };
    });
  };

  // Check if any filter is active
  const isFiltered =
    filters.searchKeyword !== '' ||
    filters.district !== 'All Districts' ||
    filters.type !== 'All' ||
    filters.priceMin > 50000 ||
    filters.priceMax < 1000000 ||
    filters.bedrooms !== 'All' ||
    filters.status !== 'All' ||
    filters.amenities.length > 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-sm mb-8 transition-colors">
      {/* Top Filter Row: Search, District, Type, View Modes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search Keyword */}
        <div className="relative">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            Keyword or Title
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Penthouse, Boulevard..."
              value={filters.searchKeyword}
              onChange={(e) => setFilters(prev => ({ ...prev, searchKeyword: e.target.value }))}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            {filters.searchKeyword && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, searchKeyword: '' }))}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* District Selector */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            Location / District
          </label>
          <div className="relative">
            <select
              value={filters.district}
              onChange={(e) => setFilters(prev => ({ ...prev, district: e.target.value }))}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none"
            >
              {DISTRICTS_LIST.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
            <MapPin className="w-4 h-4 text-emerald-500 absolute left-3 top-3 pointer-events-none" />
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            Property Category
          </label>
          <div className="relative">
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none"
            >
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type === 'All' ? 'All Property Types' : type}
                </option>
              ))}
            </select>
            <Home className="w-4 h-4 text-emerald-500 absolute left-3 top-3 pointer-events-none" />
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Sort & View Mode Controls */}
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">New Arrivals (2024)</option>
              <option value="sqm-price">Price / m² (Lowest)</option>
            </select>
          </div>

          {/* Grid / List Toggles */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-[42px]">
            <button
              onClick={() => setFilters(prev => ({ ...prev, viewMode: 'grid' }))}
              className={`p-2 rounded-lg transition-all ${
                filters.viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFilters(prev => ({ ...prev, viewMode: 'list' }))}
              className={`p-2 rounded-lg transition-all ${
                filters.viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Price Range Slider Box */}
      <div className="py-4 px-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              Dynamic Price Budget Range
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Interactive filter from $50K up to $1M+ USD
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/20">
              {formatPrice(filters.priceMin)}
            </span>
            <span className="text-slate-400 text-xs font-bold">—</span>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/20">
              {formatPrice(filters.priceMax)}
            </span>
          </div>
        </div>

        {/* Dual Slider Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-[11px] text-slate-500 mb-1">
              <span>Minimum Budget</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                ${filters.priceMin.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="50000"
              max="900000"
              step="10000"
              value={filters.priceMin}
              onChange={handlePriceMinChange}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-slate-500 mb-1">
              <span>Maximum Budget</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                ${filters.priceMax.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="100000"
              max="1000000"
              step="10000"
              value={filters.priceMax}
              onChange={handlePriceMaxChange}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Middle Quick Badges & Bedrooms */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        {/* Bedroom count pills */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mr-1">
            Bedrooms:
          </span>
          {['All', '1+', '2+', '3+', '4+', '5+'].map((beds) => (
            <button
              key={beds}
              onClick={() => setFilters(prev => ({ ...prev, bedrooms: beds }))}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filters.bedrooms === beds
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {beds}
            </button>
          ))}
        </div>

        {/* Status badges filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFilters(prev => ({ ...prev, status: filters.status === 'Hot Deal' ? 'All' : 'Hot Deal' }))}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filters.status === 'Hot Deal'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/50'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Hot Deals
          </button>

          <button
            onClick={() => setFilters(prev => ({ ...prev, status: filters.status === 'Discounted' ? 'All' : 'Discounted' }))}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filters.status === 'Discounted'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/50'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            Discounted
          </button>

          <button
            onClick={() => setFilters(prev => ({ ...prev, status: filters.status === 'Installment' ? 'All' : 'Installment' }))}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filters.status === 'Installment'
                ? 'bg-slate-900 dark:bg-white text-emerald-400 dark:text-slate-950 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            0% Installments
          </button>

          {/* Toggle More Amenities Drawer */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-500" />
            <span>Amenities ({filters.amenities.length})</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Advanced Amenities Section (Collapsible) */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
            Filter by Amenities & Specifications
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {AMENITIES_LIST.map((amenity) => {
              const active = filters.amenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                    active
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <span className="truncate block">{amenity}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Filter Chips & Reset Row */}
      {isFiltered && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400">Active filters:</span>
            {filters.district !== 'All Districts' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                {filters.district}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(p => ({ ...p, district: 'All Districts' }))} />
              </span>
            )}
            {filters.type !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                {filters.type}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(p => ({ ...p, type: 'All' }))} />
              </span>
            )}
            {filters.bedrooms !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                {filters.bedrooms} Beds
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(p => ({ ...p, bedrooms: 'All' }))} />
              </span>
            )}
            {filters.status !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                {filters.status}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(p => ({ ...p, status: 'All' }))} />
              </span>
            )}
            {filters.amenities.map(a => (
              <span key={a} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {a}
                <X className="w-3 h-3 cursor-pointer" onClick={() => toggleAmenity(a)} />
              </span>
            ))}
          </div>

          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Results Count Banner */}
      <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <span>
          Showing <strong className="text-slate-900 dark:text-white font-bold">{totalResults}</strong> luxury properties matching criteria
        </span>
      </div>
    </div>
  );
}
