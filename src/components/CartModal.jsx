import React, { useState, useEffect } from 'react';
import { useOrders } from '../context/OrderContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Send,
  CheckCircle2,
  Phone,
  User,
  MapPin,
  FileText
} from 'lucide-react';

export const CartModal = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    showCartModal,
    setShowCartModal,
    submitOrder,
    lastTelegramNotice
  } = useOrders();
  const { user } = useAuth();
  const { t } = useLanguage();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderCompletedNotice, setOrderCompletedNotice] = useState(null);

  useEffect(() => {
    if (user) {
      setCustomerName(user.name || '');
      setCustomerPhone(user.phone || '');
    }
  }, [user, showCartModal]);

  if (!showCartModal) return null;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);
    const res = await submitOrder({
      customerName: customerName || (user ? user.name : 'Mijoz'),
      customerPhone: customerPhone || '+998 90 000 00 00',
      address,
      items: cart,
      totalAmount: cartTotal,
      notes
    });

    setLoading(false);
    if (res.success) {
      setOrderCompletedNotice({
        message: res.message,
        telegramLink: `https://t.me/Salox71`
      });
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('cartTitle')}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Buyurtmangiz va Telegram @Salox71 integratsiyasi
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setShowCartModal(false);
              setOrderCompletedNotice(null);
            }}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Successful Order Telegram Banner */}
        {orderCompletedNotice ? (
          <div className="my-6 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {orderCompletedNotice.message}
            </h3>

            <p className="text-xs text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              Buyurtma ma'lumotlari saqlandi hamda Telegram <strong>@Salox71</strong> akkauntiga yuborildi. Operatorimiz tez orada siz bilan bog'lanadi!
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={orderCompletedNotice.telegramLink}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition"
              >
                <Send className="w-4 h-4" />
                Telegramda Yozish (@Salox71)
              </a>

              <button
                onClick={() => {
                  setShowCartModal(false);
                  setOrderCompletedNotice(null);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xs transition"
              >
                Yopish
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <ShoppingCart className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600" />
            <p className="text-base font-bold text-gray-500 dark:text-gray-400">
              {t('emptyCart')}
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            
            {/* Cart Items List */}
            <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-cyan-500 font-semibold">
                        ${item.price}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-5 text-center text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Price */}
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block">
                  {t('totalPrice')}
                </span>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                  ${cartTotal}
                </span>
              </div>
              <div className="text-right text-xs text-gray-500">
                ≈ {(cartTotal * 12600).toLocaleString()} UZS
              </div>
            </div>

            {/* Customer Details Form for Zakaz berish */}
            <form onSubmit={handleSubmitOrder} className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Yetkazib berish ma'lumotlari
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={t('customerName')}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder={t('phoneNumber')}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t('address')}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t('notes')}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Yuborilmoqda...' : `${t('checkout')} (Telegram: @Salox71)`}
              </button>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};

