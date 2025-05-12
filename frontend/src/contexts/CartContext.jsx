// frontend/src/contexts/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { token, user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (token && user) {
      fetch('/api/carrito', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setItems(data.detalles || []))
        .catch(() => setItems([]));
    } else {
      setItems([]);
    }
  }, [token, user]);

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, setItems, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
