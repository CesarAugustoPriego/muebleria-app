import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Auth/Navbar';
import './ModelPage.css';

const ModelPage = () => {
  const { categoria, modelo } = useParams();
  const [productos, setProductos] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapea el slug de modelo a su ID en BD. Idealmente podrías obtener esto dinámico.
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
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/productos/modelo/${modeloId}`);
        if (!res.ok) throw new Error('No se pudieron cargar los productos');
        const data = await res.json();
        setProductos(data);
        // Inicializa cantidades a 1
        const initialQty = data.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {});
        setQuantities(initialQty);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (modeloId) fetchProductos();
    else setError('Modelo desconocido');
  }, [modeloId]);

  const handleQty = (id, val) => {
    setQuantities(q => ({ ...q, [id]: val }));
  };

  const addToCart = producto => {
    // Aquí llamas a tu contexto o API de carrito
    console.log('Agregar al carrito:', producto, 'Cantidad:', quantities[producto.id]);
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
              src={p.imagen_url}
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
