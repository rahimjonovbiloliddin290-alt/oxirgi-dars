import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // CRUD: ADD PRODUCT
  const addProduct = async (newProductData) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProductData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Qo'shishda xatolik");

      setProducts(prev => [data.product, ...prev]);
      setShowProductModal(false);
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // CRUD: EDIT PRODUCT
  const editProduct = async (id, updatedData) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Tahrirlashda xatolik");

      setProducts(prev => prev.map(p => p.id === id ? data.product : p));
      setSelectedProductForEdit(null);
      setShowProductModal(false);
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // CRUD: DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "O'chirishda xatolik");

      setProducts(prev => prev.filter(p => p.id !== id));
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const openAddModal = () => {
    setSelectedProductForEdit(null);
    setShowProductModal(true);
  };

  const openEditModal = (product) => {
    setSelectedProductForEdit(product);
    setShowProductModal(true);
  };

  // Filtered Products helper
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = searchTerm.trim() === '' || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        loading,
        activeCategory,
        setActiveCategory,
        searchTerm,
        setSearchTerm,
        addProduct,
        editProduct,
        deleteProduct,
        showProductModal,
        setShowProductModal,
        selectedProductForEdit,
        openAddModal,
        openEditModal,
        fetchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);

