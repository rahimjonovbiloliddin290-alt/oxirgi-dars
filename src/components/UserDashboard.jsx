import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import HouseCard from './HouseCard';
import {
  User,
  Heart,
  CalendarCheck,
  Settings,
  ShieldCheck,
  Building,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Trash2,
  ArrowRight
} from 'lucide-react';

export default function UserDashboard() {
  const {
    user,
    wishlist,
    properties,
    inquiries,
    deleteInquiry,
    openPropertyDetail,
    formatPrice,
    currency,
    setCurrency,
    areaUnit,
    setAreaUnit,
    showToast,
    setActiveView
  } = useApp();

  const [activeTab, setActiveTab] = useState('saved'); // 'saved' | 'applications' | 'settings'
  const [profileName, setProfileName] = useState(user?.name || 'Valued Client');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '+998 90 123 45 67');

  // Filter saved properties
  const savedProperties = properties.filter(p => wishlist.includes(p.id));

  // Filter applications for current user (or match by email/phone or show all client inquiries)
  const userApplications = inquiries.filter(
    inq => !user || inq.clientEmail === user.email || inq.clientName === user.name || true
  );

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    showToast('Profile settings saved successfully!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Welcome Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl border border-slate-800 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'}
            alt="User avatar"
            className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-emerald-500/30"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">{user?.name || 'VIP Client'}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {user?.role === 'admin' ? 'Super Admin' : 'VIP Member'}
              </span>
            </div>
            <p className="text-xs text-slate-400">{user?.email || 'client@uybozor.uz'}</p>
            <div className="flex items-center gap-4 text-xs text-slate-300 mt-2">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <strong>{wishlist.length}</strong> Saved Homes
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CalendarCheck className="w-3.5 h-3.5 text-emerald-400" />
                <strong>{userApplications.length}</strong> Applications
              </span>
            </div>
          </div>
        </div>

        {/* Quick controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveView('catalog')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-md transition-colors flex items-center gap-2"
          >
            <Building className="w-4 h-4 text-emerald-400" />
            <span>Browse More Homes</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 mb-8 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'saved'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Houses ({savedProperties.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'applications'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>My Tour Applications ({userApplications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'settings'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Profile Settings</span>
        </button>
      </div>

      {/* Tab 1: Saved Houses (Wishlist) */}
      {activeTab === 'saved' && (
        <div>
          {savedProperties.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <Heart className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No saved properties yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-6">
                Explore our catalog and click the heart icon on any villa, penthouse, or apartment to save it to your wishlist.
              </p>
              <button
                onClick={() => setActiveView('catalog')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map((prop) => (
                <HouseCard key={prop.id} property={prop} viewMode="grid" />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Tour Applications & Inquiries */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {userApplications.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <CalendarCheck className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No Tour Requests Submitted
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-6">
                When you schedule an in-person or live video tour on any property, your booking status will appear here.
              </p>
              <button
                onClick={() => setActiveView('catalog')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                Explore Properties
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {userApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {app.propertyTitle}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          app.status === 'New'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            : app.status === 'Contacted'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {app.tourType}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {app.preferredDate} at {app.preferredTime || '14:00'}
                      </span>
                    </div>

                    {app.message && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic pt-1">
                        "{app.message}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => deleteInquiry(app.id)}
                      className="p-2.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Cancel Request"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Profile Settings */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            Personal Profile & Preferences
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Configure default currency, measurement units, and contact details.
          </p>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={profilePhone}
                onChange={(e) => setProfilePhone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Currency & Unit toggles */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Default Currency
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      currency === 'USD'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('UZS')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      currency === 'UZS'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    UZS (So'm)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Area Unit
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAreaUnit('m²')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      areaUnit === 'm²'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Square Meters (m²)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAreaUnit('sqft')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      areaUnit === 'sqft'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Square Feet (sqft)
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
