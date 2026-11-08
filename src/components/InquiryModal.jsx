import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Calendar,
  Clock,
  Send,
  Phone,
  Mail,
  User,
  Building,
  CheckCircle2,
  Video,
  ShieldCheck
} from 'lucide-react';

export default function InquiryModal() {
  const {
    inquiryModalProperty,
    setInquiryModalProperty,
    addInquiry,
    user,
    formatPrice
  } = useApp();

  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    phone: user ? user.phone : '+998 ',
    email: user ? user.email : '',
    tourType: 'In-Person VIP Tour',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredTime: '15:00',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);

  if (!inquiryModalProperty) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your name and phone number so the agent can contact you.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      addInquiry({
        propertyId: inquiryModalProperty.id,
        propertyTitle: inquiryModalProperty.title,
        propertyPrice: inquiryModalProperty.priceUSD,
        clientName: formData.name,
        clientPhone: formData.phone,
        clientEmail: formData.email,
        tourType: formData.tourType,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        message: formData.message || 'Customer requested tour and property presentation.'
      });
      setSubmitting(false);
      setInquiryModalProperty(null);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Schedule Tour & Private Inquiry
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct connection with verified property broker
            </p>
          </div>
          <button
            onClick={() => setInquiryModalProperty(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Property Brief Summary Card */}
        <div className="p-4 mx-6 mt-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
          {inquiryModalProperty.images && inquiryModalProperty.images[0] && (
            <img
              src={inquiryModalProperty.images[0]}
              alt={inquiryModalProperty.title}
              className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
            />
          )}
          <div className="overflow-hidden">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
              {inquiryModalProperty.location?.district || 'Tashkent'}
            </span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {inquiryModalProperty.title}
            </h4>
            <p className="text-xs font-black text-slate-900 dark:text-white mt-0.5">
              {formatPrice(inquiryModalProperty.priceUSD)}
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Tour Type Radio Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Appointment Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, tourType: 'In-Person VIP Tour' })}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  formData.tourType === 'In-Person VIP Tour'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Building className="w-3.5 h-3.5 text-emerald-500" />
                  <span>In-Person Tour</span>
                </div>
                <span className="text-[10px] font-normal text-slate-400 block">On-site walk-through</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, tourType: 'Live Virtual Video Tour' })}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  formData.tourType === 'Live Virtual Video Tour'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Video className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Live Video Tour</span>
                </div>
                <span className="text-[10px] font-normal text-slate-400 block">Zoom / WhatsApp call</span>
              </button>
            </div>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Jasur Aliyev"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Date & Time Picker */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Preferred Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Preferred Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Message / Questions */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Questions or Specific Requests (Optional)
            </label>
            <textarea
              rows="2"
              placeholder="e.g. Inquiring about 0% developer installments, or parking arrangement..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Confirm Tour & Inquiry Request</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Your contact details are protected under bank-grade client secrecy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
