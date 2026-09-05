import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('techfix_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [adminOrders, setAdminOrders] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [lastTelegramNotice, setLastTelegramNotice] = useState(null);

  useEffect(() => {
    localStorage.setItem('techfix_cart', JSON.stringify(cart));
  }, [cart]);

  const fetchAdminOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      if (res.ok) {
        const data = await res.json();
        setAdminOrders(data);
      }
    } catch (err) {
      console.error('Error fetching admin orders:', err);
    }
  };

  useEffect(() => {
    fetchAdminOrders();
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Submit Order (User side -> Telegram & Backend)
  const submitOrder = async (orderData) => {
    try {
      const payload = {
        customerName: orderData.customerName,
        customerPhone: orderData.customerPhone,
        address: orderData.address || "Do'kondan olib ketish",
        items: orderData.items || cart,
        totalAmount: orderData.totalAmount || cartTotal,
        notes: orderData.notes || ''
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Buyurtma berishda xatolik");

      // Clear cart on success
      clearCart();
      setShowCartModal(false);

      // Save telegram notice format for UI modal/alert
      setLastTelegramNotice({
        formattedText: data.telegramFormattedText,
        link: data.telegramLink || 'https://t.me/Salox71'
      });

      // Refresh admin orders
      fetchAdminOrders();

      return { success: true, message: data.message, order: data.order };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Admin status update
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Status o'zgartirishda xatolik");

      setAdminOrders(prev =>
        prev.map(ord => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
      );
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Count unread / new orders
  const unreadOrdersCount = adminOrders.filter(o => o.status === 'Yangi').length;

  return (
    <OrderContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        showCartModal,
        setShowCartModal,
        submitOrder,
        adminOrders,
        updateOrderStatus,
        unreadOrdersCount,
        fetchAdminOrders,
        lastTelegramNotice,
        setLastTelegramNotice
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);

