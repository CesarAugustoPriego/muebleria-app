// frontend/src/pages/MisComprasPage.jsx

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Auth/Navbar';
import './MisComprasPage.css';

const BASE_URL = 'http://localhost:4000';

export default function MisComprasPage() {
  const [ventas, setVentas]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const token = localStorage.getItem('token');
  const API   = `${BASE_URL}/api`;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/ventas`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Error al cargar tus compras');
        const data = await res.json();
        const arr = Array.isArray(data)
          ? data
          : Array.isArray(data.ventas)
            ? data.ventas
            : [];
        setVentas(arr);
      } catch (e) {
        console.error('Fetch ventas error:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  if (loading) return (
    <>
      <Navbar />
      <p className="loading">Cargando mis compras…</p>
    </>
  );
  if (error) return (
    <>
      <Navbar />
      <p className="error">❌ {error}</p>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="mis-compras-container">
        <h2>📦 Mis Compras</h2>

        {ventas.length === 0 ? (
          <p>No tienes compras registradas.</p>
        ) : (
          ventas.map(compra => (
            <div key={compra.id} className="compra-card">
              <h3>
                Compra #{compra.id} – {new Date(compra.fecha).toLocaleDateString()}
              </h3>
              <p><strong>Estado del Pedido:</strong> {compra.estado}</p>

              <div className="productos">
                {(compra.detallesVenta || []).map(det => {
                  const prod = det.producto;
                  const mod  = prod.modelo;
                  const cat  = mod.categoria;

                  // URL final de la imagen, sin duplicar "/uploads"
                  const imgUrl = prod.imagen_url.startsWith('/')
                    ? `${BASE_URL}${prod.imagen_url}`
                    : `${BASE_URL}/uploads/${prod.imagen_url}`;

                  return (
                    <div key={det.id} className="producto">
                      <img
                        src={imgUrl}
                        alt={prod.nombre}
                      />
                      <div className="producto-info">
                        <p><strong>Categoría:</strong> {cat.nombre}</p>
                        <p><strong>Modelo:</strong> {mod.modelo}</p>
                        <p><strong>Cantidad:</strong> {det.cantidad}</p>
                        <p><strong>Precio unitario:</strong> ${parseFloat(det.precio_unitario).toFixed(2)}</p>
                        <p><strong>Subtotal:</strong> ${parseFloat(det.precio_total).toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="total">
                Total: ${parseFloat(compra.total).toFixed(2)} MXN
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
