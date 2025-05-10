import React, { useEffect, useState } from 'react';
import './ListaProductos.css';
import Navbar from '../components/Auth/Navbar';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/productos')
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener productos:', err);
        setLoading(false);
      });
  }, []);

  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      const res = await fetch(`/api/productos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar');
      setProductos(productos.filter(p => p.id !== id));
    } catch (err) {
      console.error('❌ Error eliminando producto:', err);
      alert('No se pudo eliminar el producto.');
    }
  };

  return (
    <div className="lista-productos-page">
      <Navbar />
      <div className="productos-container">
        <h2>Productos en el Catálogo</h2>
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <div className="grid">
            {productos.map(prod => (
              <div className="producto-card" key={prod.id}>
                <img src={prod.imagen} alt={prod.nombre} />
                <h3>{prod.nombre}</h3>
                <p>{prod.descripcion}</p>
                <p><strong>Precio:</strong> ${prod.precio_unitario}</p>
                <p><strong>Stock:</strong> {prod.existencia}</p>
                <button onClick={() => eliminarProducto(prod.id)}>Eliminar</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaProductos;
