// frontend/src/pages/HomePage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Auth/Navbar';
import { AuthContext } from '../contexts/AuthContext';
import { categorias } from '../data/catalogData';
import './HomePage.css';
import heroBg from '../assets/img/imghero-bg.png';

export default function HomePage() {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(o => !o);
  const { token } = useContext(AuthContext);

  const [topProducts, setTopProducts] = useState([]);
  const [loadingTop, setLoadingTop] = useState(true);
  const [errorTop, setErrorTop] = useState(null);

  // 1) Carga los 3 productos más vendidos
  useEffect(() => {
    fetch('http://localhost:4000/api/producto/top-vendidos', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(res => {
        if (!res.ok) throw new Error('No se pudieron cargar los productos más vendidos');
        return res.json();
      })
      .then(data => setTopProducts(data))
      .catch(err => setErrorTop(err.message))
      .finally(() => setLoadingTop(false));
  }, [token]);

  // 2) Función para agregar al carrito
  const addToCart = async id => {
    if (!token) return alert('🔒 Debes iniciar sesión primero');
    try {
      const res = await fetch('http://localhost:4000/api/carrito/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productoId: id, cantidad: 1 })
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.msg || 'Error al agregar al carrito');
      alert('✅ ' + body.msg);
    } catch (e) {
      alert('❌ ' + e.message);
    }
  };

  return (
    <div className={`homepage ${navOpen ? 'with-nav-open' : ''}`}>
      <Navbar toggleNav={toggleNav} navOpen={navOpen} />

      {/* HERO */}
      <header
        id="hero"
        className="hero"
        style={{ backgroundImage: `url(${heroBg})` }}
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

      {/* CATEGORÍAS */}
      <section id="tipos" className="section tipos">
        <h2>Tipos de Mueble</h2>
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

      {/* TOP VENDIDOS */}
      <section id="productos" className="section destacados">
        <h2>Productos más vendidos</h2>
        {loadingTop && <p>Cargando productos más vendidos…</p>}
        {errorTop && <p className="text-red-600">{errorTop}</p>}
        <div className="destacados-grid">
          {topProducts.map(p => (
            <div className="product-card" key={p.id}>
              <div
                className="product-image"
                style={{ backgroundImage: `url(http://localhost:4000${p.imagen_url})` }}
              />
              <h4>{p.nombre}</h4>
              <p>${parseFloat(p.precio_unitario).toLocaleString('es-MX')}</p>
              <button
                className="btn primary"
                onClick={() => addToCart(p.id)}
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS */}
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

      {/* CONTACTO */}
      <section id="contacto" className="section contacto">
        <h2>Contacto</h2>
        <form className="contact-form">
          <input type="text" placeholder="Nombre" required />
          <input type="email" placeholder="Correo electrónico" required />
          <textarea placeholder="Mensaje" rows="4" required />
          <button type="submit" className="btn primary">Enviar</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Mueblerías Danny. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}