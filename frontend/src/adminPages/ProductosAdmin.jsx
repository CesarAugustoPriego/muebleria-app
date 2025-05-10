import React, { useEffect, useState } from 'react';
import Navbar from '../components/Auth/Navbar';
import './ProductosAdmin.css';

const ProductosAdmin = () => {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    const res = await fetch('/api/productos');
    const data = await res.json();
    setProductos(data);
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm('¿Eliminar este producto?');
    if (!confirmar) return;

    const res = await fetch(`/api/productos/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      alert('✅ Producto eliminado correctamente');
      fetchProductos();
    } else {
      alert('❌ Error al eliminar el producto');
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="productos-admin">
      <Navbar />
      <div className="container">
        <h2>Gestión de Productos</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>
                  <img
                    src={`http://localhost:4000${p.imagen_url}`}
                    alt={p.nombre}
                    width="80"
                    style={{
                      borderRadius: '8px',
                      boxShadow: '0 0 4px rgba(0,0,0,0.2)',
                      objectFit: 'cover'
                    }}
                  />
                </td>
                <td>${parseFloat(p.precio_unitario).toFixed(2)}</td>
                <td>{p.existencia}</td>
                <td>
                  <button className="eliminar-btn" onClick={() => eliminarProducto(p.id)}>
                    🗑 Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductosAdmin;
