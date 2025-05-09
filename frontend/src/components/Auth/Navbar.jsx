import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/img/Logo.png';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const isLoggedIn = !!localStorage.getItem('token');

  const toggleNav = () => setNavOpen(o => !o);
  const cerrarMenu = () => setNavOpen(false);

  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className={`navbar-container ${navOpen ? 'with-nav-open' : ''}`}>
      <div className="navbar-left">
        <div className="hamburger" onClick={toggleNav}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <nav className={`offcanvas-nav ${navOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={cerrarMenu}>Inicio</Link></li>
          <li><Link to="/catalogo" onClick={cerrarMenu}>Catálogo</Link></li>
          {isHome && (
            <>
              <li><a href="#tipos" onClick={cerrarMenu}>Tipos</a></li>
              <li><a href="#productos" onClick={cerrarMenu}>Productos destacados</a></li>
              <li><a href="#testimonios" onClick={cerrarMenu}>Testimonios</a></li>
              <li><a href="#contacto" onClick={cerrarMenu}>Contacto</a></li>
            </>
          )}
          <li><Link to="/carrito" onClick={cerrarMenu}>🛒 Carrito</Link></li>
          <li><Link to="/mis-compras" onClick={cerrarMenu}>🧾 Mis Compras</Link></li>
          {isLoggedIn && (
            <li>
              <button onClick={cerrarSesion} className="cerrar-sesion-btn">Cerrar Sesión</button>
            </li>
          )}
        </ul>
      </nav>

      <div className="navbar-right">
        <img src={logo} alt="Logo" className="navbar-logo" onClick={() => cerrarMenu()} />
      </div>
    </div>
  );
};

export default Navbar;
