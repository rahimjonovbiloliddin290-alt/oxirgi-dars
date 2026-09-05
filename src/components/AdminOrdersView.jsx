import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import {
  ClipboardList,
  CheckCircle,
  Clock,
  Phone,
  MapPin,
  Send,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';

export const AdminOrdersView = () => {
  const { adminOrders, updateOrderStatus, fetchAdminOrders } = useOrders();
  const { t } = useLanguage();
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredOrders = adminOrders.filter(ord => {
    if (filterStatus === 'All') return true;
    return ord.status === filterStatus;
  });

  const handleStatusToggle = async (orderId, currentStatus) => {
    const nextStatus = currentStatus === 'Yangi' ? 'Bajarildi' : 'Yangi';
    const res = await updateOrderStatus(orderId, nextStatus);
    if (res.success) {
      // Toast or status update done
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 dark:text-white">
              {t('adminOrders')}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Mijozlardan kelgan buyurtmalar va Telegram notification boshqaruvi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filter buttons */}
          <div className="flex p-1 bg-gray-100 dark:bg-gray-900 rounded-xl">
            {['All', 'Yangi', 'Bajarildi'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  filterStatus === st
                    ? 'bg-amber-500 text-black shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {st === 'All' ? 'Barchasi' : st}
              </button>
            ))}
          </div>

          <button
            onClick={fetchAdminOrders}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            title="Yangilash"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700">
          <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
          <h3 className="text-base font-bold text-gray-700 dark:text-gray-300">
            Hozircha buyurtmalar yo'q
          </h3>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isNew = order.status === 'Yangi';
            return (
              <div
                key={order.id}
                className={`p-6 rounded-3xl bg-white dark:bg-gray-800 border transition-all ${
                  isNew
                    ? 'border-amber-500/50 shadow-lg shadow-amber-500/5'
                    : 'border-gray-200 dark:border-gray-700 opacity-90'
                }`}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-700/60">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xl bg-gray-100 dark:bg-gray-700 font-mono text-xs font-bold text-gray-800 dark:text-gray-200">
                      ID: {order.id}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                      isNew
                        ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {isNew ? <Clock className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                      {order.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <a
                      href="https://t.me/Salox71"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold flex items-center gap-1.5 border border-sky-500/30 transition"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Telegram: @Salox71
                    </a>

                    <button
                      onClick={() => handleStatusToggle(order.id, order.status)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        isNew
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                          : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      {isNew ? t('markCompleted') : 'Qayta Yangi qilish'}
                    </button>
                  </div>
                </div>

                {/* Info & Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  
                  {/* Customer details */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Mijoz Ma'lumotlari
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {order.customerName}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-cyan-500" />
                      <a href={`tel:${order.customerPhone}`} className="hover:underline">
                        {order.customerPhone}
                      </a>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                      {order.address}
                    </p>
                  </div>

                  {/* Products ordered */}
                  <div className="space-y-2 md:col-span-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Buyurtma Qilingan Mahsulotlar
                    </p>
                    <div className="space-y-1.5">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-gray-900/60 text-xs"
                        >
                          <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {item.name} <span className="text-cyan-500 font-bold">({item.quantity}x)</span>
                          </span>
                          <span className="font-bold text-gray-900 dark:text-white">
                            ${item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between font-bold text-sm text-gray-900 dark:text-white border-t border-gray-100 dark:border-gray-700/40">
                      <span>Jami Summa:</span>
                      <span className="text-lg text-cyan-500">${order.totalAmount}</span>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

