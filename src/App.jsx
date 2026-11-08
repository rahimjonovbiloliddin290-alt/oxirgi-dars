import React, { useState, useMemo } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HouseCard from './components/HouseCard';
import FilterBar from './components/FilterBar';
import MortgageCalculator from './components/MortgageCalculator';
import PropertyDetailModal from './components/PropertyDetailModal';
import QuickViewModal from './components/QuickViewModal';
import InquiryModal from './components/InquiryModal';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import ToastNotification from './components/ToastNotification';
import { INITIAL_TESTIMONIALS, DISTRICTS_LIST } from './data/mockProperties';
import {
  Search,
  MapPin,
  Home as HomeIcon,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Star,
  Quote,
  Building2,
  CalendarCheck,
  Compass,
  PhoneCall
} from 'lucide-react';

function MainContent() {
  const {
    activeView,
    setActiveView,
    properties,
    filters,
    setFilters,
    formatPrice,
    formatArea
  } = useApp();

  // Hero Quick Search local inputs
  const [heroDistrict, setHeroDistrict] = useState('All Districts');
  const [heroType, setHeroType] = useState('All');
  const [heroPriceMax, setHeroPriceMax] = useState(500000);
  const [heroPurpose, setHeroPurpose] = useState('buy'); // 'buy' | 'rent'

  // Featured Category filter on home
  const [featuredTab, setFeaturedTab] = useState('All');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      district: heroDistrict,
      type: heroType,
      priceMax: heroPriceMax
    }));
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter properties for the Catalog view
  const filteredCatalogProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Keyword search
      if (filters.searchKeyword) {
        const kw = filters.searchKeyword.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(kw);
        const matchesDistrict = prop.location.district.toLowerCase().includes(kw);
        const matchesAddress = prop.location.address.toLowerCase().includes(kw);
        const matchesDesc = prop.description.toLowerCase().includes(kw);
        if (!matchesTitle && !matchesDistrict && !matchesAddress && !matchesDesc) {
          return false;
        }
      }

      // District filter
      if (filters.district !== 'All Districts' && prop.location.district !== filters.district) {
        return false;
      }

      // Property type filter
      if (filters.type !== 'All' && prop.type !== filters.type) {
        return false;
      }

      // Price range
      if (prop.priceUSD < filters.priceMin || prop.priceUSD > filters.priceMax) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== 'All') {
        const requiredBeds = parseInt(filters.bedrooms, 10);
        if (prop.bedrooms < requiredBeds) return false;
      }

      // Status badges
      if (filters.status === 'Hot Deal' && !prop.isHotDeal) return false;
      if (filters.status === 'Discounted' && !prop.isDiscounted) return false;
      if (filters.status === 'Installment' && !prop.hasInstallment) return false;

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(a => prop.amenities.includes(a));
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.priceUSD - b.priceUSD;
      if (filters.sortBy === 'price-high') return b.priceUSD - a.priceUSD;
      if (filters.sortBy === 'newest') return b.yearBuilt - a.yearBuilt;
      if (filters.sortBy === 'sqm-price') return (a.priceUSD / a.areaM2) - (b.priceUSD / b.areaM2);
      // default: popular (by views)
      return (b.views || 0) - (a.views || 0);
    });
  }, [properties, filters]);

  // Featured properties on Home page
  const featuredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (featuredTab === 'All') return true;
      return p.type === featuredTab;
    });
  }, [properties, featuredTab]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header />

      <main className="flex-1">
        {/* VIEW 1: HOME PAGE */}
        {activeView === 'home' && (
          <div>
            {/* HERO SECTION */}
            <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden">
              {/* Background high-res architectural photograph with overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85')`
                }}
              />
              {/* Dark luxury gradient overlays for crisp readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

              {/* Hero Content Box */}
              <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
                {/* Micro Pill Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md text-emerald-400 text-xs font-bold tracking-wide uppercase shadow-lg animate-in fade-in duration-500">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Uzbekistan's Premier Real Estate Brokerage</span>
                </div>

                {/* Main Heading */}
                <div className="space-y-4 max-w-4xl mx-auto">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
                    Find Your Dream Sanctuary in <br />
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
                      Tashkent & Beyond
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    Exclusive villas, penthouses, and modern apartments with 100% verified cadastres, zero developer markups, and flexible 0% installment financing.
                  </p>
                </div>

                {/* Hero Advanced Search Bar (Glassmorphic Container) */}
                <div className="max-w-4xl mx-auto rounded-3xl bg-white/10 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800 p-4 sm:p-6 shadow-2xl">
                  {/* Buy / Rent Tabs */}
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setHeroPurpose('buy')}
                      className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                        heroPurpose === 'buy'
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-white/10 text-white/80 hover:bg-white/20'
                      }`}
                    >
                      Buy Property
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroPurpose('rent')}
                      className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                        heroPurpose === 'rent'
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-white/10 text-white/80 hover:bg-white/20'
                      }`}
                    >
                      Rent / Lease
                    </button>
                  </div>

                  {/* Search Form Inputs */}
                  <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {/* District Selector */}
                    <div className="text-left">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Location / District
                      </label>
                      <div className="relative">
                        <select
                          value={heroDistrict}
                          onChange={(e) => setHeroDistrict(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 appearance-none"
                        >
                          {DISTRICTS_LIST.map((dist) => (
                            <option key={dist} value={dist}>
                              {dist}
                            </option>
                          ))}
                        </select>
                        <MapPin className="w-4 h-4 text-emerald-400 absolute left-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    {/* Property Type */}
                    <div className="text-left">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Category
                      </label>
                      <div className="relative">
                        <select
                          value={heroType}
                          onChange={(e) => setHeroType(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 appearance-none"
                        >
                          <option value="All">All Categories</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Villa">Villa</option>
                          <option value="Penthouse">Penthouse</option>
                          <option value="House">Townhouse / House</option>
                          <option value="Commercial">Commercial Plaza</option>
                        </select>
                        <HomeIcon className="w-4 h-4 text-emerald-400 absolute left-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    {/* Max Budget */}
                    <div className="text-left">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Budget Up to: ${heroPriceMax.toLocaleString()}
                      </label>
                      <div className="relative">
                        <select
                          value={heroPriceMax}
                          onChange={(e) => setHeroPriceMax(Number(e.target.value))}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 appearance-none"
                        >
                          <option value={150000}>Up to $150,000</option>
                          <option value={300000}>Up to $300,000</option>
                          <option value={500000}>Up to $500,000</option>
                          <option value={1000000}>Up to $1,000,000+</option>
                        </select>
                        <DollarSign className="w-4 h-4 text-emerald-400 absolute left-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    {/* Search Submit Button */}
                    <div className="flex items-end">
                      <button
                        type="submit"
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                      >
                        <Search className="w-4 h-4" />
                        <span>Search Catalog</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>

            {/* DYNAMIC ANALYTICS STATS BAR */}
            <section className="relative -mt-10 z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200/80 dark:border-slate-800">
                <div className="text-center sm:text-left border-r border-slate-100 dark:border-slate-800/80 last:border-0 pr-4">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    $120M+
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Properties Transacted
                  </p>
                </div>

                <div className="text-center sm:text-left border-r border-slate-100 dark:border-slate-800/80 last:border-0 pr-4">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                    4,500+
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Happy Homeowners
                  </p>
                </div>

                <div className="text-center sm:text-left border-r border-slate-100 dark:border-slate-800/80 last:border-0 pr-4">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    1,200+
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Vetted Listings
                  </p>
                </div>

                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-black text-amber-500 tracking-tight flex items-center justify-center sm:justify-start gap-1">
                    <span>99.4%</span>
                    <Star className="w-5 h-5 fill-amber-500" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Trust & Cadastre Rating
                  </p>
                </div>
              </div>
            </section>

            {/* FEATURED PROPERTIES SHOWCASE */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    Hand-Selected Portfolio
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                    Featured Luxury Properties
                  </h2>
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {['All', 'Villa', 'Penthouse', 'Apartment', 'House', 'Commercial'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFeaturedTab(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        featuredTab === cat
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {cat === 'All' ? 'All Residences' : `${cat}s`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProperties.slice(0, 6).map((property) => (
                  <HouseCard key={property.id} property={property} viewMode="grid" />
                ))}
              </div>

              {/* View More Catalog Button */}
              <div className="text-center mt-12">
                <button
                  onClick={() => {
                    setActiveView('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-wider shadow-xl hover:scale-105 transition-all"
                >
                  <span>Explore Full Real Estate Catalog ({properties.length} Properties)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* TRUST & ASSURANCE SECTION */}
            <section className="bg-slate-100/70 dark:bg-slate-900/50 py-16 md:py-20 border-y border-slate-200/80 dark:border-slate-800/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    Why UyBozor LuxeHaven
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                    Built on Absolute Integrity & Verification
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    We eliminate risks with independent legal due diligence, title registration support, and guaranteed escrow protections.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      100% Cadastral & Legal Clearance
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Every residence listed is thoroughly checked with Tashkent city cadastre authorities. Guaranteed zero lien, encumbrance, or ownership disputes.
                    </p>
                  </div>

                  <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-500 border border-teal-500/20 flex items-center justify-center">
                      <CalendarCheck className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Direct Developer 0% Installments
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Save tens of thousands in bank interest fees. We negotiate exclusive 24 to 36 month interest-free direct installments from Tashkent's premier developers.
                    </p>
                  </div>

                  <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center">
                      <Award className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      VIP Private Tour Concierge
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Enjoy private chauffeur-driven property visits, confidential live 4K virtual tours for international buyers, and multi-lingual documentation.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* HOMEPAGE INTERACTIVE MORTGAGE CALCULATOR TEASER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  Financial Transparency
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                  Plan Your Monthly Mortgage or Installments
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Adjust down payment and loan term to instantly compute your exact monthly commitments in both USD and Uzbek Som (UZS).
                </p>
              </div>

              <MortgageCalculator initialPrice={280000} />
            </section>

            {/* POPULAR DISTRICTS SHOWCASE */}
            <section className="bg-slate-900 text-white py-16 md:py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400">
                      Prime Locations
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
                      Explore Tashkent's Elite Neighborhoods
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      name: "Tashkent City",
                      desc: "The pinnacle of urban luxury, skyline views & parks",
                      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
                      count: "42 Listings"
                    },
                    {
                      name: "Mirzo Ulugbek",
                      desc: "Diplomatic enclave, botanical gardens & private villas",
                      img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80",
                      count: "38 Listings"
                    },
                    {
                      name: "Yakkasaroy",
                      desc: "European-style avenues, designer boutiques & cafes",
                      img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
                      count: "29 Listings"
                    },
                    {
                      name: "Samarkand Silk Road",
                      desc: "Historical heritage villas, courtyards & orchards",
                      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
                      count: "15 Listings"
                    }
                  ].map((dist, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setFilters(prev => ({ ...prev, district: dist.name }));
                        setActiveView('catalog');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer shadow-lg"
                    >
                      <img
                        src={dist.img}
                        alt={dist.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5 space-y-1">
                        <span className="text-[10px] uppercase font-extrabold text-emerald-400 tracking-wider">
                          {dist.count}
                        </span>
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {dist.name}
                        </h3>
                        <p className="text-[11px] text-slate-300 line-clamp-2">
                          {dist.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CUSTOMER TESTIMONIALS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  Client Endorsements
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                  Trusted by Discerning Buyers & Investors
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {INITIAL_TESTIMONIALS.map((test) => (
                  <div
                    key={test.id}
                    className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(test.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                        "{test.text}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                      <img
                        src={test.avatar}
                        alt={test.name}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/20"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {test.name}
                        </h4>
                        <p className="text-[11px] text-slate-400">{test.role}</p>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">
                          Purchased: {test.propertyPurchased}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CALL TO ACTION BANNER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
              <div className="rounded-3xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 text-white p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 max-w-xl">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-200">
                    Private Brokerage Assistance
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                    Ready to Find or Sell Your Residence in Tashkent?
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                    Speak directly with a senior estate director. We assist with private viewings, legal due diligence, and tailored financing.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                  <a
                    href="tel:+998712008800"
                    className="px-6 py-3.5 rounded-2xl bg-white text-emerald-800 text-xs font-black uppercase tracking-wider shadow-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-600" />
                    <span>Call +998 71 200 88 00</span>
                  </a>
                  <button
                    onClick={() => {
                      setActiveView('catalog');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3.5 rounded-2xl bg-emerald-900/60 hover:bg-emerald-900 text-white border border-white/20 text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Browse All Homes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: CATALOG / LISTINGS PAGE */}
        {activeView === 'catalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {/* Catalog Banner */}
            <div className="mb-8">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Verified Catalog
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                Luxury Properties in Uzbekistan
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Use the dynamic filter bar to fine-tune your price range in USD and UZS, choose room layouts, and select verified amenities.
              </p>
            </div>

            {/* Filter Bar */}
            <FilterBar totalResults={filteredCatalogProperties.length} />

            {/* Catalog Listings Result */}
            {filteredCatalogProperties.length === 0 ? (
              <div className="text-center py-20 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <Compass className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  No properties matched your search filters
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-6">
                  Try widening your dynamic price range, selecting "All Districts", or clearing specific amenities.
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      searchKeyword: '',
                      district: 'All Districts',
                      type: 'All',
                      priceMin: 50000,
                      priceMax: 1000000,
                      bedrooms: 'All',
                      status: 'All',
                      amenities: [],
                      sortBy: 'popular',
                      viewMode: 'grid'
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  filters.viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'flex flex-col gap-6'
                }
              >
                {filteredCatalogProperties.map((property) => (
                  <HouseCard
                    key={property.id}
                    property={property}
                    viewMode={filters.viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: DEDICATED MORTGAGE CALCULATOR PAGE */}
        {activeView === 'calculator' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Financial Toolkit
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                Real Estate Mortgage & Installment Calculator
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Calculate amortized monthly bank mortgage payments or compare against developer 0% installment plans in USD and UZS.
              </p>
            </div>

            <MortgageCalculator initialPrice={320000} />
          </div>
        )}

        {/* VIEW 4: USER DASHBOARD */}
        {activeView === 'user-dashboard' && <UserDashboard />}

        {/* VIEW 5: PROTECTED ADMIN DASHBOARD */}
        {activeView === 'admin-dashboard' && <AdminDashboard />}
      </main>

      {/* Global Modals & Notifications */}
      <PropertyDetailModal />
      <QuickViewModal />
      <InquiryModal />
      <AuthModal />
      <ToastNotification />

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
