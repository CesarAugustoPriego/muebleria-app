// frontend/src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ allowedRoles = [] }) {
  // Obtener token y rol desde localStorage
  const token = localStorage.getItem('token');
  const rol   = localStorage.getItem('rol');

  // Si no hay token, redirigir a login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si el rol no está en la lista de permitidos, redirigir a home
  if (!allowedRoles.includes(rol)) {
    return <Navigate to="/" replace />;
  }

  // Si pasa todas las validaciones, renderizar las rutas hijas
  return <Outlet />;
}