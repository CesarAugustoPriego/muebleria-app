import React, { useEffect, useState } from 'react';
import Navbar from '../components/Auth/Navbar';
import './MisComprasPage.css';

const BASE = 'http://localhost:4000';

export default function MisComprasPage() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

  const formatFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Mostrar estado con el color adecuado
  const EstadoBadge = ({ estado }) => {
    const getClaseEstado = () => {
      switch(estado.toLowerCase()) {
        case 'enviado': return 'estado-enviado';
        case 'pedido': return 'estado-pedido';
        case 'entregado': return 'estado-entregado';
        case 'cancelado': return 'estado-cancelado';
        default: return 'estado-default';
      }
    };
    
    return <span className={`estado-badge ${getClaseEstado()}`}>{estado}</span>;
  };

  if (loading) return (
    <>
      <Navbar/>
      <div className="mis-compras-container">
        <div className="loading">Cargando tus compras...</div>
      </div>
    </>
  );
  
  if (error) return (
    <>
      <Navbar/>
      <div className="mis-compras-container">
        <div className="error">❌ {error}</div>
      </div>
    </>
  );

  return (
    <>
      <Navbar/>
      <div className="mis-compras-container">
        <h2>📦 Mis Compras</h2>
        
        {ventas.length===0 ? (
          <div className="no-compras">
            <p>No tienes compras realizadas todavía.</p>
            <button className="btn-explorar" onClick={() => window.location.href = '/'}>
              Explorar productos
            </button>
          </div>
        ) : (
          ventas.map(c => (
            <div key={c.id} className="compra-card">
              <h3>
                <span>#{c.id} – {formatFecha(c.fecha)}</span>
                <EstadoBadge estado={c.estado} />
              </h3>
              
              <div className="seccion-info">
                <p>
                  <strong>Dirección:</strong>
                  <span className="direccion-entrega">
                    {c.direccionDeVenta
                      ? `${c.direccionDeVenta.calle}, ${c.direccionDeVenta.ciudad} ${c.direccionDeVenta.cp}`
                      : 'Recoger en tienda'}
                  </span>
                </p>
                <p>
                  <strong>Pago:</strong>
                  <span className="metodo-pago">{c.metodoDeVenta?.tipo || 'No especificado'}</span>
                </p>
              </div>

              <div className="productos">
                {c.detallesVenta.map(d => {
                  const img = d.producto.imagen_url.startsWith('/')
                    ? `${BASE}${d.producto.imagen_url}`
                    : `${BASE}/uploads/${d.producto.imagen_url}`;
                  return (
                    <div key={d.id} className="producto">
                      <img 
                        src={img} 
                        alt={d.producto.nombre}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder-product.png';
                        }}
                      />
                      <div className="producto-info">
                        <p>{d.producto.nombre}</p>
                        <p><strong>Categoría:</strong> {d.producto.modelo.categoria.nombre}</p>
                        <p><strong>Modelo:</strong> {d.producto.modelo.modelo}</p>
                        <p><strong>Cantidad:</strong> {d.cantidad}</p>
                        <p><strong>Subtotal:</strong> ${parseFloat(d.precio_total).toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="total">Total: ${parseFloat(c.total).toFixed(2)} MXN</div>
            </div>
          ))
        )}
      </div>
    </>
  );
}