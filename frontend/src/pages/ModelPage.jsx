import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Auth/Navbar';
import { productos } from '../data/productsData';
import './ModelPage.css';

const ModelPage = () => {
  const { categoria, modelo } = useParams();
  const items = productos[categoria]?.[modelo] || [];
  const [quantities, setQuantities] = useState(
    items.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );

  const handleQty = (id, val) => {
    setQuantities({ ...quantities, [id]: val });
  };

  const addToCart = p => {
    // llama a tu contexto o API de carrito
    console.log('Agregar:', p, 'Cantidad:', quantities[p.id]);
  };

  return (
    <div className="model-page">
      <Navbar />

      <header className="model-header">
        <h1>{modelo.replace(/-/g, ' ').toUpperCase()}</h1>
        <p>Explora nuestros {modelo.replace(/-/g, ' ')}</p>
      </header>

      <section className="product-list">
        {items.map(p => (
          <div className="product-card" key={p.id}>
            <img src={p.image} alt={p.name} className="product-image" />
            <h3>{p.name}</h3>
            <p>${p.price.toLocaleString('es-MX')}</p>
            <div className="product-options">
              <label>Cantidad:</label>
              <input
                type="number"
                min="1"
                value={quantities[p.id]}
                onChange={e => handleQty(p.id, parseInt(e.target.value))}
              />
              <button className="btn primary" onClick={() => addToCart(p)}>
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ModelPage;
