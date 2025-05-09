import React from 'react';
import Navbar from '../components/Auth/Navbar';  // Importa el Navbar
import './EscritoriosPage.css';  // Importa los estilos para esta página

// Importar imágenes de los escritorios
import escritorio1 from '../assets/img/escritorio1.jpg';
import escritorio2 from '../assets/img/escritorio2.jpg';
import escritorio3 from '../assets/img/escritorio3.jpg';
import escritorio4 from '../assets/img/escritorio4.jpg';
import escritorio5 from '../assets/img/escritorio5.jpg';
import escritorio6 from '../assets/img/escritorio6.jpg';

const EscritoriosPage = () => {
  return (
    <div className="escritorios-page">
      <Navbar /> {/* Barra de navegación */}

      <header className="escritorios-header">
        <h1>Escritorios</h1>
        <p>Encuentra el escritorio perfecto para tu espacio de trabajo.</p>
      </header>

      <section className="product-list">
        {/* Producto 1 */}
        <div className="product-card">
          <img src={escritorio1} alt="Escritorio Moderno" className="product-image" />
          <h3>Escritorio Moderno</h3>
          <p>$3,200.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 2 */}
        <div className="product-card">
          <img src={escritorio2} alt="Escritorio Clásico" className="product-image" />
          <h3>Escritorio Clásico</h3>
          <p>$2,800.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 3 */}
        <div className="product-card">
          <img src={escritorio3} alt="Escritorio Compacto" className="product-image" />
          <h3>Escritorio Compacto</h3>
          <p>$2,500.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 4 */}
        <div className="product-card">
          <img src={escritorio4} alt="Escritorio de Madera" className="product-image" />
          <h3>Escritorio de Madera</h3>
          <p>$3,700.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 5 */}
        <div className="product-card">
          <img src={escritorio5} alt="Escritorio con Estantes" className="product-image" />
          <h3>Escritorio con Estantes</h3>
          <p>$3,000.00</p>
          <div className="product-options">
            <label>Cantidad:</label>
            <input type="number" min="1" defaultValue="1" />
            <button className="btn primary">Agregar al carrito</button>
          </div>
        </div>

        {/* Producto 6 */}
        <div className="product-card">
          <img src={escritorio6} alt="Escritorio Minimalista" className="product-image" />
          <h3>Escritorio Minimalista</h3>
          <p>$2,900.00</p>
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

export default EscritoriosPage;
