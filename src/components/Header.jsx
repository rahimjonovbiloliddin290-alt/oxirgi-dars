import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import { useOrders } from '../context/OrderContext.jsx';
import {
  Wrench,
  Search,
  Phone,
  Send,
  Sun,
  Moon,
  ShoppingCart,
  User,
  LogOut,
  Bell,
  ShieldCheck,
  Globe
} from 'lucide-react';

export const Header = ({ activeTab, setActiveTab }) => {
  const { user, isAdmin, logout, setShowAuthModal } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { searchTerm, setSearchTerm } = useProducts();
  const { cart, setShowCartModal, unreadOrdersCount } = useOrders();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('store')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-1">
                TechFix<span className="text-cyan-500">Hub</span>
              </span>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium hidden sm:block">
                {t('brandTagline')}
              </p>
            </div>
          </div>

          {/* Real-time Search Engine */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-11 pr-4 py-2 text-sm rounded-xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-cyan-500 focus:bg-white dark:focus:bg-gray-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Direct Contact Links */}
          <div className="hidden lg:flex items-center gap-3 text-xs">
            <a
              href="tel:+998940347171"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold hover:bg-emerald-500/20 transition"
            >
              <Phone className="w-3.5 h-3.5" />
              +998 94 034 71 71
            </a>
            <a
              href="https://t.me/Salox71"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-semibold hover:bg-sky-500/20 transition"
            >
              <Send className="w-3.5 h-3.5" />
              @Salox71
            </a>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher */}
            <div className="relative flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
              <Globe className="w-4 h-4 text-gray-400 ml-1 mr-1 hidden sm:block" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-xs font-bold text-gray-700 dark:text-gray-200 focus:outline-none cursor-pointer pr-1"
              >
                <option value="uz" className="bg-white dark:bg-gray-800">UZ</option>
                <option value="en" className="bg-white dark:bg-gray-800">EN</option>
                <option value="ru" className="bg-white dark:bg-gray-800">RU</option>
              </select>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              title="Mavzuni o'zgartirish"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setShowCartModal(true)}
              className="relative p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-500 text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Admin Notification Badge */}
            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin-orders')}
                className="relative p-2 rounded-lg text-amber-500 hover:bg-amber-500/10 transition"
                title="Yangi Buyurtmalar"
              >
                <Bell className="w-5 h-5" />
                {unreadOrdersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-black text-[11px] font-bold flex items-center justify-center animate-bounce">
                    {unreadOrdersCount}
                  </span>
                )}
              </button>
            )}

            {/* User Profile / Auth */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-800">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1 justify-end">
                    {user.name}
                    {isAdmin && <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 inline" />}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    {isAdmin ? 'Administrator' : 'Mijoz'}
                  </p>
                </div>

                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition"
                  title={t('logout')}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-cyan-500/20 transition-all"
              >
                <User className="w-4 h-4" />
                <span>{t('loginTitle')}</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};

