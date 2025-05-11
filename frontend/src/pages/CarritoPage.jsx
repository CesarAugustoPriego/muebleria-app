// src/pages/CarritoPage.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Auth/Navbar';
import './CarritoPage.css';

export default function CarritoPage() {
  const token = localStorage.getItem('token');
  const API   = 'http://localhost:4000/api';

  // — Carrito
  const [carrito, setCarrito] = useState(null);

  // — Direcciones
  const [direcciones, setDirecciones]         = useState([]);
  const [selectedDireccionId, setSelectedDireccionId] = useState(null);
  const [nuevaDireccion, setNuevaDireccion]   = useState(false);
  const [direccion, setDireccion]             = useState({
    nombre: '', calle: '', ciudad: '', estado: '', cp: '', telefono: '', referencia: ''
  });
  const [mensajeDireccion, setMensajeDireccion] = useState('');

  // — Métodos de pago
  const [metodos, setMetodos]                  = useState([]);
  const [selectedMetodoId, setSelectedMetodoId] = useState(null);
  const [nuevoMetodo, setNuevoMetodo]          = useState(false);
  const [tipoNuevoMetodo, setTipoNuevoMetodo]  = useState('tarjeta');
  const [detallesPago, setDetallesPago]        = useState({
    numero: '', expiracion: '', cvv: '', email: ''
  });
  const [mensajePago, setMensajePago]          = useState('');

  // — Checkout final
  const [mensajeFinal, setMensajeFinal]        = useState('');

  useEffect(() => {
    // 1) cargar carrito
    fetch(`${API}/carrito`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json()).then(setCarrito)
      .catch(console.error);

    // 2) cargar direcciones
    fetch(`${API}/direcciones`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(dirs => {
        setDirecciones(dirs || []);
        if (dirs.length) {
          const d = dirs[0];
          setSelectedDireccionId(d.id);
          setDireccion({
            nombre:    d.nombre_recibe,
            calle:     d.calle,
            ciudad:    d.ciudad,
            estado:    d.estado,
            cp:        d.cp,
            telefono:  d.telefono,
            referencia:d.referencia || ''
          });
        } else {
          setNuevaDireccion(true);
        }
      })
      .catch(console.error);

    // 3) cargar métodos de pago
    fetch(`${API}/metodos`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(mps => {
        setMetodos(mps || []);
        if (mps.length) {
          const m = mps[0];
          setSelectedMetodoId(m.id);
        } else {
          setNuevoMetodo(true);
        }
      })
      .catch(console.error);
  }, []);

  if (!carrito) return <p>Cargando carrito…</p>;

  // — total
  const total = carrito.detalles.reduce(
    (sum, d) => sum + d.producto.precio_unitario * d.cantidad, 0
  );

  // — Helpers carrito
  const recargarCarrito = () =>
    fetch(`${API}/carrito`, { headers:{ Authorization:`Bearer ${token}` }})
      .then(r=>r.json()).then(setCarrito).catch(console.error);

  const cambiarCantidad = (id, qty) => {
    fetch(`${API}/carrito/detalle/${id}`, {
      method: 'PUT',
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
      },
      body: JSON.stringify({ cantidad: qty })
    })
      .then(recargarCarrito)
      .catch(console.error);
  };
  const eliminarItem = id => cambiarCantidad(id, 0);

  // — guardar dirección
  const guardarDireccion = async () => {
    // validación
    const { nombre, calle, ciudad, cp } = direccion;
    if (!nombre||!calle||!ciudad||!cp) {
      return alert('Completa nombre, calle, ciudad y código postal.');
    }
    try {
      const res = await fetch(`${API}/direcciones`, {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({
          nombre_recibe: direccion.nombre,
          calle:         direccion.calle,
          ciudad:        direccion.ciudad,
          estado:        direccion.estado,
          cp:            direccion.cp,
          telefono:      direccion.telefono,
          referencia:    direccion.referencia
        })
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.msg || 'Error guardando dirección');
      // actualizar lista
      const dirs = await fetch(`${API}/direcciones`, {
        headers:{ Authorization:`Bearer ${token}` }
      }).then(r=>r.json());
      setDirecciones(dirs);
      setSelectedDireccionId(body.id);
      setNuevaDireccion(false);
      setMensajeDireccion('📦 Dirección guardada correctamente.');
    } catch (e) {
      alert('❌ ' + e.message);
    }
  };

  // — guardar / actualizar método
  const guardarMetodoPago = async () => {
    // validaciones
    if (nuevoMetodo) {
      if (tipoNuevoMetodo === 'tarjeta') {
        const { numero, expiracion, cvv } = detallesPago;
        if (!numero||!expiracion||!cvv) {
          return alert('Completa los datos de la tarjeta.');
        }
      }
      if (tipoNuevoMetodo === 'transferencia' && !detallesPago.email) {
        return alert('Introduce tu correo de PayPal.');
      }
    } else if (!selectedMetodoId) {
      return alert('Selecciona o crea un método de pago.');
    }

    try {
      let url    = `${API}/metodos`;
      let method = 'POST';
      let payload = { tipo: tipoNuevoMetodo };

      if (nuevoMetodo) {
        if (tipoNuevoMetodo === 'tarjeta') {
          payload.token_last4 = detallesPago.numero.slice(-4);
          payload.titular     = detallesPago.numero;
        } else if (tipoNuevoMetodo === 'transferencia') {
          payload.titular     = detallesPago.email;
        }
      } else {
        // actualizar
        url    = `${API}/metodos/${selectedMetodoId}`;
        method = 'PUT';
        const m = metodos.find(x => x.id === selectedMetodoId);
        payload.tipo = m.tipo;
        if (m.tipo === 'transferencia') payload.titular = m.titular;
      }

      const res = await fetch(url, {
        method,
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.msg || 'Error guardando método');
      // refrescar lista
      const mps = await fetch(`${API}/metodos`, {
        headers:{ Authorization:`Bearer ${token}` }
      }).then(r=>r.json());
      setMetodos(mps);
      setSelectedMetodoId(body.id);
      setNuevoMetodo(false);
      setMensajePago('💳 Método guardado correctamente.');
    } catch (e) {
      alert('❌ ' + e.message);
    }
  };

  // — borrar método
  const borrarMetodo = async () => {
    if (!selectedMetodoId) return;
    try {
      const res = await fetch(`${API}/metodos/${selectedMetodoId}`, {
        method: 'DELETE',
        headers:{ Authorization:`Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Error borrando método');
      const remaining = metodos.filter(m => m.id !== selectedMetodoId);
      setMetodos(remaining);
      setSelectedMetodoId(null);
      setNuevoMetodo(true);
      setMensajePago('');
    } catch (e) {
      alert('❌ ' + e.message);
    }
  };

  // — checkout
  const handleCheckout = async () => {
    if (!selectedDireccionId) return alert('Guarda tu dirección primero.');
    if (!selectedMetodoId)   return alert('Guarda tu método de pago primero.');

    try {
      const res = await fetch(`${API}/carrito/checkout`, {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({
          direccionId: selectedDireccionId,
          metodoId:    selectedMetodoId
        })
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.msg || 'Error en checkout');
      setMensajeFinal('✅ Tu compra se ha procesado correctamente.');
      // recargar carrito cerrado
      setCarrito({ ...carrito, detalles: [] });
    } catch (e) {
      alert('❌ ' + e.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="carrito-container">
        <h2>🛒 Tu Carrito</h2>
        {carrito.detalles.length === 0
          ? <p>Tu carrito está vacío.</p>
          : (
          <>
            {/* Items */}
            <div className="carrito-items">
              {carrito.detalles.map(d => (
                <div key={d.id} className="carrito-item">
                  <img
                    src={`http://localhost:4000${d.producto.imagen_url}`}
                    alt={d.producto.nombre}
                  />
                  <div className="item-info">
                    <h4>{d.producto.nombre}</h4>
                    <p>${d.producto.precio_unitario.toLocaleString()} MXN</p>
                    <div className="cantidad-control">
                      <label>Cantidad:</label>
                      <input
                        type="number"
                        min="1"
                        value={d.cantidad}
                        onChange={e=>cambiarCantidad(d.id,+e.target.value||1)}
                      />
                    </div>
                    <button className="eliminar" onClick={()=>eliminarItem(d.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Dirección */}
            <div className="direccion-section">
              <h3>📦 Dirección de envío</h3>
              {!nuevaDireccion && (
                <>
                  <select
                    value={selectedDireccionId||''}
                    onChange={e=>{
                      if(e.target.value==='nueva'){
                        setNuevaDireccion(true);
                        setSelectedDireccionId(null);
                      } else {
                        const id = parseInt(e.target.value,10);
                        const d  = direcciones.find(x=>x.id===id);
                        setSelectedDireccionId(id);
                        setDireccion({
                          nombre:    d.nombre_recibe,
                          calle:     d.calle,
                          ciudad:    d.ciudad,
                          estado:    d.estado,
                          cp:        d.cp,
                          telefono:  d.telefono,
                          referencia:d.referencia||''
                        });
                      }
                    }}
                  >
                    <option value="">Selecciona una dirección</option>
                    {direcciones.map(d=>(
                      <option key={d.id} value={d.id}>
                        {d.calle}, {d.ciudad}
                      </option>
                    ))}
                    <option value="nueva">+ Agregar nueva</option>
                  </select>
                </>
              )}
              {nuevaDireccion && (
                <>
                  <input
                    type="text" placeholder="Nombre completo"
                    value={direccion.nombre}
                    onChange={e=>setDireccion({...direccion,nombre:e.target.value})}
                  />
                  <input
                    type="text" placeholder="Calle"
                    value={direccion.calle}
                    onChange={e=>setDireccion({...direccion,calle:e.target.value})}
                  />
                  <input
                    type="text" placeholder="Ciudad"
                    value={direccion.ciudad}
                    onChange={e=>setDireccion({...direccion,ciudad:e.target.value})}
                  />
                  <input
                    type="text" placeholder="Estado"
                    value={direccion.estado}
                    onChange={e=>setDireccion({...direccion,estado:e.target.value})}
                  />
                  <input
                    type="text" placeholder="Código postal"
                    value={direccion.cp}
                    onChange={e=>setDireccion({...direccion,cp:e.target.value})}
                  />
                  <input
                    type="tel" placeholder="Teléfono"
                    value={direccion.telefono}
                    onChange={e=>setDireccion({...direccion,telefono:e.target.value})}
                  />
                  <input
                    type="text" placeholder="Referencia (opcional)"
                    value={direccion.referencia}
                    onChange={e=>setDireccion({...direccion,referencia:e.target.value})}
                  />
                </>
              )}
              <button className="guardar-btn" onClick={guardarDireccion}>
                {nuevaDireccion ? 'Guardar dirección nueva' : 'Actualizar dirección'}
              </button>
              {mensajeDireccion && <p className="mensaje-confirmacion">{mensajeDireccion}</p>}
            </div>

            {/* Método de pago */}
            <div className="metodo-pago-section">
              <h3>💳 Método de pago</h3>
              {!nuevoMetodo && (
                <>
                  <select
                    value={selectedMetodoId||''}
                    onChange={e=>{
                      if(e.target.value==='nuevo'){
                        setNuevoMetodo(true);
                        setSelectedMetodoId(null);
                      } else {
                        setSelectedMetodoId(parseInt(e.target.value,10));
                      }
                    }}
                  >
                    <option value="">Selecciona un método</option>
                    {metodos.map(m=>(
                      <option key={m.id} value={m.id}>
                        {m.tipo==='tarjeta'
                          ? `Tarjeta ••••${m.token_last4}`
                          : m.tipo==='transferencia'
                            ? `PayPal (${m.titular})`
                            : 'Efectivo (al recibir)'}
                      </option>
                    ))}
                    <option value="nuevo">+ Agregar nuevo</option>
                  </select>
                  {selectedMetodoId && (
                    <button className="eliminar" onClick={borrarMetodo}>
                      Eliminar este método
                    </button>
                  )}
                </>
              )}
              {nuevoMetodo && (
                <>
                  <select
                    value={tipoNuevoMetodo}
                    onChange={e=>setTipoNuevoMetodo(e.target.value)}
                  >
                    <option value="tarjeta">Tarjeta</option>
                    <option value="transferencia">PayPal</option>
                    <option value="efectivo">Efectivo (al recibir)</option>
                  </select>
                  {tipoNuevoMetodo==='tarjeta' && (
                    <>
                      <input
                        type="text" placeholder="Número de tarjeta"
                        value={detallesPago.numero}
                        onChange={e=>setDetallesPago({...detallesPago,numero:e.target.value})}
                      />
                      <input
                        type="text" placeholder="MM/AA"
                        value={detallesPago.expiracion}
                        onChange={e=>setDetallesPago({...detallesPago,expiracion:e.target.value})}
                      />
                      <input
                        type="text" placeholder="CVV"
                        value={detallesPago.cvv}
                        onChange={e=>setDetallesPago({...detallesPago,cvv:e.target.value})}
                      />
                    </>
                  )}
                  {tipoNuevoMetodo==='transferencia' && (
                    <input
                      type="email" placeholder="Correo PayPal"
                      value={detallesPago.email}
                      onChange={e=>setDetallesPago({...detallesPago,email:e.target.value})}
                    />
                  )}
                  {tipoNuevoMetodo==='efectivo' && (
                    <p>Pagarás al recibir.</p>
                  )}
                  <button className="guardar-btn" onClick={guardarMetodoPago}>
                    Guardar método nuevo
                  </button>
                </>
              )}
              {mensajePago && <p className="mensaje-confirmacion">{mensajePago}</p>}
            </div>

            {/* Checkout */}
            <div className="resumen-carrito">
              <h3>Total: ${total.toLocaleString()} MXN</h3>
              <button className="pago-btn" onClick={handleCheckout}>
                Proceder al pago
              </button>
              {mensajeFinal && <p className="mensaje-confirmacion">{mensajeFinal}</p>}
            </div>
          </>
        )}
      </div>
    </>
  );
}
