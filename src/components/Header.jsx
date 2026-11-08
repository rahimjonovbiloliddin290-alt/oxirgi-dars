import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Heart,
  Sun,
  Moon,
  Search,
  User,
  ShieldCheck,
  LogOut,
  SlidersHorizontal,
  Menu,
  X,
  ChevronDown,
  DollarSign,
  Compass,
  Calculator,
  PhoneCall,
  Home
} from 'lucide-react';

export default function Header() {
  const {
    theme,
    toggleTheme,
    currency,
    setCurrency,
    areaUnit,
    setAreaUnit,
    wishlist,
    user,
    logout,
    activeView,
    setActiveView,
    setAuthModalOpen,
    setAuthModalTab,
    filters,
    setFilters
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const userMenuRef = useRef(null);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, searchKeyword: searchInput }));
    setActiveView('catalog');
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', view: 'home', icon: Home },
    { label: 'Properties', view: 'catalog', icon: Compass },
    { label: 'Mortgage Calculator', view: 'calculator', icon: Calculator },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-md shadow-sm border-b border-slate-200/60 dark:border-slate-800/60'
          : 'bg-white/95 dark:bg-slate-900/95 border-b border-slate-100 dark:border-slate-800'
      }`}
    >
      {/* Top micro bar for exchange rate and contact */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Official Central Bank Rate: 1 USD = 12,850 UZS
          </span>
          <span className="text-slate-400 dark:text-slate-600">|</span>
          <span className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
            Tashkent City • Mirzo Ulugbek • Yakkasaroy • Samarkand
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="tel:+998712008800"
            className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />
            <span>24/7 VIP Hotline: +998 (71) 200-88-00</span>
          </a>
          <span className="text-slate-400 dark:text-slate-600">|</span>
          <button
            onClick={() => {
              setAreaUnit(areaUnit === 'm²' ? 'sqft' : 'm²');
            }}
            className="px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
            title="Toggle measurement unit"
          >
            Unit: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{areaUnit}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-left group flex-shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Uy<span className="text-emerald-500">Bozor</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300">
                  Luxe
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                Premium Homes & Estates
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => {
                    setActiveView(item.view);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-500' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Search Bar (Medium & Up) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden xl:flex items-center relative flex-1 max-w-xs"
          >
            <input
              type="text"
              placeholder="Search Tashkent City, Villa..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </form>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Switcher Pill */}
            <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  currency === 'USD'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('UZS')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  currency === 'UZS'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                UZS
              </button>
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 transition-all"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Wishlist Icon with animated badge */}
            <button
              onClick={() => {
                if (user) {
                  setActiveView('user-dashboard');
                } else {
                  setAuthModalTab('login');
                  setAuthModalOpen(true);
                }
              }}
              className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 transition-all group"
              title="Saved Houses (Wishlist)"
            >
              <Heart
                className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-600 dark:text-slate-300'
                }`}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Avatar Menu or Sign In */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/40"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight max-w-[100px] truncate">
                      {user.name}
                    </p>
                    <span
                      className={`text-[9px] uppercase font-bold tracking-wider ${
                        user.role === 'admin'
                          ? 'text-amber-500 dark:text-amber-400'
                          : 'text-emerald-500 dark:text-emerald-400'
                      }`}
                    >
                      {user.role === 'admin' ? 'Super Admin' : 'Client VIP'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200/80 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>

                    {user.role === 'admin' && (
                      <button
                        onClick={() => {
                          setActiveView('admin-dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-500" />
                        <span>Admin Control Center</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setActiveView('user-dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>My Profile & Tours</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveView('user-dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Saved Houses ({wishlist.length})</span>
                    </button>

                    <div className="my-1 border-t border-slate-100 dark:border-slate-800"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAuthModalTab('login');
                    setAuthModalOpen(true);
                  }}
                  className="px-3.5 py-2 text-xs font-bold rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setAuthModalTab('admin');
                    setAuthModalOpen(true);
                  }}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white shadow-md shadow-emerald-600/20 transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 space-y-4 animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search properties or districts..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          </form>

          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => {
                    setActiveView(item.view);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5 text-emerald-500" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {user?.role === 'admin' && (
              <button
                onClick={() => {
                  setActiveView('admin-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40"
              >
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <span>Admin Dashboard</span>
              </button>
            )}

            {user && (
              <button
                onClick={() => {
                  setActiveView('user-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <User className="w-5 h-5 text-slate-400" />
                <span>User Dashboard & Wishlist</span>
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Measurement Unit</span>
            <button
              onClick={() => setAreaUnit(areaUnit === 'm²' ? 'sqft' : 'm²')}
              className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold"
            >
              Toggle: {areaUnit}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
