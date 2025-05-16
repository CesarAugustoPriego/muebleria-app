import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Auth/Navbar';
import { categorias } from '../data/catalogData';
import './HomePage.css';
import heroBg from '../assets/img/imghero-bg.png';
import sofaImg from '../assets/img/sofa1.jpg';
import comedorImg from '../assets/img/cocina1.jpg';
import camaImg from '../assets/img/cama1.jpg';

const HomePage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(o => !o);

  return (
    <div className={`homepage ${navOpen ? 'with-nav-open' : ''}`}>
      <Navbar />

      <header
        id="hero"
        className="hero"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Mueblerías Danny</h1>
          <p className="hero-subtitle">Calidad, confort y diseño para tu hogar</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn primary">Iniciar Sesión</Link>
            <Link to="/registro" className="btn outline">Registrarse</Link>
          </div>
        </div>
      </header>

      <section id="tipos" className="section tipos">
        <h2>Categorias Disponibles</h2>
        <div className="cards">
          {categorias.map(cat => (
            <Link
              key={cat.id}
              to={cat.items[0].path.replace(/\/catalogo/, '/catalogo')}
              /* Ajusta aquí tu prefijo de ruta: ej "/catalogo/recamara" */
              className="card card-link"
            >
              <h3>{cat.nombre}</h3>
            </Link>
          ))}
        </div>
      </section>


      {/* seccion prodctos destacadosS */}
      <div style={{ width: '96.7%', textAlign: 'center', padding: '60px 20px', backgroundColor: '#F5F5F5' }} id="productos">
        {/* Solo el título "Productos destacados" centrado */}
        <h2 style={{
          textAlign: 'center',
          display: 'block',
          width: '100%',
          fontSize: '2rem',//Tamaño de letra
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#333'
        }}>
          Productos destacados
        </h2>


        {/* Un espacio para separar el título de las tarjetas */}
        <div style={{ height: '2rem' }}></div>

        {/* Tarjetas de productos */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div className="product-card">
            <div
              className="product-image"
              style={{ backgroundImage: `url(${sofaImg})` }}
            />
            <h4>Sofá Moderno</h4>
            <p>$12,000.00</p>
            <button className="btn primary">Agregar al carrito</button>
          </div>

          <div className="product-card">
            <div
              className="product-image"
              style={{ backgroundImage: `url(${comedorImg})` }}
            />
            <h4>Comedor Minimalista</h4>
            <p>$9,600.00</p>
            <button className="btn primary">Agregar al carrito</button>
          </div>

          <div className="product-card">
            <div
              className="product-image"
              style={{ backgroundImage: `url(${camaImg})` }}
            />
            <h4>Cama King Size</h4>
            <p>$6,500.00</p>
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>
      </div>

      <section id="testimonios" className="section testimonios">
        <h2>Lo que dicen nuestros clientes</h2>
        <div className="cards">
          <blockquote className="testimonial">
            "Excelente calidad y servicio. ¡Lo recomiendo!"
            <cite>— Ana G.</cite>
          </blockquote>
          <blockquote className="testimonial">
            "Los muebles llegaron a tiempo y tal cual esperaba."
            <cite>— Luis M.</cite>
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
        <p>© 2025 Mueblerías Danny. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;