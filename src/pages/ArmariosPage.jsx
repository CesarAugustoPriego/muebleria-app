import React from 'react';
import Navbar from '../components/Auth/Navbar';  // Importa el Navbar
import './ArmariosPage.css';  // Importa los estilos para esta página

// Importar imágenes de los armarios
import armario1 from '../assets/img/armario1.jpg';
import armario2 from '../assets/img/armario2.jpg';
import armario3 from '../assets/img/armario3.jpg';
import armario4 from '../assets/img/armario4.jpg';
import armario5 from '../assets/img/armario5.jpg';
import armario6 from '../assets/img/armario6.jpg';

const ArmariosPage = () => {
  return (
    <div className="armarios-page">
      <Navbar /> {/* Barra de navegación */}

      <header className="armarios-header">
        <h1>Armarios</h1>
        <p>Encuentra el armario perfecto para tu hogar.</p>
      </header>

      <section className="product-list">
        {/* Producto 1 */}
        <div className="product-card">
          <img src={armario1} alt="Armario Moderno" className="product-image" />
          <h3>Armario Moderno</h3>
          <p>$5,200.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 2 */}
        <div className="product-card">
          <img src={armario2} alt="Armario Clásico" className="product-image" />
          <h3>Armario Clásico</h3>
          <p>$4,500.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 3 */}
        <div className="product-card">
          <img src={armario3} alt="Armario Compacto" className="product-image" />
          <h3>Armario Compacto</h3>
          <p>$4,000.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 4 */}
        <div className="product-card">
          <img src={armario4} alt="Armario Rústico" className="product-image" />
          <h3>Armario Rústico</h3>
          <p>$5,500.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 5 */}
        <div className="product-card">
          <img src={armario5} alt="Armario de Madera" className="product-image" />
          <h3>Armario de Madera</h3>
          <p>$5,000.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 6 */}
        <div className="product-card">
          <img src={armario6} alt="Armario Minimalista" className="product-image" />
          <h3>Armario Minimalista</h3>
          <p>$4,300.00</p>
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

export default ArmariosPage;
