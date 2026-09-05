import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useOrders } from '../context/OrderContext.jsx';
import {
  Home,
  ShoppingBag,
  Wrench,
  History,
  ShieldAlert,
  Package,
  ClipboardList
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { isAdmin } = useAuth();
  const { t } = useLanguage();
  const { unreadOrdersCount } = useOrders();

  const mainNavItems = [
    { id: 'home', label: t('navHome'), icon: Home },
    { id: 'store', label: t('navStore'), icon: ShoppingBag },
    { id: 'repair', label: t('navRepair'), icon: Wrench },
    { id: 'history', label: t('navHistory'), icon: History },
  ];

  const adminNavItems = [
    { id: 'admin-products', label: t('adminProducts'), icon: Package },
    { 
      id: 'admin-orders', 
      label: t('adminOrders'), 
      icon: ClipboardList,
      badge: unreadOrdersCount
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 flex flex-col justify-between shrink-0 transition-colors">
      <div className="space-y-6">
        
        {/* Main Menu */}
        <div>
          <h3 className="px-3 text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase mb-2">
            Asosiy Menyu
          </h3>
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-500' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Admin Section - Visible ONLY for admin@telefon.com */}
        {isAdmin && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="px-3 mb-2 flex items-center justify-between">
              <h3 className="text-[11px] font-bold tracking-wider text-amber-500 uppercase flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                {t('adminBadge')}
              </h3>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500 text-[10px] font-bold">
                admin@telefon.com
              </span>
            </div>
            <nav className="space-y-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-amber-500' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-black text-xs font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        )}

      </div>

      {/* Support Box */}
      <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-center">
        <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-1">
          Yordam Kerakmi?
        </h4>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-3">
          Bizning Telegram operatorimizga yozing
        </p>
        <a
          href="https://t.me/Salox71"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center w-full py-2 px-3 rounded-xl bg-cyan-500 text-white font-bold text-xs hover:bg-cyan-600 shadow-md shadow-cyan-500/20 transition"
        >
          Telegram: @Salox71
        </a>
      </div>
    </aside>
  );
};

