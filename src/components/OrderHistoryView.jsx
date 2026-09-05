import React from 'react';
import { useOrders } from '../context/OrderContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { History, Clock, CheckCircle, Package } from 'lucide-react';

export const OrderHistoryView = () => {
  const { adminOrders } = useOrders();
  const { user } = useAuth();
  const { t } = useLanguage();

  // Filter orders by current user phone or email if not admin
  const userOrders = adminOrders.filter(ord => {
    if (!user) return true;
    if (user.role === 'admin') return true;
    return ord.customerPhone === user.phone || ord.customerName.toLowerCase() === user.name.toLowerCase();
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold">
          <History className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">
            {t('navHistory')}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Siz amalga oshirgan xaridlar va ta'mirlash buyurtmalari ro'yxati
          </p>
        </div>
      </div>

      {userOrders.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700">
          <Package className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
          <h3 className="text-base font-bold text-gray-700 dark:text-gray-300">
            Sizda hali buyurtmalar mavjud emas
          </h3>
        </div>
      ) : (
        <div className="space-y-4">
          {userOrders.map((ord) => {
            const isCompleted = ord.status === 'Bajarildi';
            return (
              <div
                key={ord.id}
                className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-700">
                  <div>
                    <span className="font-mono text-xs font-bold text-cyan-500 mr-2">
                      ID: {ord.id}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(ord.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    {ord.status}
                  </span>
                </div>

                <div className="space-y-2">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-gray-800 dark:text-gray-200 font-semibold">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-sm font-bold">
                  <span className="text-gray-500">Jami:</span>
                  <span className="text-cyan-500 text-base">${ord.totalAmount}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

