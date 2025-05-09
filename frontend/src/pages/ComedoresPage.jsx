import React from 'react';
import Navbar from '../components/Auth/Navbar';
import './ComedoresPage.css';

// Imágenes de comedores
import comedor1 from '../assets/img/comedor1.jpg';
import comedor2 from '../assets/img/comedor2.jpg';
import comedor3 from '../assets/img/comedor3.jpg';
import comedor4 from '../assets/img/comedor4.jpg';
import comedor5 from '../assets/img/comedor5.jpg';
import comedor6 from '../assets/img/comedor6.jpg';

const ComedoresPage = () => {
  return (
    <div className="comedores-page">
      <Navbar />

      <header className="comedores-header">
        <h1>Comedores</h1>
        <p>Descubre comedores elegantes y funcionales para cada ocasión.</p>
      </header>

      <section className="product-list">
        <div className="product-card">
          <img src={comedor1} alt="Comedor Clásico" className="product-image" />
          <h3>Comedor Clásico</h3>
          <p>$9,800.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        <div className="product-card">
          <img src={comedor2} alt="Comedor Moderno" className="product-image" />
          <h3>Comedor Moderno</h3>
          <p>$12,500.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        <div className="product-card">
          <img src={comedor3} alt="Comedor Rústico" className="product-image" />
          <h3>Comedor Rústico</h3>
          <p>$10,200.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        <div className="product-card">
          <img src={comedor4} alt="Comedor Industrial" className="product-image" />
          <h3>Comedor Industrial</h3>
          <p>$11,400.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        <div className="product-card">
          <img src={comedor5} alt="Comedor de Lujo" className="product-image" />
          <h3>Comedor de Lujo</h3>
          <p>$14,300.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        <div className="product-card">
          <img src={comedor6} alt="Comedor Minimalista" className="product-image" />
          <h3>Comedor Minimalista</h3>
          <p>$9,600.00</p>
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

export default ComedoresPage;
