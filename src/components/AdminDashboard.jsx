import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DISTRICTS_LIST, PROPERTY_TYPES, AMENITIES_LIST } from '../data/mockProperties';
import {
  ShieldCheck,
  Building,
  DollarSign,
  Users,
  Inbox,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Search,
  ArrowUpRight,
  LogOut,
  X,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  Flame,
  Tag,
  CreditCard,
  Maximize2,
  Bed,
  Bath
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    user,
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    formatPrice,
    formatDualPrice,
    formatArea,
    calculatePricePerM2,
    setActiveView,
    setAuthModalOpen,
    setAuthModalTab,
    openPropertyDetail,
    showToast
  } = useApp();

  // Active Admin Sub-tab
  const [adminTab, setAdminTab] = useState('properties'); // 'properties' | 'leads' | 'analytics' | 'users'
  const [searchQuery, setSearchQuery] = useState('');

  // Create / Edit Property Modal State
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [propertyFormData, setPropertyFormData] = useState({
    title: '',
    type: 'Apartment',
    priceUSD: 150000,
    originalPriceUSD: 160000,
    areaM2: 120,
    bedrooms: 3,
    bathrooms: 2,
    floor: 5,
    totalFloors: 12,
    yearBuilt: 2024,
    parkingSpaces: 1,
    statusBadge: 'Featured',
    isHotDeal: false,
    hasInstallment: true,
    district: 'Tashkent City',
    address: 'Boulevard Avenue 12',
    imagesText: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80\nhttps://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    amenities: ['High-speed WiFi', 'Underground Parking', '24/7 Security & CCTV', 'Smart Home Automation'],
    description: 'Luxurious newly finished modern residence with open skyline views, Italian tile finishes, and automated climate control.'
  });

  // Delete Confirmation Modal State
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Guard: If not admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Protected Admin Control Center
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Authorized personnel only. Please sign in with administrator credentials:
            <br />
            <strong className="text-amber-600 dark:text-amber-400">uylar@gmail.uz</strong> / <strong className="text-amber-600 dark:text-amber-400">Uylar1234</strong>
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setAuthModalTab('admin');
                setAuthModalOpen(true);
              }}
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md shadow-amber-600/20"
            >
              Sign In as Administrator
            </button>
            <button
              onClick={() => setActiveView('home')}
              className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
            >
              Return to Marketplace
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Business Analytics Calculations
  const totalListings = properties.length;
  const totalLeads = inquiries.length;
  const totalPortfolioUSD = properties.reduce((acc, p) => acc + (p.priceUSD || 0), 0);
  const avgPriceUSD = totalListings > 0 ? Math.round(totalPortfolioUSD / totalListings) : 0;
  const totalPortfolioUZS = formatDualPrice(totalPortfolioUSD).uzs;

  // Filter properties in admin table
  const filteredProperties = properties.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingPropertyId(null);
    setPropertyFormData({
      title: '',
      type: 'Apartment',
      priceUSD: 145000,
      originalPriceUSD: 155000,
      areaM2: 110,
      bedrooms: 3,
      bathrooms: 2,
      floor: 6,
      totalFloors: 14,
      yearBuilt: 2024,
      parkingSpaces: 1,
      statusBadge: 'Featured',
      isHotDeal: false,
      hasInstallment: true,
      district: 'Tashkent City',
      address: 'Boulevard 8, Tashkent City',
      imagesText: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80\nhttps://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      amenities: ['High-speed WiFi', 'Underground Parking', '24/7 Security & CCTV', 'Smart Home Automation'],
      description: 'Brand new luxury residential offering with high-speed elevators, underground parking, and panoramic windows.'
    });
    setPropertyModalOpen(true);
  };

  const openEditModal = (prop) => {
    setEditingPropertyId(prop.id);
    setPropertyFormData({
      title: prop.title,
      type: prop.type,
      priceUSD: prop.priceUSD,
      originalPriceUSD: prop.originalPriceUSD || prop.priceUSD,
      areaM2: prop.areaM2,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      floor: prop.floor || 1,
      totalFloors: prop.totalFloors || 1,
      yearBuilt: prop.yearBuilt || 2024,
      parkingSpaces: prop.parkingSpaces || 1,
      statusBadge: prop.statusBadge || 'Featured',
      isHotDeal: !!prop.isHotDeal,
      hasInstallment: !!prop.hasInstallment,
      district: prop.location.district,
      address: prop.location.address,
      imagesText: (prop.images || []).join('\n'),
      amenities: prop.amenities || [],
      description: prop.description
    });
    setPropertyModalOpen(true);
  };

  const handlePropertyFormSubmit = (e) => {
    e.preventDefault();
    const imagesArray = propertyFormData.imagesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const propPayload = {
      title: propertyFormData.title,
      type: propertyFormData.type,
      priceUSD: Number(propertyFormData.priceUSD),
      originalPriceUSD: Number(propertyFormData.originalPriceUSD),
      areaM2: Number(propertyFormData.areaM2),
      bedrooms: Number(propertyFormData.bedrooms),
      bathrooms: Number(propertyFormData.bathrooms),
      floor: Number(propertyFormData.floor),
      totalFloors: Number(propertyFormData.totalFloors),
      yearBuilt: Number(propertyFormData.yearBuilt),
      parkingSpaces: Number(propertyFormData.parkingSpaces),
      statusBadge: propertyFormData.statusBadge,
      isHotDeal: propertyFormData.isHotDeal,
      isDiscounted: Number(propertyFormData.originalPriceUSD) > Number(propertyFormData.priceUSD),
      hasInstallment: propertyFormData.hasInstallment,
      featured: propertyFormData.statusBadge === 'Featured',
      location: {
        city: 'Tashkent',
        district: propertyFormData.district,
        address: propertyFormData.address,
        coordinates: { lat: 41.311, lng: 69.24 }
      },
      images: imagesArray.length > 0 ? imagesArray : [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: propertyFormData.amenities,
      description: propertyFormData.description
    };

    if (editingPropertyId) {
      updateProperty(editingPropertyId, propPayload);
    } else {
      addProperty(propPayload);
    }

    setPropertyModalOpen(false);
  };

  const toggleFormAmenity = (amenity) => {
    setPropertyFormData(prev => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists ? prev.amenities.filter(a => a !== amenity) : [...prev.amenities, amenity]
      };
    });
  };

  const handleDeleteConfirmed = () => {
    if (deleteConfirmId) {
      deleteProperty(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              UyBozor Executive Control Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500 text-white">
              Super Admin
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Authenticated as <strong className="text-slate-700 dark:text-slate-300">uylar@gmail.uz</strong> • Real-time database management & lead conversion
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Listing</span>
          </button>

          <button
            onClick={() => setActiveView('home')}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Return to Marketplace
          </button>
        </div>
      </div>

      {/* KPI Business Analytics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Active Listings
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {totalListings} Units
            </div>
            <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> 100% Verified Titles
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Building className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Inquiry Leads
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {totalLeads} Active
            </div>
            <span className="text-[10px] text-blue-500 font-semibold flex items-center gap-1 mt-0.5">
              <Inbox className="w-3 h-3" /> Real-time Tour Requests
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Portfolio Valuation
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {formatPrice(totalPortfolioUSD)}
            </div>
            <span className="text-[10px] text-slate-400 truncate max-w-[140px] block mt-0.5">
              {totalPortfolioUZS}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Average Asset Price
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {formatPrice(avgPriceUSD)}
            </div>
            <span className="text-[10px] text-emerald-500 font-semibold mt-0.5 block">
              98.2% Tour Satisfaction
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Admin Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setAdminTab('properties')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            adminTab === 'properties'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Properties Management (CRUD) ({properties.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('leads')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            adminTab === 'leads'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Inquiry Leads ({inquiries.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('users')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            adminTab === 'users'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Active Users & Clients</span>
        </button>
      </div>

      {/* TAB 1: PROPERTIES CRUD TABLE */}
      {adminTab === 'properties' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Table Header Filter & Search */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search listings by title, district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={openCreateModal}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Property</span>
              </button>
            </div>
          </div>

          {/* Table View */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase tracking-wider text-[10px] font-bold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Type & District</th>
                  <th className="py-3 px-4">Price ($ / UZS)</th>
                  <th className="py-3 px-4">Area & Rooms</th>
                  <th className="py-3 px-4">Status Badges</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="max-w-xs">
                          <span className="font-bold text-slate-900 dark:text-white block truncate">
                            {prop.title}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate block">
                            {prop.location.address}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                        {prop.type}
                      </span>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400">
                        {prop.location.district}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {formatPrice(prop.priceUSD)}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {calculatePricePerM2(prop.priceUSD, prop.areaM2)}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-800 dark:text-slate-200 block">
                        {formatArea(prop.areaM2)}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {prop.bedrooms} Bed • {prop.bathrooms} Bath
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {prop.featured && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                            Featured
                          </span>
                        )}
                        {prop.isHotDeal && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                            Hot Deal
                          </span>
                        )}
                        {prop.hasInstallment && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-emerald-700 dark:bg-slate-800 dark:text-emerald-400">
                            0% Installment
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openPropertyDetail(prop)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="View on site"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(prop)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Edit listing"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(prop.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Delete listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: INQUIRIES & LEADS MANAGER */}
      {adminTab === 'leads' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Client Tour Bookings & Purchase Inquiries
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Incoming leads submitted from property detail pages and mortgage pre-approval forms.
            </p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {inquiries.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No active inquiry leads.
              </div>
            ) : (
              inquiries.map((lead) => (
                <div key={lead.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {lead.clientName}
                      </h4>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {lead.propertyTitle}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {lead.clientPhone}
                      </span>
                      {lead.clientEmail && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          {lead.clientEmail}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {lead.preferredDate} ({lead.tourType})
                      </span>
                    </div>

                    {lead.message && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                        "{lead.message}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={lead.status}
                      onChange={(e) => updateInquiryStatus(lead.id, e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="New">Status: New Lead</option>
                      <option value="Contacted">Status: Contacted</option>
                      <option value="Completed">Status: Closed / Sold</option>
                    </select>

                    <button
                      onClick={() => deleteInquiry(lead.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: ACTIVE USERS & CLIENTS */}
      {adminTab === 'users' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            System Accounts & Registered VIP Clients
          </h3>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">
                  A
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Administrator Portal</h4>
                  <p className="text-[11px] text-slate-400">uylar@gmail.uz</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-500 border border-amber-500/30">
                Super Admin Role
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                  B
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Bobur Mirzayev</h4>
                  <p className="text-[11px] text-slate-400">bobur.m@gmail.com • +998 90 911 22 33</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
                VIP Buyer
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                  S
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Shahnoza Alimova</h4>
                  <p className="text-[11px] text-slate-400">shahnoza@mail.ru • +998 97 123 99 88</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
                VIP Buyer
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT PROPERTY MODAL */}
      {propertyModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingPropertyId ? 'Edit Property Listing' : 'Create New Real Estate Listing'}
              </h3>
              <button
                onClick={() => setPropertyModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePropertyFormSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Boulevard Luxury Penthouse"
                  value={propertyFormData.title}
                  onChange={(e) => setPropertyFormData({ ...propertyFormData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Property Type
                  </label>
                  <select
                    value={propertyFormData.type}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, type: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  >
                    {['Apartment', 'Villa', 'Penthouse', 'House', 'Commercial'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    District / Location
                  </label>
                  <select
                    value={propertyFormData.district}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, district: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  >
                    {DISTRICTS_LIST.filter(d => d !== 'All Districts').map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Specific Street Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Boulevard Residences, Block 4, Tashkent City"
                  value={propertyFormData.address}
                  onChange={(e) => setPropertyFormData({ ...propertyFormData, address: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              {/* Price Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Price (USD $) *
                  </label>
                  <input
                    type="number"
                    required
                    min="10000"
                    value={propertyFormData.priceUSD}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, priceUSD: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-bold"
                  />
                  <span className="text-[10px] text-slate-400">
                    ≈ {formatDualPrice(propertyFormData.priceUSD).uzs}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Original Price (for Discount badge)
                  </label>
                  <input
                    type="number"
                    value={propertyFormData.originalPriceUSD}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, originalPriceUSD: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Specs: Area, Bedrooms, Bathrooms, Floor */}
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Area (m²) *
                  </label>
                  <input
                    type="number"
                    required
                    value={propertyFormData.areaM2}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, areaM2: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={propertyFormData.bedrooms}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, bedrooms: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={propertyFormData.bathrooms}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, bathrooms: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Floor Level
                  </label>
                  <input
                    type="number"
                    value={propertyFormData.floor}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, floor: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Status Badges Checkboxes */}
              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={propertyFormData.statusBadge === 'Featured'}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, statusBadge: e.target.checked ? 'Featured' : 'Standard' })}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Mark as Featured</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={propertyFormData.isHotDeal}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, isHotDeal: e.target.checked })}
                    className="rounded text-rose-500 focus:ring-rose-500"
                  />
                  <span>Hot Deal Badge</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={propertyFormData.hasInstallment}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, hasInstallment: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>0% Installment Plan Available</span>
                </label>
              </div>

              {/* Image URLs */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Image URLs (one URL per line)
                </label>
                <textarea
                  rows="3"
                  value={propertyFormData.imagesText}
                  onChange={(e) => setPropertyFormData({ ...propertyFormData, imagesText: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-mono"
                />
              </div>

              {/* Amenities Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Select Amenities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {AMENITIES_LIST.map((am) => {
                    const checked = propertyFormData.amenities.includes(am);
                    return (
                      <button
                        type="button"
                        key={am}
                        onClick={() => toggleFormAmenity(am)}
                        className={`text-left p-2 rounded-lg text-[11px] font-medium border transition-colors ${
                          checked
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {am}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Property Description
                </label>
                <textarea
                  rows="3"
                  value={propertyFormData.description}
                  onChange={(e) => setPropertyFormData({ ...propertyFormData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPropertyModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
                >
                  {editingPropertyId ? 'Update Listing' : 'Publish Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-sm w-full border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-500 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Delete Property Listing?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Are you sure you want to permanently remove this property from the marketplace database?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
