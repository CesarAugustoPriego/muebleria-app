import React, { useEffect, useState } from 'react';
import Navbar from '../components/Auth/Navbar';
import './MisComprasPage.css';

const BASE = 'http://localhost:4000';

export default function MisComprasPage() {
  const [ventas, setVentas]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    (async() => {
      try {
        const res = await fetch(`${BASE}/api/ventas`, {
          headers:{ Authorization:`Bearer ${token}` }
        });
        if (!res.ok) throw new Error('No se pudieron cargar tus compras');
        const data = await res.json();
        setVentas(Array.isArray(data)? data : data.ventas || []);
      } catch(e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  },[token]);

  if (loading) return <><Navbar/><p>Cargando…</p></>;
  if (error)   return <><Navbar/><p style={{color:'red'}}>❌ {error}</p></>;

  return (
    <>
      <Navbar/>
      <div className="mis-compras-container">
        <h2>📦 Mis Compras</h2>
        {ventas.length===0
          ? <p>No tienes compras.</p>
          : ventas.map(c => (
              <div key={c.id} className="compra-card">
                <h3>#{c.id} – {new Date(c.fecha).toLocaleDateString()}</h3>
                <p><strong>Estado:</strong> {c.estado}</p>
                <p><strong>Dirección:</strong>{' '}
                  {c.direccionDeVenta
                    ? `${c.direccionDeVenta.calle}, ${c.direccionDeVenta.ciudad} ${c.direccionDeVenta.cp}`
                    : 'Recoger en tienda'}
                </p>
                <p><strong>Pago:</strong> {c.metodoDeVenta?.tipo||'—'}</p>

                <div className="productos">
                  {c.detallesVenta.map(d => {
                    const img = d.producto.imagen_url.startsWith('/')
                      ? `${BASE}${d.producto.imagen_url}`
                      : `${BASE}/uploads/${d.producto.imagen_url}`;
                    return (
                      <div key={d.id} className="producto">
                        <img src={img} alt={d.producto.nombre}/>
                        <div className="producto-info">
                          <p><strong>Producto:</strong> {d.producto.nombre}</p>
                          <p><strong>Categoría:</strong> {d.producto.modelo.categoria.nombre}</p>
                          <p><strong>Modelo:</strong> {d.producto.modelo.modelo}</p>
                          <p><strong>Cantidad:</strong> {d.cantidad}</p>
                          <p><strong>Subtotal:</strong> ${parseFloat(d.precio_total).toFixed(2)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="total"><strong>Total:</strong> ${parseFloat(c.total).toFixed(2)} MXN</p>
              </div>
            ))
        }
      </div>
    </>
  );
}
