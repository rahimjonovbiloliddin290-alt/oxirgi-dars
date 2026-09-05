import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { X, Plus, Save, Image, Tag, DollarSign, PackageCheck, FileText, Sparkles } from 'lucide-react';

export const AdminProductModal = () => {
  const {
    showProductModal,
    setShowProductModal,
    selectedProductForEdit,
    addProduct,
    editProduct
  } = useProducts();
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Full Phone');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [stockStatus, setStockStatus] = useState('In Stock');
  const [stock, setStock] = useState('10');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isEditMode = !!selectedProductForEdit;

  useEffect(() => {
    if (selectedProductForEdit) {
      setName(selectedProductForEdit.name || '');
      setCategory(selectedProductForEdit.category || 'Full Phone');
      setPrice(selectedProductForEdit.price || '');
      setImage(selectedProductForEdit.image || '');
      setStockStatus(selectedProductForEdit.stockStatus || 'In Stock');
      setStock(selectedProductForEdit.stock !== undefined ? String(selectedProductForEdit.stock) : '10');
      setDescription(selectedProductForEdit.description || '');
    } else {
      setName('');
      setCategory('Full Phone');
      setPrice('');
      setImage('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80');
      setStockStatus('In Stock');
      setStock('10');
      setDescription('');
    }
    setErrorMsg('');
  }, [selectedProductForEdit, showProductModal]);

  if (!showProductModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      setErrorMsg("Nomi va narxini kiritish shart!");
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const payload = {
      name,
      category,
      price: Number(price),
      image: image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      stockStatus,
      stock: Number(stock) || 10,
      description
    };

    let res;
    if (isEditMode) {
      res = await editProduct(selectedProductForEdit.id, payload);
    } else {
      res = await addProduct(payload);
    }

    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.error);
    }
  };

  const presetImages = {
    'Full Phone': 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    'Display': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    'Battery': 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=800&q=80',
    'Camera': 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=800&q=80',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              {isEditMode ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {isEditMode ? "Mahsulotni Tahrirlash" : "Yangi Mahsulot Qo'shish"}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                CRUD Admin Boshqaruv Tizimi
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowProductModal(false)}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          
          {/* Product Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
              Mahsulot Nomi *
            </label>
            <div className="relative">
              <Tag className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="masalan: iPhone 15 Pro Max Screen"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                Kategoriya *
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (presetImages[e.target.value]) {
                    setImage(presetImages[e.target.value]);
                  }
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="Full Phone">Full Phone</option>
                <option value="Display">Display</option>
                <option value="Battery">Battery</option>
                <option value="Camera">Camera</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                Narxi ($) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="199"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Image URL & Quick Preset */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Rasm Havolasi (Unsplash Link)
              </label>
              <button
                type="button"
                onClick={() => setImage(presetImages[category] || presetImages['Full Phone'])}
                className="text-[11px] text-cyan-500 hover:underline flex items-center gap-1 font-semibold"
              >
                <Sparkles className="w-3 h-3" />
                Avto Unsplash rasm
              </button>
            </div>
            <div className="relative">
              <Image className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Stock Status & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                Ombor Holati
              </label>
              <select
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="In Stock">Omborda bor (In Stock)</option>
                <option value="Out of Stock">Qolmagan (Out of Stock)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                Soni (Mavjud dona)
              </label>
              <div className="relative">
                <PackageCheck className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="10"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
              Tavsif (Description)
            </label>
            <div className="relative">
              <FileText className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mahsulot haqida ma'lumot kiriting..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowProductModal(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Bekor qilish
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-md shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              {loading ? 'Saqlanmoqda...' : isEditMode ? 'O\'zgartirishlarni saqlash' : 'Mahsulotni Saqlash'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

