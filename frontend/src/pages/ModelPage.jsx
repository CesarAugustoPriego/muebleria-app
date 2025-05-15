import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Auth/Navbar';
import './ModelPage.css';

export default function ModelPage() {
  const { categoria, modelo } = useParams();
  const [productos, setProductos] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const API = 'http://localhost:4000/api';

  const modeloSlugToId = {
    camas: 1,
    literas: 2,
    escritorios: 3,
    armarios: 4,
    tocadores: 5,
    sofas: 6,
    'mesas-de-centro': 7,
    libreros: 8,
    'centros-de-entretenimiento': 9,
    comedores: 10,
    'cocinas-integrales': 11,
    alacenas: 12
  };
  const modeloId = modeloSlugToId[modelo] || 0;

  useEffect(() => {
    if (!modeloId) {
      setError('Modelo desconocido');
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`${API}/producto/modelo/${modeloId}`)
      .then(res => {
        if (!res.ok) throw new Error('No se pudieron cargar los productos');
        return res.json();
      })
      .then(data => {
        setProductos(data);
        const initQty = data.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {});
        setQuantities(initQty);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [modeloId]);

  const handleQty = (id, val) => {
    if (val < 1) val = 1;
    setQuantities(q => ({ ...q, [id]: val }));
  };

  const addToCart = async producto => {
    if (!token) return alert('🔒 Debes iniciar sesión primero');
    try {
      const res = await fetch(`${API}/carrito/agregar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          productoId: producto.id,
          cantidad: quantities[producto.id] || 1
        })
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.msg || 'Error desconocido');
      alert('✅ ' + body.msg);
    } catch (e) {
      alert('❌ ' + e.message);
    }
  };

  return (
    <div className="model-page">
      <Navbar />
      <header className="model-header">
        <h1>{modelo.replace(/-/g, ' ').toUpperCase()}</h1>
        <p>Explora nuestros {modelo.replace(/-/g, ' ')}</p>
      </header>
      <section className="product-list">
        {loading && <p>Cargando productos…</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && productos.length === 0 && (
          <p>No hay productos disponibles en este modelo.</p>
        )}
        {!loading && !error && productos.map(p => (
          <div className="product-card" key={p.id}>
            <img
              src={`http://localhost:4000${p.imagen_url}`}
              alt={p.nombre}
              className="product-image"
            />
            <h3>{p.nombre}</h3>
            <p>${parseFloat(p.precio_unitario).toLocaleString('es-MX')}</p>
            <div className="product-options">
              <label>Cantidad:</label>
              <input
                type="number"
                min="1"
                value={quantities[p.id] || 1}
                onChange={e => handleQty(p.id, parseInt(e.target.value, 10))}
              />
              <button
                className="btn primary"
                onClick={() => addToCart(p)}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
