import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Asegúrate de tener el archivo CSS adecuado

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen(o => !o);

  return (
    <div className={`navbar-container ${navOpen ? 'with-nav-open' : ''}`}>
      <div className="hamburger" onClick={toggleNav}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`offcanvas-nav ${navOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={() => setNavOpen(false)}>Inicio</Link></li>
          <li><Link to="/catalogo" onClick={() => setNavOpen(false)}>Catálogo</Link></li>
          <li><Link to="#tipos" onClick={() => setNavOpen(false)}>Tipos</Link></li>
          <li><Link to="#productos" onClick={() => setNavOpen(false)}>Productos destacados</Link></li>
          <li><Link to="#testimonios" onClick={() => setNavOpen(false)}>Testimonios</Link></li>
          <li><Link to="#contacto" onClick={() => setNavOpen(false)}>Contacto</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
