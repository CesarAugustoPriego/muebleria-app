import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const toggleNav = () => setNavOpen(o => !o);
  const cerrarMenu = () => setNavOpen(false);

  return (
    <div className={`navbar-container ${navOpen ? 'with-nav-open' : ''}`}>
      <div className="hamburger" onClick={toggleNav}>
        <span></span>
        <span></span>
        <span></span>
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
          <li><Link to="/mis-compras" onClick={cerrarMenu}>🧾 Mis Compras</Link></li> {/* Nueva opción */}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
