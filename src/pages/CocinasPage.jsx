import React from 'react';
import Navbar from '../components/Auth/Navbar';
import './CocinasPage.css';

import cocina1 from '../assets/img/cocina1.jpg';
import cocina2 from '../assets/img/cocina2.jpg';
import cocina3 from '../assets/img/cocina3.jpg';
import cocina4 from '../assets/img/cocina4.jpg';
import cocina5 from '../assets/img/cocina5.jpg';
import cocina6 from '../assets/img/cocina6.jpg';

const CocinasPage = () => {
  return (
    <div className="cocinas-page">
      <Navbar />

      <header className="cocinas-header">
        <h1>Cocinas Integrales</h1>
        <p>Diseños funcionales y modernos para tu cocina.</p>
      </header>

      <section className="product-list">
        {/* Producto 1 */}
        <div className="product-card">
          <img src={cocina1} alt="Cocina Integral Blanca" className="product-image" />
          <h3>Cocina Integral Blanca</h3>
          <p>$18,000.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 2 */}
        <div className="product-card">
          <img src={cocina2} alt="Cocina Estilo Madera" className="product-image" />
          <h3>Cocina Estilo Madera</h3>
          <p>$21,500.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 3 */}
        <div className="product-card">
          <img src={cocina3} alt="Cocina Minimalista" className="product-image" />
          <h3>Cocina Minimalista</h3>
          <p>$25,000.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 4 */}
        <div className="product-card">
          <img src={cocina4} alt="Cocina Compacta" className="product-image" />
          <h3>Cocina Compacta</h3>
          <p>$15,800.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 5 */}
        <div className="product-card">
          <img src={cocina5} alt="Cocina con Isla" className="product-image" />
          <h3>Cocina con Isla</h3>
          <p>$29,000.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 6 */}
        <div className="product-card">
          <img src={cocina6} alt="Cocina Luminosa" className="product-image" />
          <h3>Cocina Luminosa</h3>
          <p>$19,600.00</p>
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

export default CocinasPage;
