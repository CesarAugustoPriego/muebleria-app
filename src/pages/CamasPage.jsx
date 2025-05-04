import React from 'react';
import Navbar from '../components/Auth/Navbar';  // Importa el Navbar
import './CamasPage.css';  // Importa los estilos para esta página

// Importar imágenes de las camas
import cama1 from '../assets/img/cama1.jpg';
import cama2 from '../assets/img/cama2.jpg';
import cama3 from '../assets/img/cama3.jpg';
import cama4 from '../assets/img/cama4.jpg';
import cama5 from '../assets/img/cama5.jpg';
import cama6 from '../assets/img/cama6.jpg';

const CamasPage = () => {
  return (
    <div className="camas-page">
      <Navbar /> {/* Barra de navegación */}

      <header className="camas-header">
        <h1>Camas</h1>
        <p>Elige la cama perfecta para tu descanso y comodidad.</p>
      </header>

      <section className="product-list">
        {/* Producto 1 */}
        <div className="product-card">
          <img src={cama1} alt="Cama Moderna" className="product-image" />
          <h3>Cama Moderna</h3>
          <p>$5,000.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Añadir al carrito</button>
          </div>
        </div>

        {/* Producto 2 */}
        <div className="product-card">
          <img src={cama2} alt="Cama Clásica" className="product-image" />
          <h3>Cama Clásica</h3>
          <p>$4,200.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Añadir al carrito</button>
          </div>
        </div>

        {/* Producto 3 */}
        <div className="product-card">
          <img src={cama3} alt="Cama King Size" className="product-image" />
          <h3>Cama King Size</h3>
          <p>$6,500.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Añadir al carrito</button>
          </div>
        </div>

        {/* Producto 4 */}
        <div className="product-card">
          <img src={cama4} alt="Cama Rústica" className="product-image" />
          <h3>Cama Rústica</h3>
          <p>$4,800.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Añadir al carrito</button>
          </div>
        </div>

        {/* Producto 5 */}
        <div className="product-card">
          <img src={cama5} alt="Cama Minimalista" className="product-image" />
          <h3>Cama Minimalista</h3>
          <p>$4,300.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Añadir al carrito</button>
          </div>
        </div>

        {/* Producto 6 */}
        <div className="product-card">
          <img src={cama6} alt="Cama Compacta" className="product-image" />
          <h3>Cama Compacta</h3>
          <p>$3,700.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Añadir al carrito</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CamasPage;
