import React from 'react';
import Navbar from '../components/Auth/Navbar';
import './AlacenasPage.css';

import alacena1 from '../assets/img/alacena1.jpg';
import alacena2 from '../assets/img/alacena2.jpg';
import alacena3 from '../assets/img/alacena3.jpg';
import alacena4 from '../assets/img/alacena4.jpg';
import alacena5 from '../assets/img/alacena5.jpg';
import alacena6 from '../assets/img/alacena6.jpg';

const AlacenasPage = () => {
  return (
    <div className="alacenas-page">
      <Navbar />

      <header className="alacenas-header">
        <h1>Alacenas</h1>
        <p>Organiza tu cocina con nuestras alacenas prácticas y elegantes.</p>
      </header>

      <section className="product-list">
        {/* Producto 1 */}
        <div className="product-card">
          <img src={alacena1} alt="Alacena Clásica" className="product-image" />
          <h3>Alacena Clásica</h3>
          <p>$3,500.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 2 */}
        <div className="product-card">
          <img src={alacena2} alt="Alacena Blanca" className="product-image" />
          <h3>Alacena Blanca</h3>
          <p>$4,200.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 3 */}
        <div className="product-card">
          <img src={alacena3} alt="Alacena con Vidrio" className="product-image" />
          <h3>Alacena con Vidrio</h3>
          <p>$4,800.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 4 */}
        <div className="product-card">
          <img src={alacena4} alt="Alacena de Madera" className="product-image" />
          <h3>Alacena de Madera</h3>
          <p>$5,100.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 5 */}
        <div className="product-card">
          <img src={alacena5} alt="Alacena Moderna" className="product-image" />
          <h3>Alacena Moderna</h3>
          <p>$5,700.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 6 */}
        <div className="product-card">
          <img src={alacena6} alt="Alacena Alta" className="product-image" />
          <h3>Alacena Alta</h3>
          <p>$6,300.00</p>
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

export default AlacenasPage;
