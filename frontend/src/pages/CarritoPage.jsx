import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Auth/Navbar';
import { categorias } from '../data/catalogData';
import './Catalog.css';
import catalogBg from '../assets/img/imghero-bg.png';

const CatalogPage = () => {
  const [openId, setOpenId] = useState(null);
  const toggle = id => setOpenId(openId === id ? null : id);

  return (
    <div className="catalog-page">
      <Navbar />

      <header
        className="catalog-header"
        style={{ backgroundImage: `url(${catalogBg})` }}
      >
        <div className="catalog-header-content">
          <h1>Catálogo de Muebles</h1>
          <p>Descubre nuestros muebles divididos en categorías y modelos.</p>
        </div>
      </header>

      <div className="catalog-container">
        {categorias.map(cat => (
          <div
            key={cat.id}
            className={`catalog-section ${openId === cat.id ? 'open' : ''}`}
          >
            <div
              className="catalog-section-header"
              onClick={() => toggle(cat.id)}
            >
              <h2>{cat.nombre}</h2>
              <span className="accordion-icon">
                {openId === cat.id ? '−' : '+'}
              </span>
            </div>
            <ul className="subcategory-list">
              {cat.items.map(item => (
                <li key={item.path}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
