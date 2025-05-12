// frontend/src/contexts/PurchaseContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const PurchaseContext = createContext();

export function PurchaseProvider({ children }) {
  const { token, user } = useContext(AuthContext);
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    if (token && user) {
      fetch('/api/ventas', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setVentas(data))
        .catch(() => setVentas([]));
    } else {
      setVentas([]);
    }
  }, [token, user]);

  function clearPurchases() {
    setVentas([]);
  }

  return (
    <PurchaseContext.Provider value={{ ventas, clearPurchases }}>
      {children}
    </PurchaseContext.Provider>
  );
}
