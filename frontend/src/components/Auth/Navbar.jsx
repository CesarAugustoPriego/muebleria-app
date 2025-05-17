import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/img/Logo.png';

import { AuthContext }     from '../../contexts/AuthContext';
import { CartContext }     from '../../contexts/CartContext';
import { PurchaseContext } from '../../contexts/PurchaseContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location       = useLocation();
  const navigate       = useNavigate();

  const { token, logout } = useContext(AuthContext);
  const { clearCart }     = useContext(CartContext);
  const { clearPurchases }= useContext(PurchaseContext);

  const role = useContext(AuthContext).user?.rol || localStorage.getItem('rol');

  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    clearCart();
    clearPurchases();
    logout();
    navigate('/login');
    setOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <img src={logo} alt="Logo" className="navbar__logo" onClick={() => setOpen(false)} />
      </div>

      <nav className={`navbar__links ${open ? 'open' : ''}`}>
        {/* Links para CLIENTE */}
        {isLoggedIn && role === 'cliente' && (
          <>
            <Link to="/"            onClick={() => setOpen(false)} className={location.pathname === '/' ? 'active' : ''}>Inicio</Link>
            <Link to="/catalogo"    onClick={() => setOpen(false)} className={location.pathname.startsWith('/catalogo') ? 'active' : ''}>Catálogo</Link>
            <Link to="/carrito"     onClick={() => setOpen(false)} className={location.pathname === '/carrito' ? 'active' : ''}>🛒 Carrito</Link>
            <Link to="/mis-compras" onClick={() => setOpen(false)} className={location.pathname === '/mis-compras' ? 'active' : ''}>🧾 Mis Compras</Link>
          </>
        )}

        {/* Links para ADMIN */}
        {isLoggedIn && role === 'admin' && (
          <>
            <Link to="/admin/dashboard" onClick={() => setOpen(false)} className={location.pathname === '/admin/dashboard' ? 'active' : ''}>Dashboard Admin</Link>
            <Link to="/admin/agregar-producto" onClick={() => setOpen(false)} className={location.pathname === '/admin/agregar-producto' ? 'active' : ''}>Agregar Producto</Link>
            <Link to="/admin/productos" onClick={() => setOpen(false)} className={location.pathname === '/admin/productos' ? 'active' : ''}>Productos</Link>
          </>
        )}

        {/* Links para MONITOR */}
        {isLoggedIn && role === 'monitor' && (
          <>
            <Link to="/monitor" onClick={() => setOpen(false)} className={location.pathname === '/monitor' ? 'active' : ''}>Monitoreo</Link>
            <Link to="/auditoria" onClick={() => setOpen(false)} className={location.pathname === '/auditoria' ? 'active' : ''}>Auditoría</Link>
          </>
        )}

        {/* Botón Cerrar Sesión para todos */}
        {isLoggedIn && (
          <button onClick={handleLogout} className="navbar__logout">Cerrar Sesión</button>
        )}
      </nav>

      <button
        className={`navbar__hamburger ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <span /><span /><span />
      </button>
    </header>
  );
}
