import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { Wrench, Phone, User, MapPin, Send, CheckCircle2, ShieldCheck, Smartphone, Battery, Camera, Monitor } from 'lucide-react';

export const RepairServicesView = () => {
  const { submitOrder, setLastTelegramNotice, lastTelegramNotice } = useOrders();
  const { t } = useLanguage();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [serviceType, setServiceType] = useState('Display Replacement');
  const [phoneModel, setPhoneModel] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const services = [
    { id: 'Display Replacement', label: 'Ekran Almashtirish (Display)', price: '$50-$150', icon: Monitor },
    { id: 'Battery Replacement', label: 'Akkumulyator Almashtirish (Battery)', price: '$25-$60', icon: Battery },
    { id: 'Camera Repair', label: 'Kamera Almashtirish (Camera)', price: '$35-$90', icon: Camera },
    { id: 'Motherboard Fix', label: 'Plata va Chip Ta\'mirlash', price: '$40-$120', icon: Smartphone },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');

    const repairItem = {
      id: `rep-${Date.now()}`,
      name: `Ta'mirlash: ${serviceType} (${phoneModel || 'Nomalum model'})`,
      price: 50, // estimated base fee
      quantity: 1
    };

    const res = await submitOrder({
      customerName,
      customerPhone,
      address,
      items: [repairItem],
      totalAmount: 50,
      notes: `[TA'MIRLASH ZAKAZI] Model: ${phoneModel || 'Ko\'rsatilmadi'}. Muammo: ${notes}`
    });

    setLoading(false);
    if (res.success) {
      setSuccessMsg(res.message);
      setCustomerName('');
      setCustomerPhone('');
      setAddress('');
      setPhoneModel('');
      setNotes('');
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Hero Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-xl shadow-cyan-500/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            {t('repairTitle')}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {t('repairSubtitle')}
          </h1>
          <p className="text-sm text-cyan-100 max-w-xl">
            Har qanday murakkablikdagi ekran, batareya va plata muammolarini 1 soat ichida professional kafolat bilan ta'mirlab beramiz.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((srv) => {
          const Icon = srv.icon;
          const isSelected = serviceType === srv.id;
          return (
            <div
              key={srv.id}
              onClick={() => setServiceType(srv.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-cyan-500/10 border-cyan-500 text-cyan-600 dark:text-cyan-400 shadow-md'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-cyan-500" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                {srv.label}
              </h3>
              <p className="text-xs font-semibold text-cyan-500">
                Taxminiy narx: {srv.price}
              </p>
            </div>
          );
        })}
      </div>

      {/* Repair Form */}
      <div className="p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
        
        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              {successMsg}
            </div>
            <p className="text-xs">
              Usta buyurtmangiz Telegram <strong>@Salox71</strong> orqali qabul qilindi.
            </p>
            {lastTelegramNotice?.link && (
              <a
                href={lastTelegramNotice.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 text-white font-bold text-xs hover:bg-sky-600 transition"
              >
                <Send className="w-3.5 h-3.5" />
                Telegramda tasdiqlash (@Salox71)
              </a>
            )}
          </div>
        )}

        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Ta'mirlash uchun Sorov Yuborish
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                {t('customerName')} *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ali Valiyev"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                {t('phoneNumber')} *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                Telefon Modeli
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={phoneModel}
                  onChange={(e) => setPhoneModel(e.target.value)}
                  placeholder="masalan: iPhone 13 Pro yoki Samsung S22"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                {t('address')}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Toshkent sh., Yunusobod tumani"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
              {t('notes')}
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Muammoni batafsil tasvirlab bering (masalan: ekran singan, sensor ishlamayapti)..."
              className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            {loading ? 'Yuborilmoqda...' : `${t('submitOrder')} (Telegram: @Salox71)`}
          </button>
        </form>

      </div>

    </div>
  );
};

