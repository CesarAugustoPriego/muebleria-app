import React from 'react';
import Navbar from '../components/Auth/Navbar';  // Importa el Navbar
import './LibrerosPage.css';  // Importa los estilos para esta página

// Importar imágenes de los libreros
import librero1 from '../assets/img/librero1.jpg';
import librero2 from '../assets/img/librero2.jpg';
import librero3 from '../assets/img/librero3.jpg';
import librero4 from '../assets/img/librero4.jpg';
import librero5 from '../assets/img/librero5.jpg';
import librero6 from '../assets/img/librero6.jpg';

const LibrerosPage = () => {
  return (
    <div className="libreros-page">
      <Navbar /> {/* Barra de navegación */}

      <header className="libreros-header">
        <h1>Libreros</h1>
        <p>Encuentra el librero ideal para tu hogar u oficina.</p>
      </header>

      <section className="product-list">
        {/* Producto 1 */}
        <div className="product-card">
          <img src={librero1} alt="Librero Moderno" className="product-image" />
          <h3>Librero Moderno</h3>
          <p>$4,500.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 2 */}
        <div className="product-card">
          <img src={librero2} alt="Librero de Madera" className="product-image" />
          <h3>Librero de Madera</h3>
          <p>$5,800.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 3 */}
        <div className="product-card">
          <img src={librero3} alt="Librero Escalera" className="product-image" />
          <h3>Librero Escalera</h3>
          <p>$6,200.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 4 */}
        <div className="product-card">
          <img src={librero4} alt="Librero Minimalista" className="product-image" />
          <h3>Librero Minimalista</h3>
          <p>$4,000.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 5 */}
        <div className="product-card">
          <img src={librero5} alt="Librero de Metal" className="product-image" />
          <h3>Librero de Metal</h3>
          <p>$5,200.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 6 */}
        <div className="product-card">
          <img src={librero6} alt="Librero con Estantes" className="product-image" />
          <h3>Librero con Estantes</h3>
          <p>$6,800.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LibrerosPage;
