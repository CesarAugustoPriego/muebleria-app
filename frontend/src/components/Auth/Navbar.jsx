import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/img/Logo.png';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const toggleMenu = () => setOpen(o => !o);
  const closeMenu  = () => setOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    closeMenu();
  };

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <img src={logo} alt="Logo" className="navbar__logo" onClick={closeMenu}/>
      </div>

      <nav className={`navbar__links ${open ? 'open' : ''}`}>
        <Link to="/"          onClick={closeMenu} className={location.pathname==='/' ? 'active' : ''}>Inicio</Link>
        <Link to="/catalogo"  onClick={closeMenu} className={location.pathname.startsWith('/catalogo') ? 'active' : ''}>Catálogo</Link>
        <Link to="/carrito"   onClick={closeMenu} className={location.pathname==='/carrito' ? 'active' : ''}>🛒 Carrito</Link>
        <Link to="/mis-compras" onClick={closeMenu} className={location.pathname==='/mis-compras' ? 'active' : ''}>🧾 Mis Compras</Link>
        {isLoggedIn && (
          <button onClick={handleLogout} className="navbar__logout">
            Cerrar Sesión
          </button>
        )}
      </nav>

      <button className={`navbar__hamburger ${open ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

export default Navbar;
