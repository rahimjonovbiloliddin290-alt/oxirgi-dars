import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LanguageProvider, useLanguage } from './context/LanguageContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ProductProvider, useProducts } from './context/ProductContext.jsx';
import { OrderProvider } from './context/OrderContext.jsx';

import { Header } from './components/Header.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { ProductCard } from './components/ProductCard.jsx';
import { AuthModal } from './components/AuthModal.jsx';
import { AdminProductModal } from './components/AdminProductModal.jsx';
import { AdminOrdersView } from './components/AdminOrdersView.jsx';
import { RepairServicesView } from './components/RepairServicesView.jsx';
import { OrderHistoryView } from './components/OrderHistoryView.jsx';
import { CartModal } from './components/CartModal.jsx';

import {
  Plus,
  Wrench,
  Smartphone,
  Battery,
  Monitor,
  Camera,
  ShieldCheck,
  Zap,
  Phone,
  Send,
  Pencil,
  Trash2,
  Package
} from 'lucide-react';

const MainContent = () => {
  const [activeTab, setActiveTab] = useState('store');
  const { isAdmin } = useAuth();
  const { t } = useLanguage();
  const {
    filteredProducts,
    activeCategory,
    setActiveCategory,
    loading,
    openAddModal,
    openEditModal,
    deleteProduct
  } = useProducts();

  const categories = [
    { id: 'All', label: t('allCategories'), icon: Package },
    { id: 'Full Phone', label: t('categoryFullPhone'), icon: Smartphone },
    { id: 'Display', label: t('categoryDisplay'), icon: Monitor },
    { id: 'Battery', label: t('categoryBattery'), icon: Battery },
    { id: 'Camera', label: t('categoryCamera'), icon: Camera },
  ];

  const handleDeleteAdminRow = async (product) => {
    if (window.confirm(`${product.name}\n\n${t('confirmDelete')}`)) {
      const res = await deleteProduct(product.id);
      if (res.success) {
        alert(res.message);
      } else {
        alert(res.error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors">
      
      {/* Top Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
        
        {/* Left Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Content View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          
          {/* TAB 1: HOME */}
          {activeTab === 'home' && (
            <div className="space-y-8">
              {/* Hero Banner */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-900 p-8 sm:p-12 text-white shadow-xl shadow-cyan-500/10">
                <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none transform translate-x-12 translate-y-12">
                  <Wrench className="w-96 h-96" />
                </div>
                
                <div className="relative z-10 max-w-2xl space-y-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    Professional Ta'mirlash Markazi
                  </span>
                  
                  <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
                    {t('homeHeroTitle')}
                  </h1>
                  
                  <p className="text-sm sm:text-base text-cyan-100 font-normal">
                    {t('homeHeroDesc')}
                  </p>

                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setActiveTab('store')}
                      className="px-6 py-3 rounded-xl bg-white text-cyan-700 font-bold text-xs uppercase tracking-wider hover:bg-cyan-50 shadow-lg shadow-black/20 transition-all"
                    >
                      Do'konni Ko'rish
                    </button>
                    
                    <a
                      href="https://t.me/Salox71"
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-sky-500/30 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      Telegram: @Salox71
                    </a>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 shadow-sm">
                  <p className="text-xs text-gray-500 font-semibold">Tezkor Bog'lanish</p>
                  <p className="text-lg font-bold text-cyan-500 mt-1">+998 94 034 71 71</p>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 shadow-sm">
                  <p className="text-xs text-gray-500 font-semibold">Telegram Qo'llab-quvvatlash</p>
                  <p className="text-lg font-bold text-sky-500 mt-1">@Salox71</p>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 shadow-sm">
                  <p className="text-xs text-gray-500 font-semibold">Kafolatlangan Qismlar</p>
                  <p className="text-lg font-bold text-emerald-500 mt-1">100% Original</p>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 shadow-sm">
                  <p className="text-xs text-gray-500 font-semibold">Admin Paneli</p>
                  <p className="text-lg font-bold text-amber-500 mt-1">CRUD Tizim</p>
                </div>
              </div>

              {/* Featured Store Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Tanlangan Mahsulotlar
                  </h2>
                  <button
                    onClick={() => setActiveTab('store')}
                    className="text-xs font-bold text-cyan-500 hover:underline"
                  >
                    Barchasini ko'rish &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.slice(0, 6).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STORE */}
          {activeTab === 'store' && (
            <div className="space-y-6">
              
              {/* Category Filter Tabs Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                    {t('navStore')}
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Smartfonlar, ekranlar, batareyalar va kameralar katalogi
                  </p>
                </div>

                {/* Admin Add Button */}
                {isAdmin && (
                  <button
                    onClick={openAddModal}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-2 shadow-md shadow-amber-500/20 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t('addProduct')} (Admin CRUD)</span>
                  </button>
                )}
              </div>

              {/* Category Filter Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 scale-105'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="p-12 text-center text-gray-400 font-medium">
                  Mahsulotlar yuklanmoqda...
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="p-12 text-center bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700">
                  <Package className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                  <h3 className="text-base font-bold text-gray-700 dark:text-gray-300">
                    Bunday mahsulot topilmadi
                  </h3>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 3: REPAIR */}
          {activeTab === 'repair' && <RepairServicesView />}

          {/* TAB 4: HISTORY */}
          {activeTab === 'history' && <OrderHistoryView />}

          {/* TAB 5: ADMIN PRODUCTS CRUD PANEL */}
          {activeTab === 'admin-products' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-xl font-black text-gray-900 dark:text-white">
                      {t('adminProducts')}
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Barcha mahsulotlarni real-vaqt rejimida Qo'shish, Tahrirlash va O'chirish
                    </p>
                  </div>
                </div>

                <button
                  onClick={openAddModal}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yangi Mahsulot Qo'shish</span>
                </button>
              </div>

              {/* CRUD Table View */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 dark:bg-gray-900/60 uppercase font-bold text-gray-400 border-b border-gray-100 dark:border-gray-700">
                      <tr>
                        <th className="p-4">Mahsulot</th>
                        <th className="p-4">Kategoriya</th>
                        <th className="p-4">Narxi ($)</th>
                        <th className="p-4">Ombor Holati</th>
                        <th className="p-4 text-right">Amallar (CRUD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition">
                          <td className="p-4 font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                            <span>{p.name}</span>
                          </td>
                          <td className="p-4 font-semibold text-gray-600 dark:text-gray-300">
                            {p.category}
                          </td>
                          <td className="p-4 font-bold text-cyan-500">
                            ${p.price}
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                              p.stockStatus === 'In Stock'
                                ? 'bg-emerald-500/20 text-emerald-500'
                                : 'bg-red-500/20 text-red-500'
                            }`}>
                              {p.stockStatus} ({p.stock})
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditModal(p)}
                                className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 font-bold flex items-center gap-1 transition"
                                title="Tahrirlash"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                                <span>Tahrirlash</span>
                              </button>

                              <button
                                onClick={() => handleDeleteAdminRow(p)}
                                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold flex items-center gap-1 transition"
                                title="O'chirish"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>O'chirish</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 6: ADMIN ORDERS */}
          {activeTab === 'admin-orders' && <AdminOrdersView />}

        </main>

      </div>

      {/* Global Modals */}
      <AuthModal />
      <AdminProductModal />
      <CartModal />

    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ProductProvider>
            <OrderProvider>
              <MainContent />
            </OrderProvider>
          </ProductProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

