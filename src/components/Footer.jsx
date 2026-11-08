import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ArrowUpRight,
  Shield,
  FileCheck,
  Award
} from 'lucide-react';

export default function Footer() {
  const { setActiveView, setFilters, showToast } = useApp();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Please enter a valid email address.', 'warning');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed! You will receive our weekly Tashkent luxury estate reports.', 'success');
  };

  const handleDistrictClick = (district) => {
    setFilters(prev => ({ ...prev, district }));
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTypeClick = (type) => {
    setFilters(prev => ({ ...prev, type }));
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Badges Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-slate-800/80">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Verified Legal Cadastre</h4>
              <p className="text-xs text-slate-400">All properties inspected with guaranteed clean title deeds.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-400">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">0% Developer Installments</h4>
              <p className="text-xs text-slate-400">Direct zero-markup financing options from premier builders.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Tashkent's #1 Luxury Agency</h4>
              <p className="text-xs text-slate-400">Over $120M+ in successful premium home transactions.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 p-0.5 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  Uy<span className="text-emerald-400">Bozor</span>
                </span>
                <span className="ml-1.5 text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                  Luxe
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              UyBozor is Uzbekistan's forward-thinking digital real estate platform. We connect discerning buyers, high-net-worth investors, and reputable property developers with architectural masterworks across Tashkent and historical destinations.
            </p>
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Boulevard 4A, Tashkent City, Shaykhontohur, Uzbekistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>+998 (71) 200-88-00 • Daily 09:00 - 21:00</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>vip-concierge@uybozor.uz</span>
              </div>
            </div>
          </div>

          {/* Quick Districts */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Top Locations
            </h3>
            <ul className="space-y-2.5 text-xs">
              {['Tashkent City', 'Mirzo Ulugbek', 'Yakkasaroy', 'Yunusobod', 'Chilanzar', 'Samarkand City'].map((district) => (
                <li key={district}>
                  <button
                    onClick={() => handleDistrictClick(district)}
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-1 group"
                  >
                    <span>{district}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Property Categories
            </h3>
            <ul className="space-y-2.5 text-xs">
              {['Villa', 'Penthouse', 'Apartment', 'House', 'Commercial'].map((type) => (
                <li key={type}>
                  <button
                    onClick={() => handleTypeClick(type)}
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-1 group"
                  >
                    <span>{type}s</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setActiveView('calculator');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 text-slate-400 transition-colors"
                >
                  Mortgage & Installment Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              VIP Market Insights
            </h3>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Subscribe for private listings, pre-launch discounts, and Tashkent real estate quarterly valuation reports.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Thank you! You are subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 block">
                  Zero spam. Unsubscribe anytime.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Micro Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} UyBozor LuxeHaven Real Estate Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms of Brokerage</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Cadastre Compliance</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Security Disclosure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
