import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(o => !o);

  return (
    <div className={`homepage ${navOpen ? 'with-nav-open' : ''}`}>
      {/* Botón hamburguesa de tres líneas */}
<div className="hamburger" onClick={toggleNav}>
  <span></span>
  <span></span>
  <span></span>
</div>


      {/* Barra lateral */}
      <nav className={`offcanvas-nav ${navOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#hero" onClick={toggleNav}>Inicio</a></li>
          <li><a href="#tipos" onClick={toggleNav}>Tipos</a></li>
          <li><a href="#modelos" onClick={toggleNav}>Modelos</a></li>
          <li><a href="#productos" onClick={toggleNav}>Productos</a></li>
          <li><a href="#testimonios" onClick={toggleNav}>Testimonios</a></li>
          <li><a href="#contacto" onClick={toggleNav}>Contacto</a></li>
        </ul>
      </nav>

      {/* Sección principal */}
      <header id="hero" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Mueblería El Buen Estilo</h1>
          <p className="hero-subtitle">Calidad, confort y diseño para tu hogar</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn primary">Iniciar Sesión</Link>
            <Link to="/registro" className="btn outline">Registrarse</Link>
          </div>
        </div>
      </header>

      <section id="tipos" className="section tipos">
        <h2>Tipos de Mueble</h2>
        <div className="cards">
          <div className="card"><h3>Sala</h3></div>
          <div className="card"><h3>Comedor</h3></div>
          <div className="card"><h3>Recámara</h3></div>
          <div className="card"><h3>Oficina</h3></div>
        </div>
      </section>

      <section id="modelos" className="section modelos">
        <h2>Modelos Destacados</h2>
        <div className="cards">
          <div className="card"><h3>Moderno</h3></div>
          <div className="card"><h3>Clásico</h3></div>
          <div className="card"><h3>Rústico</h3></div>
          <div className="card"><h3>Minimalista</h3></div>
        </div>
      </section>

      <section id="productos" className="section productos">
        <h2>Productos Destacados</h2>
        <div className="cards products">
          <div className="product-card">
            <div className="product-image" />
            <h4>Sofá Moderno</h4>
            <p>$8,499.00</p>
          </div>
          <div className="product-card">
            <div className="product-image" />
            <h4>Juego de Comedor</h4>
            <p>$12,299.00</p>
          </div>
          <div className="product-card">
            <div className="product-image" />
            <h4>Cama King</h4>
            <p>$9,799.00</p>
          </div>
        </div>
      </section>

      <section id="testimonios" className="section testimonios">
        <h2>Lo que dicen nuestros clientes</h2>
        <div className="cards">
          <blockquote className="testimonial">
            “Excelente calidad y servicio. ¡Lo recomiendo!”<cite>— Ana G.</cite>
          </blockquote>
          <blockquote className="testimonial">
            “Los muebles llegaron a tiempo y tal cual esperaba.”<cite>— Luis M.</cite>
          </blockquote>
        </div>
      </section>

      <section id="contacto" className="section contacto">
        <h2>Contacto</h2>
        <form className="contact-form">
          <input type="text" placeholder="Nombre" required />
          <input type="email" placeholder="Correo electrónico" required />
          <textarea placeholder="Mensaje" rows="4" required></textarea>
          <button type="submit" className="btn primary">Enviar</button>
        </form>
      </section>

      <footer className="footer">
        <p>© 2025 Mueblería El Buen Estilo. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
