// src/pages/MisComprasPage.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Auth/Navbar';
import './MisComprasPage.css';

export default function MisComprasPage() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const API   = 'http://localhost:4000/api';

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const res = await fetch(`${API}/ventas`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Error al cargar tus compras');
        const data = await res.json();
        setVentas(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchVentas();
  }, [token]);

  if (loading) return <p>Cargando mis compras…</p>;

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
                Compra #{compra.id} –{' '}
                {new Date(compra.fecha).toLocaleDateString()}
              </h3>
              <p>
                <strong>Estado del Pedido:</strong> {compra.estado}
              </p>
              <div className="productos">
                {compra.detalles.map(det => (
                  <div key={det.id} className="producto">
                    <img
                      src={`http://localhost:4000${det.producto.imagen_url}`}
                      alt={det.producto.nombre}
                    />
                    <div className="producto-info">
                      <h4>{det.producto.nombre}</h4>
                      <p>
                        {det.cantidad} × ${det.precio_total.toLocaleString()} MXN
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="total">
                Total: ${compra.total.toLocaleString()} MXN
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
