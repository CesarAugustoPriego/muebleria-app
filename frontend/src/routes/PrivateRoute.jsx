// frontend/src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ allowedRoles }) {
  // Obtener token y rol del usuario desde localStorage o contexto
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol'); // O obtener del contexto AuthContext si tienes

  if (!token) {
    // No autenticado, redirige a login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(rol)) {
    // No autorizado para esta ruta, redirige a home o a una página de "No autorizado"
    return <Navigate to="/" replace />;
  }

  // Usuario autenticado y autorizado, renderizar componente hijo(s)
  return <Outlet />;
}
