import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import { useOrders } from '../context/OrderContext.jsx';
import {
  ShoppingCart,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Zap
} from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { isAdmin } = useAuth();
  const { t } = useLanguage();
  const { openEditModal, deleteProduct } = useProducts();
  const { addToCart, setShowCartModal } = useOrders();

  const handleDelete = async () => {
    if (window.confirm(`${product.name}\n\n${t('confirmDelete')}`)) {
      const res = await deleteProduct(product.id);
      if (res.success) {
        alert(res.message);
      } else {
        alert(res.error);
      }
    }
  };

  const handleQuickOrder = () => {
    addToCart(product);
    setShowCartModal(true);
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700/60 overflow-hidden shadow-sm hover:shadow-xl hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between">
      
      <div>
        {/* Category & Stock Badges Header */}
        <div className="relative aspect-[4/3] w-full bg-gray-100 dark:bg-gray-900 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80';
            }}
          />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wide uppercase">
              {product.category}
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 backdrop-blur-md ${
              product.stockStatus === 'In Stock'
                ? 'bg-emerald-500/80 text-white'
                : 'bg-red-500/80 text-white'
            }`}>
              {product.stockStatus === 'In Stock' ? (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  {t('inStock')} ({product.stock})
                </>
              ) : (
                <>
                  <XCircle className="w-3 h-3" />
                  {t('outOfStock')}
                </>
              )}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-cyan-500 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
            {product.description}
          </p>

          <div className="flex items-baseline justify-between pt-2 border-t border-gray-100 dark:border-gray-700/50">
            <div>
              <span className="text-xs text-gray-400 font-medium block">{t('price')}</span>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                ${product.price}
              </span>
            </div>

            <div className="text-right text-[11px] text-gray-400">
              ≈ {(product.price * 12600).toLocaleString()} UZS
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0 space-y-2">
        {/* User Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => addToCart(product)}
            className="w-full py-2.5 px-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-cyan-500 hover:text-white text-gray-800 dark:text-gray-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{t('addToCart')}</span>
          </button>

          <button
            onClick={handleQuickOrder}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
          >
            <Zap className="w-4 h-4" />
            <span>{t('checkout')}</span>
          </button>
        </div>

        {/* Admin Buttons - Visible ONLY for admin@telefon.com */}
        {isAdmin && (
          <div className="pt-2 border-t border-dashed border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <button
              onClick={() => openEditModal(product)}
              className="flex-1 py-1.5 px-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-1 transition"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>{t('editProduct')}</span>
            </button>

            <button
              onClick={handleDelete}
              className="flex-1 py-1.5 px-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 text-xs font-semibold flex items-center justify-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t('deleteProduct')}</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

