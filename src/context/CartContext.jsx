import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('sophia_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('sophia_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addToCart = (item, quantity = 1, flavor = null) => {
    setCartItems(prevItems => {
      // Unique key based on item name and flavor
      const itemKey = flavor ? `${item.name}-${flavor}` : item.name;
      const existingIndex = prevItems.findIndex(i => i.key === itemKey);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        showToast(`Updated quantity for "${item.name}" in cart! 🛒`);
        return updated;
      } else {
        const newItem = {
          ...item,
          key: itemKey,
          flavor: flavor || item.flavor || null,
          quantity: Math.max(quantity, item.minOrder || 1)
        };
        showToast(`Added "${item.name}"${flavor ? ` (${flavor})` : ''} to cart! 🛒`);
        return [...prevItems, newItem];
      }
    });
  };

  const updateQuantity = (key, delta) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.key === key) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const setItemQuantity = (key, qty) => {
    const num = parseInt(qty, 10);
    if (isNaN(num) || num <= 0) return;
    setCartItems(prev => prev.map(item => item.key === key ? { ...item, quantity: num } : item));
  };

  const removeFromCart = (key) => {
    setCartItems(prev => prev.filter(item => item.key !== key));
    showToast('Item removed from cart.');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => {
    const priceNum = item.priceNum || parseInt(String(item.price).replace(/[^0-9]/g, ''), 10) || 0;
    return acc + (priceNum * item.quantity);
  }, 0);

  // Check if bulk discount applies (e.g. 10 or more total items or 10+ pastry items)
  const isBulkDiscount = totalItemCount >= 10;
  const discountRate = isBulkDiscount ? 0.05 : 0; // 5% discount for 10+ items
  const discountAmount = Math.round(subtotal * discountRate);
  const finalTotal = subtotal - discountAmount;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      setItemQuantity,
      removeFromCart,
      clearCart,
      totalItemCount,
      subtotal,
      isBulkDiscount,
      discountAmount,
      finalTotal,
      toast,
      setToast
    }}>
      {children}
      {/* Global Toast Notification */}
      {toast && (
        <div 
          className="position-fixed bottom-0 end-0 m-3 p-3 bg-golden-dark text-white rounded-4 shadow-lg d-flex align-items-center gap-3 border border-golden"
          style={{ zIndex: 99999, animation: 'fadeIn 0.3s ease-in-out' }}
        >
          <span className="fs-4">✨</span>
          <div className="fw-semibold small">{toast}</div>
          <button 
            type="button" 
            className="btn-close btn-close-white ms-auto small" 
            aria-label="Close" 
            onClick={() => setToast(null)}
          />
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
