import React from 'react';
import Navbar from '../components/Auth/Navbar';  // Importa el Navbar
import './SofasPage.css';  // Importa los estilos para esta página

// Importar imágenes de los sofás
import sofa1 from '../assets/img/sofa1.jpg';
import sofa2 from '../assets/img/sofa2.jpg';
import sofa3 from '../assets/img/sofa3.jpg';
import sofa4 from '../assets/img/sofa4.jpg';
import sofa5 from '../assets/img/sofa5.jpg';
import sofa6 from '../assets/img/sofa6.jpg';

const SofasPage = () => {
  return (
    <div className="sofas-page">
      <Navbar /> {/* Barra de navegación */}

      <header className="sofas-header">
        <h1>Sofás</h1>
        <p>Encuentra el sofá perfecto para tu sala.</p>
      </header>

      <section className="product-list">
        {/* Producto 1 */}
        <div className="product-card">
          <img src={sofa1} alt="Sofá Moderno" className="product-image" />
          <h3>Sofá Moderno</h3>
          <p>$12,000.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 2 */}
        <div className="product-card">
          <img src={sofa2} alt="Sofá Clásico" className="product-image" />
          <h3>Sofá Clásico</h3>
          <p>$10,500.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 3 */}
        <div className="product-card">
          <img src={sofa3} alt="Sofá Compacto" className="product-image" />
          <h3>Sofá Compacto</h3>
          <p>$9,000.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 4 */}
        <div className="product-card">
          <img src={sofa4} alt="Sofá Rústico" className="product-image" />
          <h3>Sofá Rústico</h3>
          <p>$11,200.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 5 */}
        <div className="product-card">
          <img src={sofa5} alt="Sofá de Cuero" className="product-image" />
          <h3>Sofá de Cuero</h3>
          <p>$13,500.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 6 */}
        <div className="product-card">
          <img src={sofa6} alt="Sofá Minimalista" className="product-image" />
          <h3>Sofá Minimalista</h3>
          <p>$8,000.00</p>
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

export default SofasPage;
