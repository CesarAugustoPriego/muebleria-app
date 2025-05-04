import React from 'react';
import Navbar from '../components/Auth/Navbar';  // Importa el Navbar
import './TocadoresPage.css';  // Importa los estilos para esta página

// Importar imágenes de los tocadores
import tocador1 from '../assets/img/tocador1.jpg';
import tocador2 from '../assets/img/tocador2.jpg';
import tocador3 from '../assets/img/tocador3.jpg';
import tocador4 from '../assets/img/tocador4.jpg';
import tocador5 from '../assets/img/tocador5.jpg';
import tocador6 from '../assets/img/tocador6.jpg';

const TocadoresPage = () => {
  return (
    <div className="tocadores-page">
      <Navbar /> {/* Barra de navegación */}

      <header className="tocadores-header">
        <h1>Tocadores</h1>
        <p>Encuentra el tocador ideal para tu habitación.</p>
      </header>

      <section className="product-list">
        {/* Producto 1 */}
        <div className="product-card">
          <img src={tocador1} alt="Tocador Moderno" className="product-image" />
          <h3>Tocador Moderno</h3>
          <p>$6,000.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 2 */}
        <div className="product-card">
          <img src={tocador2} alt="Tocador Clásico" className="product-image" />
          <h3>Tocador Clásico</h3>
          <p>$5,500.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 3 */}
        <div className="product-card">
          <img src={tocador3} alt="Tocador Vintage" className="product-image" />
          <h3>Tocador Vintage</h3>
          <p>$5,200.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 4 */}
        <div className="product-card">
          <img src={tocador4} alt="Tocador Rústico" className="product-image" />
          <h3>Tocador Rústico</h3>
          <p>$5,800.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 5 */}
        <div className="product-card">
          <img src={tocador5} alt="Tocador de Madera" className="product-image" />
          <h3>Tocador de Madera</h3>
          <p>$6,500.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 6 */}
        <div className="product-card">
          <img src={tocador6} alt="Tocador Minimalista" className="product-image" />
          <h3>Tocador Minimalista</h3>
          <p>$5,000.00</p>
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

export default TocadoresPage;
