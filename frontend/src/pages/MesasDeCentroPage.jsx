import React from 'react';
import Navbar from '../components/Auth/Navbar';  // Importa el Navbar
import './MesasDeCentroPage.css';  // Importa los estilos para esta página

// Importar imágenes de las mesas de centro
import mesa1 from '../assets/img/mesa1.jpg';
import mesa2 from '../assets/img/mesa2.jpg';
import mesa3 from '../assets/img/mesa3.jpg';
import mesa4 from '../assets/img/mesa4.jpg';
import mesa5 from '../assets/img/mesa5.jpg';
import mesa6 from '../assets/img/mesa6.jpg';

const MesasDeCentroPage = () => {
  return (
    <div className="mesas-de-centro-page">
      <Navbar /> {/* Barra de navegación */}

      <header className="mesas-de-centro-header">
        <h1>Mesas de Centro</h1>
        <p>Encuentra la mesa de centro perfecta para tu sala de estar.</p>
      </header>

      <section className="product-list">
        {/* Producto 1 */}
        <div className="product-card">
          <img src={mesa1} alt="Mesa de Centro Moderna" className="product-image" />
          <h3>Mesa de Centro Moderna</h3>
          <p>$5,000.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 2 */}
        <div className="product-card">
          <img src={mesa2} alt="Mesa de Centro de Madera" className="product-image" />
          <h3>Mesa de Centro de Madera</h3>
          <p>$6,500.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 3 */}
        <div className="product-card">
          <img src={mesa3} alt="Mesa de Centro Industrial" className="product-image" />
          <h3>Mesa de Centro Industrial</h3>
          <p>$7,200.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 4 */}
        <div className="product-card">
          <img src={mesa4} alt="Mesa de Centro Elegante" className="product-image" />
          <h3>Mesa de Centro Elegante</h3>
          <p>$8,500.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 5 */}
        <div className="product-card">
          <img src={mesa5} alt="Mesa de Centro Contemporánea" className="product-image" />
          <h3>Mesa de Centro Contemporánea</h3>
          <p>$9,000.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 6 */}
        <div className="product-card">
          <img src={mesa6} alt="Mesa de Centro Rústica" className="product-image" />
          <h3>Mesa de Centro Rústica</h3>
          <p>$5,800.00</p>
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

export default MesasDeCentroPage;
