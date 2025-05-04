import React from 'react';
import Navbar from '../components/Auth/Navbar';
import './CentrosEntretenimientoPage.css';

// Imágenes de centros de entretenimiento
import centro1 from '../assets/img/centro1.jpg';
import centro2 from '../assets/img/centro2.jpg';
import centro3 from '../assets/img/centro3.jpg';
import centro4 from '../assets/img/centro4.jpg';
import centro5 from '../assets/img/centro5.jpg';
import centro6 from '../assets/img/centro6.jpg';

const CentrosEntretenimientoPage = () => {
  return (
    <div className="centros-page">
      <Navbar />

      <header className="centros-header">
        <h1>Centros de Entretenimiento</h1>
        <p>Organiza tu sala con estilo y funcionalidad.</p>
      </header>

      <section className="product-list">
        <div className="product-card">
          <img src={centro1} alt="Centro Clásico" className="product-image" />
          <h3>Centro Clásico</h3>
          <p>$7,200.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        <div className="product-card">
          <img src={centro2} alt="Centro Moderno" className="product-image" />
          <h3>Centro Moderno</h3>
          <p>$8,500.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        <div className="product-card">
          <img src={centro3} alt="Centro Rústico" className="product-image" />
          <h3>Centro Rústico</h3>
          <p>$6,900.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        <div className="product-card">
          <img src={centro4} alt="Centro Minimalista" className="product-image" />
          <h3>Centro Minimalista</h3>
          <p>$7,800.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        <div className="product-card">
          <img src={centro5} alt="Centro Industrial" className="product-image" />
          <h3>Centro Industrial</h3>
          <p>$8,100.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        <div className="product-card">
          <img src={centro6} alt="Centro de Lujo" className="product-image" />
          <h3>Centro de Lujo</h3>
          <p>$9,500.00</p>
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

export default CentrosEntretenimientoPage;
