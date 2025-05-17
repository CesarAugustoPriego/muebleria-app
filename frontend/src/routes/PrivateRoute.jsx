// frontend/src/routes/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function PrivateRoute({ allowedRoles }) {
  const { token, user } = useContext(AuthContext);

  // 1) Si no hay token => al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2) Si sí hay token pero rol no permitido => al home (o 403)
  if (allowedRoles && (!user || !allowedRoles.includes(user.rol))) {
    return <Navigate to="/" replace />;
  }

  // 3) OK => renderizo la ruta hija
  return <Outlet />;
}
