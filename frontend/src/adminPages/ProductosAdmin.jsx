// frontend/src/adminPages/ProductosAdmin.jsx
import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Auth/Navbar';
import { AuthContext } from '../contexts/AuthContext';
import './ProductosAdmin.css';

const ProductosAdmin = () => {
  const { token } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);

  // Carga la lista de productos
  const fetchProductos = async () => {
    try {
      const res = await fetch('/api/producto');
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      console.error(err);
      alert('❌ No se pudieron cargar los productos');
    }
  };

  // Elimina un producto enviando el token
  const eliminarProducto = async id => {
    const confirmar = window.confirm('¿Eliminar este producto?');
    if (!confirmar) return;

    try {
      const res = await fetch(`/api/producto/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.msg || `Error ${res.status}`);
      }
      alert('✅ Producto eliminado correctamente');
      fetchProductos();
    } catch (err) {
      console.error(err);
      alert('❌ Error al eliminar el producto: ' + err.message);
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
                  <button
                    className="eliminar-btn"
                    onClick={() => eliminarProducto(p.id)}
                  >
                    🗑 Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  No hay productos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductosAdmin;
