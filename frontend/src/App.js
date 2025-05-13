// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage      from './pages/LoginPage';
import RegistroPage   from './pages/RegistroPage';
import HomePage       from './pages/HomePage';
import CatalogPage    from './pages/CatalogPage';
import ModelPage      from './pages/ModelPage';
import CarritoPage    from './pages/CarritoPage';
import MisComprasPage from './pages/MisComprasPage';

import AgregarProducto from './adminPages/AgregarProducto';
import DashboardAdmin   from './adminPages/DashboardAdmin';
import ProductosAdmin   from './adminPages/ProductosAdmin';

import MonitorPage      from './monitorPages/MonitorPage';

import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>

        {/* Rutas públicas */}
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/"         element={<HomePage />} />

        {/* Catálogo y modelos */}
        <Route path="/catalogo"                    element={<CatalogPage />} />
        <Route path="/catalogo/:categoria/:modelo" element={<ModelPage />} />

        {/* Carrito y compras */}
        <Route path="/carrito"     element={<CarritoPage />} />
        <Route path="/mis-compras" element={<MisComprasPage />} />

        {/* Rutas protegidas (solo admin) */}
        <Route element={<PrivateRoute allowedRoles={[ 'admin' ]} />}>
          <Route path="/admin/agregar-producto" element={<AgregarProducto />} />
          <Route path="/admin/dashboard"        element={<DashboardAdmin />} />
          <Route path="/admin/productos"        element={<ProductosAdmin />} />
        </Route>

        {/* Ruta protegida para monitoreo (monitor o admin) */}
        <Route element={<PrivateRoute allowedRoles={[ 'monitor', 'admin' ]} />}>
          <Route path="/monitor" element={<MonitorPage />} />
        </Route>

        {/* Ruta catch-all: redirigir a home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
