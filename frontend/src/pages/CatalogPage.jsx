import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Auth/Navbar'; 
import './Catalog.css';
import catalogBg from '../assets/img/imghero-bg.png'; // Asegúrate de tener esta imagen en la ruta correcta

const CatalogPage = () => {
  return (
    <div className="catalog-page">
      <Navbar /> {/* Barra de navegación global */}

      <header
        className="catalog-header"
        style={{
          backgroundImage: `url(${catalogBg})`,
          backgroundSize: 'cover', // Asegura que la imagen cubra el área
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%', // Asegura que la imagen cubra todo el ancho
          height: '400px', // Ajusta la altura según lo que necesites
        }}
      >
        <div className="catalog-header-content">
          <h1>Catálogo de Muebles</h1>
          <p>Descubre nuestros muebles divididos en categorías y modelos.</p>
        </div>
      </header>

      {/* Secciones del catálogo */}
      <section className="catalog-section">
        <div className="category">
          <h2>Recámara y Estudio</h2>
          <div className="subcategory">
            <Link to="/camas">Camas</Link>
            <Link to="/literas">Literas</Link>
            <Link to="/escritorios">Escritorios</Link>
            <Link to="/armarios">Armarios</Link>
            <Link to="/tocadores">Tocadores</Link>
          </div>
        </div>
      </section>

      {/* Otras secciones del catálogo */}
      <section className="catalog-section">
        <div className="category">
          <h2>Sala</h2>
          <div className="subcategory">
            <Link to="/sofas">Sofás</Link>
            <Link to="/mesas-centro">Mesas de centro</Link>
            <Link to="/libreros">Libreros</Link>
            <Link to="/centros-entretenimiento">Centros de entretenimiento</Link>
          </div>
        </div>
      </section>

      {/* Más secciones del catálogo */}
      <section className="catalog-section">
        <div className="category">
          <h2>Comedor</h2>
          <div className="subcategory">
            <Link to="/comedores">Comedores</Link>
          </div>
        </div>
      </section>

      {/* Más secciones */}
      <section className="catalog-section">
        <div className="category">
          <h2>Cocina</h2>
          <div className="subcategory">
            <Link to="/cocinas-integrales">Cocinas Integrales</Link>
            <Link to="/alacenas">Alacenas</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CatalogPage;
