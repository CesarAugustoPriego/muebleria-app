// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser]   = useState(() => {
    // Si quisieras hidratar desde localStorage, podrías hacerlo aquí
    return null;
  });

  // Ahora login recibe token y perfil completo
  function login(newToken, userData) {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
