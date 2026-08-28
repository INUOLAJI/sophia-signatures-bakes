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

  const showToast = (toastData) => {
    const data = typeof toastData === 'string' ? { text: toastData, type: 'info' } : toastData;
    setToast(data);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const addToCart = (item, quantity = 1, flavor = null, customDetails = null) => {
    setCartItems(prevItems => {
      // Unique key based on item customKey, flavor, or unique id for custom configurations
      const itemKey = item.key || (customDetails ? `custom-cake-${Date.now()}` : (flavor ? `${item.name}-${flavor}` : item.name));
      const existingIndex = prevItems.findIndex(i => i.key === itemKey);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        showToast({ text: `Updated quantity for "${item.name}" in cart! 🛒`, type: 'add' });
        return updated;
      } else {
        const newItem = {
          ...item,
          key: itemKey,
          flavor: flavor || item.flavor || null,
          customDetails: customDetails || item.customDetails || null,
          quantity: Math.max(quantity, item.minOrder || 1)
        };
        showToast({ text: `Added "${item.name}" to your cart! 🛒`, type: 'add' });
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
    const itemToRemove = cartItems.find(item => item.key === key);
    setCartItems(prev => prev.filter(item => item.key !== key));
    if (itemToRemove) {
      showToast({ text: `Removed "${itemToRemove.name}" from your cart`, type: 'delete' });
    } else {
      showToast({ text: 'Item removed from your cart', type: 'delete' });
    }
  };

  const clearCart = () => {
    setCartItems([]);
    showToast({ text: 'Your cart has been cleared', type: 'delete' });
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
      {/* Global Solid Toast Notification */}
      {toast && (
        <div 
          className="position-fixed bottom-0 end-0 m-3 m-sm-4 p-3 cart-toast-popup rounded-4 d-flex align-items-center gap-3 shadow-lg"
          style={{ zIndex: 99999, minWidth: '290px', maxWidth: '420px' }}
        >
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ 
              backgroundColor: toast.type === 'delete' ? '#FDE8E8' : '#F5EAE0',
              color: toast.type === 'delete' ? '#C53030' : '#754313',
              width: '38px',
              height: '38px',
              fontSize: '1.2rem',
              flexShrink: 0
            }}
          >
            {toast.type === 'delete' ? '🗑️' : '🛒'}
          </div>
          <div className="flex-grow-1 text-start">
            <div className="fw-bold mb-0" style={{ fontSize: '0.9rem', color: '#1A0D05', lineHeight: '1.3' }}>
              {toast.text || toast}
            </div>
            <small className="text-muted" style={{ fontSize: '0.74rem' }}>
              {toast.type === 'delete' ? 'Cart updated' : "Sophia's Signature Bakes"}
            </small>
          </div>
          <button 
            type="button" 
            className="btn-close ms-2" 
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
