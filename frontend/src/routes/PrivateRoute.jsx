import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ allowedRoles }) {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  // No hay token → redirigir al login
  if (!token) return <Navigate to="/login" />;

  // El rol no está permitido → redirigir al home
  if (!allowedRoles.includes(rol)) return <Navigate to="/" />;

  return <Outlet />;
}
