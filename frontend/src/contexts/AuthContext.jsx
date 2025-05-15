// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser]   = useState(() => {
    const rol = localStorage.getItem('rol');
    return rol ? { rol } : null;
  });

  function login(newToken, userData) {
    localStorage.setItem('token', newToken);
    localStorage.setItem('rol', userData.rol);      // ← guardamos también el rol
    setToken(newToken);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');                // ← limpiamos el rol
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
