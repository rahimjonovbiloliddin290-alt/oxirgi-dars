import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROPERTIES, EXCHANGE_RATE_UZS } from '../data/mockProperties';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('uy_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Apply theme class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('uy_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Currency & Measurement Unit
  const [currency, setCurrency] = useState(() => localStorage.getItem('uy_currency') || 'USD');
  const [areaUnit, setAreaUnit] = useState(() => localStorage.getItem('uy_unit') || 'm²');

  useEffect(() => {
    localStorage.setItem('uy_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('uy_unit', areaUnit);
  }, [areaUnit]);

  // Properties State (with CRUD and localStorage persistence)
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem('uy_properties');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse properties', e);
      }
    }
    return INITIAL_PROPERTIES;
  });

  useEffect(() => {
    localStorage.setItem('uy_properties', JSON.stringify(properties));
  }, [properties]);

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('uy_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse wishlist', e);
      }
    }
    return ["prop-1", "prop-3"];
  });

  useEffect(() => {
    localStorage.setItem('uy_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from saved homes', 'info');
        return prev.filter(item => item !== id);
      } else {
        showToast('Added to saved homes wishlist!', 'success');
        return [...prev, id];
      }
    });
  };

  const isInWishlist = (id) => wishlist.includes(id);

  // Inquiries / Leads State
  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('uy_inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse inquiries', e);
      }
    }
    return [
      {
        id: "lead-1",
        propertyId: "prop-1",
        propertyTitle: "The Boulevard Imperial Penthouse",
        clientName: "Bobur Mirzayev",
        clientPhone: "+998 90 911 22 33",
        clientEmail: "bobur.m@gmail.com",
        tourType: "In-Person VIP Tour",
        preferredDate: "2026-11-12",
        preferredTime: "14:00",
        message: "Interested in financing through the developer 24-month installment option. Please arrange private parking on arrival.",
        status: "New",
        createdAt: "2026-11-06T10:30:00Z"
      },
      {
        id: "lead-2",
        propertyId: "prop-2",
        propertyTitle: "Villa Solarium with Botanic Garden",
        clientName: "Shahnoza Alimova",
        clientPhone: "+998 97 123 99 88",
        clientEmail: "shahnoza@mail.ru",
        tourType: "Live Virtual Tour",
        preferredDate: "2026-11-10",
        preferredTime: "11:30",
        message: "Currently abroad, would like to inspect the sauna, guest cottage, and perimeter security via video call.",
        status: "Contacted",
        createdAt: "2026-11-05T15:20:00Z"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('uy_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const addInquiry = (inquiryData) => {
    const newInquiry = {
      id: "lead-" + Date.now(),
      createdAt: new Date().toISOString(),
      status: "New",
      ...inquiryData
    };
    setInquiries(prev => [newInquiry, ...prev]);
    showToast('Your inquiry and tour request have been submitted! Our agent will contact you shortly.', 'success');
    return newInquiry;
  };

  const updateInquiryStatus = (id, newStatus) => {
    setInquiries(prev =>
      prev.map(inq => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
    showToast(`Lead status updated to ${newStatus}`, 'info');
  };

  const deleteInquiry = (id) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id));
    showToast('Inquiry lead removed', 'info');
  };

  // User & Authentication State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('uy_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse user', e);
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('uy_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('uy_user');
    }
  }, [user]);

  const login = (email, password) => {
    // Check admin credentials
    if (email.trim().toLowerCase() === 'uylar@gmail.uz' && password === 'Uylar1234') {
      const adminUser = {
        name: 'UyBozor Administrator',
        email: 'uylar@gmail.uz',
        role: 'admin',
        phone: '+998 71 200 88 00',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      };
      setUser(adminUser);
      showToast('Welcome back, Administrator!', 'success');
      return { success: true, user: adminUser };
    }

    // Check client credentials
    if (email && password) {
      const clientUser = {
        name: email.split('@')[0].toUpperCase(),
        email: email,
        role: 'client',
        phone: '+998 90 000 00 00',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
      };
      setUser(clientUser);
      showToast(`Welcome back, ${clientUser.name}!`, 'success');
      return { success: true, user: clientUser };
    }

    return { success: false, message: 'Invalid email or password' };
  };

  const register = ({ name, email, phone }) => {
    const newUser = {
      name: name || email.split('@')[0],
      email: email,
      role: 'client',
      phone: phone || '+998 90 000 00 00',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
    };
    setUser(newUser);
    showToast(`Account created successfully! Welcome, ${newUser.name}.`, 'success');
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    if (activeView === 'admin-dashboard' || activeView === 'user-dashboard') {
      setActiveView('home');
    }
    showToast('You have been logged out.', 'info');
  };

  // Property CRUD Methods
  const addProperty = (newProp) => {
    const id = "prop-" + Date.now();
    const createdProp = {
      id,
      views: 1,
      nearbyPoints: [
        { name: "Public Transit Hub", distance: "400m", type: "transit" },
        { name: "Supermarket & Market", distance: "250m", type: "shop" },
        { name: "City Park", distance: "500m", type: "park" }
      ],
      agent: {
        name: "Alisher Rustamov",
        role: "Luxury Estates Director",
        phone: "+998 90 123 45 67",
        telegram: "@alisher_luxury_realty",
        email: "alisher.r@uybozor.uz",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
      },
      ...newProp
    };
    setProperties(prev => [createdProp, ...prev]);
    showToast('New property listing created successfully!', 'success');
    return createdProp;
  };

  const updateProperty = (id, updatedFields) => {
    setProperties(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast('Property listing updated successfully!', 'success');
  };

  const deleteProperty = (id) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    setWishlist(prev => prev.filter(item => item !== id));
    showToast('Property listing removed from database.', 'info');
  };

  // Active View and Navigation
  const [activeView, setActiveView] = useState('home'); // 'home' | 'catalog' | 'calculator' | 'user-dashboard' | 'admin-dashboard'
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [quickViewProperty, setQuickViewProperty] = useState(null);
  const [inquiryModalProperty, setInquiryModalProperty] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register' | 'admin'

  // Global Toast State
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToast({ message, type, id });
    setTimeout(() => {
      setToast(curr => (curr && curr.id === id ? null : curr));
    }, 4000);
  };

  // Global Catalog Filters State
  const [filters, setFilters] = useState({
    searchKeyword: '',
    district: 'All Districts',
    type: 'All',
    priceMin: 50000,
    priceMax: 1000000,
    bedrooms: 'All',
    status: 'All', // 'All', 'Discounted', 'Hot Deal', 'Installment'
    amenities: [],
    sortBy: 'popular', // 'popular', 'price-low', 'price-high', 'newest', 'sqm-price'
    viewMode: 'grid' // 'grid' | 'list'
  });

  const resetFilters = () => {
    setFilters({
      searchKeyword: '',
      district: 'All Districts',
      type: 'All',
      priceMin: 50000,
      priceMax: 1000000,
      bedrooms: 'All',
      status: 'All',
      amenities: [],
      sortBy: 'popular',
      viewMode: filters.viewMode
    });
  };

  // Formatting & Financial Helpers
  const formatPrice = (usdAmount) => {
    if (usdAmount === undefined || usdAmount === null) return '$0';
    if (currency === 'UZS') {
      const uzs = Math.round(usdAmount * EXCHANGE_RATE_UZS);
      return uzs.toLocaleString('uz-UZ') + ' UZS';
    }
    return '$' + usdAmount.toLocaleString('en-US');
  };

  const formatDualPrice = (usdAmount) => {
    if (!usdAmount) return { usd: '$0', uzs: '0 UZS' };
    const usd = '$' + usdAmount.toLocaleString('en-US');
    const uzs = Math.round(usdAmount * EXCHANGE_RATE_UZS).toLocaleString('uz-UZ') + ' UZS';
    return { usd, uzs };
  };

  const formatArea = (areaM2) => {
    if (!areaM2) return '0 m²';
    if (areaUnit === 'sqft') {
      const sqft = Math.round(areaM2 * 10.7639);
      return `${sqft.toLocaleString('en-US')} sqft`;
    }
    return `${areaM2} m²`;
  };

  const calculatePricePerM2 = (usdAmount, areaM2) => {
    if (!usdAmount || !areaM2) return '$0 / m²';
    if (currency === 'UZS') {
      if (areaUnit === 'sqft') {
        const uzsPerSqft = Math.round((usdAmount * EXCHANGE_RATE_UZS) / (areaM2 * 10.7639));
        return `${uzsPerSqft.toLocaleString('uz-UZ')} UZS / sqft`;
      }
      const uzsPerM2 = Math.round((usdAmount * EXCHANGE_RATE_UZS) / areaM2);
      return `${uzsPerM2.toLocaleString('uz-UZ')} UZS / m²`;
    }
    if (areaUnit === 'sqft') {
      const perSqft = Math.round(usdAmount / (areaM2 * 10.7639));
      return `$${perSqft.toLocaleString('en-US')} / sqft`;
    }
    const perM2 = Math.round(usdAmount / areaM2);
    return `$${perM2.toLocaleString('en-US')} / m²`;
  };

  const openPropertyDetail = (property) => {
    setSelectedProperty(property);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closePropertyDetail = () => {
    setSelectedProperty(null);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currency,
        setCurrency,
        areaUnit,
        setAreaUnit,
        properties,
        addProperty,
        updateProperty,
        deleteProperty,
        wishlist,
        toggleWishlist,
        isInWishlist,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        user,
        login,
        register,
        logout,
        activeView,
        setActiveView,
        selectedProperty,
        setSelectedProperty,
        openPropertyDetail,
        closePropertyDetail,
        quickViewProperty,
        setQuickViewProperty,
        inquiryModalProperty,
        setInquiryModalProperty,
        authModalOpen,
        setAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        filters,
        setFilters,
        resetFilters,
        toast,
        showToast,
        formatPrice,
        formatDualPrice,
        formatArea,
        calculatePricePerM2,
        exchangeRate: EXCHANGE_RATE_UZS
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
