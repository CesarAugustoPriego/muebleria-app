import React from 'react';
import Navbar from '../components/Auth/Navbar';  // Importa el Navbar
import './LiterasPage.css';  // Importa los estilos para esta página

// Importar imágenes de las literas
import litera1 from '../assets/img/litera1.jpg';
import litera2 from '../assets/img/litera2.jpg';
import litera3 from '../assets/img/litera3.jpg';
import litera4 from '../assets/img/litera4.jpg';
import litera5 from '../assets/img/litera5.jpg';
import litera6 from '../assets/img/litera6.jpg';

const LiterasPage = () => {
  return (
    <div className="literas-page">
      <Navbar /> {/* Barra de navegación */}

      <header className="literas-header">
        <div className="literas-header-content">
          <h1>Literas</h1>
          <p>Elige la litera perfecta para tu hogar o habitación.</p>
        </div>
      </header>

      <section className="product-list">
        {/* Producto 1 */}
        <div className="product-card">
          <img src={litera1} alt="Litera Moderna" className="product-image" />
          <h3>Litera Moderna</h3>
          <p>$4,500.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 2 */}
        <div className="product-card">
          <img src={litera2} alt="Litera Clásica" className="product-image" />
          <h3>Litera Clásica</h3>
          <p>$3,800.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 3 */}
        <div className="product-card">
          <img src={litera3} alt="Litera Infantil" className="product-image" />
          <h3>Litera Infantil</h3>
          <p>$3,200.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 4 */}
        <div className="product-card">
          <img src={litera4} alt="Litera Rústica" className="product-image" />
          <h3>Litera Rústica</h3>
          <p>$4,200.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 5 */}
        <div className="product-card">
          <img src={litera5} alt="Litera de Madera" className="product-image" />
          <h3>Litera de Madera</h3>
          <p>$4,800.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 6 */}
        <div className="product-card">
          <img src={litera6} alt="Litera Compacta" className="product-image" />
          <h3>Litera Compacta</h3>
          <p>$3,500.00</p>
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

export default LiterasPage;
