import React, { useEffect, useState } from 'react';
import Navbar from '../components/Auth/Navbar';
import './CarritoPage.css';

export default function CarritoPage() {
  const token = localStorage.getItem('token');
  const API   = 'http://localhost:4000/api';

  // — Carrito
  const [carrito, setCarrito] = useState(null);

  // — Direcciones
  const [direcciones, setDirecciones]           = useState([]);
  const [selectedDireccionId, setSelectedDireccionId] = useState(null);
  const [nuevaDireccion, setNuevaDireccion]     = useState(false);
  const [direccion, setDireccion]               = useState({
    nombre: '', calle: '', ciudad: '', estado: '', cp: '', telefono: '', referencia: ''
  });
  const [mensajeDireccion, setMensajeDireccion] = useState('');

  // — Métodos de pago
  const [metodos, setMetodos]                    = useState([]);
  const [selectedMetodoId, setSelectedMetodoId]  = useState(null);
  const [nuevoMetodo, setNuevoMetodo]            = useState(false);
  const [tipoNuevoMetodo, setTipoNuevoMetodo]    = useState('tarjeta');
  const [detallesPago, setDetallesPago]          = useState({
    numero: '', expiracion: '', cvv: '', email: ''
  });
  const [mensajePago, setMensajePago]            = useState('');

  // — Checkout final
  const [mensajeFinal, setMensajeFinal]          = useState('');

  useEffect(() => {
    // 1) cargar carrito
    fetch(`${API}/carrito`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setCarrito).catch(console.error);

    // 2) cargar direcciones
    fetch(`${API}/direcciones`, { headers: { Authorization: `Bearer ${token}` } })
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
    fetch(`${API}/metodos`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(mps => {
        setMetodos(mps || []);
        if (mps.length) {
          setSelectedMetodoId(mps[0].id);
        } else {
          setNuevoMetodo(true);
        }
      })
      .catch(console.error);
  }, [API, token]);

  if (!carrito) return <p className="loading">Cargando carrito…</p>;

  const total = carrito.detalles.reduce(
    (sum, d) => sum + d.producto.precio_unitario * d.cantidad, 0
  );

  const recargarCarrito = () =>
    fetch(`${API}/carrito`, { headers:{ Authorization:`Bearer ${token}` }})
      .then(r=>r.json()).then(setCarrito).catch(console.error);

  const cambiarCantidad = (id, qty) => {
    fetch(`${API}/carrito/detalle/${id}`, {
      method: 'PUT',
      headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
      body: JSON.stringify({ cantidad: qty })
    })
    .then(recargarCarrito)
    .catch(console.error);
  };
  const eliminarItem = id => cambiarCantidad(id, 0);

  const guardarDireccion = async () => {
    const { nombre, calle, ciudad, cp } = direccion;
    if (!nombre||!calle||!ciudad||!cp) {
      return alert('Completa todos los campos obligatorios.');
    }
    try {
      const res = await fetch(`${API}/direcciones`, {
        method: 'POST',
        headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
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
      if (!res.ok) throw new Error(body.msg);
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

  const guardarMetodoPago = async () => {
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
        url    = `${API}/metodos/${selectedMetodoId}`;
        method = 'PUT';
        const m = metodos.find(x => x.id === selectedMetodoId);
        payload.tipo = m.tipo;
        if (m.tipo === 'transferencia') payload.titular = m.titular;
      }

      const res  = await fetch(url, {
        method,
        headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.msg);
      const mps  = await fetch(`${API}/metodos`, {
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

  // Reemplaza tu antigua borrarMetodo por esto:

  const borrarMetodo = async () => {
    if (!selectedMetodoId) return;
    try {
      const res  = await fetch(`${API}/metodos/${selectedMetodoId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const body = await res.json();

      if (!res.ok) {
        // Si viene 400 con msg del backend, lo mostramos
        return alert(body.msg || 'No se pudo eliminar el método');
      }

      // Éxito: actualizamos el listado en pantalla
      setMetodos(metodos.filter(m => m.id !== selectedMetodoId));
      setSelectedMetodoId(null);
      setNuevoMetodo(true);
      setMensajePago('');
    } catch (e) {
      console.error(e);
      alert('Error de red al intentar borrar el método');
    }
  };


  const handleCheckout = async () => {
    if (!selectedDireccionId) return alert('Guarda tu dirección primero.');
    if (!selectedMetodoId)   return alert('Guarda tu método de pago primero.');

    try {
      const res  = await fetch(`${API}/carrito/checkout`, {
        method: 'POST',
        headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
        body: JSON.stringify({
          direccionId: selectedDireccionId,
          metodoId:    selectedMetodoId
        })
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.msg);
      setMensajeFinal('✅ Compra procesada con éxito.');
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
        {carrito.detalles.length === 0 ? (
          <p className="empty">Tu carrito está vacío.</p>
        ) : (
          <>
            {/* Ítems */}
            <div className="carrito-items">
              {carrito.detalles.map(d => (
                <div key={d.id} className="carrito-item-card">
                  <div className="item-image">
                    <img
                      src={`http://localhost:4000${d.producto.imagen_url}`}
                      alt={d.producto.nombre}
                    />
                  </div>
                  <div className="item-details">
                    <h4>{d.producto.nombre}</h4>
                    <p className="price">
                      ${d.producto.precio_unitario.toLocaleString()} MXN
                    </p>
                    <div className="cantidad-eliminar">
                      <label htmlFor={`qty-${d.id}`}>Cantidad:</label>
                      <input
                        id={`qty-${d.id}`}
                        type="number"
                        min="1"
                        value={d.cantidad}
                        onChange={e => cambiarCantidad(d.id, +e.target.value || 1)}
                      />
                      <button className="btn-eliminar" onClick={() => eliminarItem(d.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dirección */}
            <section className="direccion-section">
              <h3>📦 Dirección de envío</h3>
              { !nuevaDireccion && (
                <select
                  className="direccion-select"
                  value={selectedDireccionId || ''}
                  onChange={e => {
                    if (e.target.value === 'nueva') {
                      setNuevaDireccion(true);
                      setSelectedDireccionId(null);
                    } else {
                      const id = Number(e.target.value);
                      const d  = direcciones.find(x => x.id === id);
                      setSelectedDireccionId(id);
                      setDireccion({
                        nombre:    d.nombre_recibe,
                        calle:     d.calle,
                        ciudad:    d.ciudad,
                        estado:    d.estado,
                        cp:        d.cp,
                        telefono:  d.telefono,
                        referencia:d.referencia || ''
                      });
                    }
                  }}
                >
                  <option value="">Selecciona una dirección</option>
                  {direcciones.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.calle}, {d.ciudad}
                    </option>
                  ))}
                  <option value="nueva">+ Agregar nueva</option>
                </select>
              )}
              { nuevaDireccion && (
                <div className="direccion-form-grid">
                  {['nombre','calle','ciudad','estado','cp','telefono','referencia'].map(field => (
                    <input
                      key={field}
                      type="text"
                      placeholder={field === 'referencia' ? 'Referencia (opc.)' : field.charAt(0).toUpperCase() + field.slice(1)}
                      value={direccion[field]}
                      onChange={e => setDireccion(d => ({ ...d, [field]: e.target.value }))}
                    />
                  ))}
                </div>
              )}
              <button className="guardar-btn" onClick={guardarDireccion}>
                {nuevaDireccion ? 'Guardar nueva' : 'Actualizar dirección'}
              </button>
              {mensajeDireccion && <p className="mensaje-confirmacion">{mensajeDireccion}</p>}
            </section>

            {/* Método de pago */}
            <section className="metodo-pago-section">
              <h3>💳 Método de pago</h3>
              {!nuevoMetodo ? (
                <>
                  <select
                    className="metodo-select"
                    value={selectedMetodoId||''}
                    onChange={e => {
                      if (e.target.value==='nuevo') {
                        setNuevoMetodo(true);
                        setSelectedMetodoId(null);
                      } else {
                        setSelectedMetodoId(+e.target.value);
                      }
                    }}
                  >
                    <option value="">Selecciona un método</option>
                    {metodos.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.tipo === 'tarjeta'
                          ? `Tarjeta ••••${m.token_last4}`
                          : m.tipo === 'transferencia'
                            ? `PayPal (${m.titular})`
                            : 'Efectivo'}
                      </option>
                    ))}
                    <option value="nuevo">+ Agregar nuevo</option>
                  </select>
                  {selectedMetodoId && (
                    <button className="btn-eliminar" onClick={borrarMetodo}>
                      Eliminar método
                    </button>
                  )}
                </>
              ) : (
                <div className="metodo-form-grid">
                  <select
                    className="metodo-select"
                    value={tipoNuevoMetodo}
                    onChange={e=>setTipoNuevoMetodo(e.target.value)}
                  >
                    <option value="tarjeta">Tarjeta</option>
                    <option value="transferencia">PayPal</option>
                    <option value="efectivo">Efectivo</option>
                  </select>
                  {tipoNuevoMetodo==='tarjeta' && (
                    <>
                      <input
                        type="text" placeholder="Número de tarjeta"
                        value={detallesPago.numero}
                        onChange={e=>setDetallesPago(d=>({...d, numero:e.target.value}))}
                      />
                      <input
                        type="text" placeholder="MM/AA"
                        value={detallesPago.expiracion}
                        onChange={e=>setDetallesPago(d=>({...d, expiracion:e.target.value}))}
                      />
                      <input
                        type="text" placeholder="CVV"
                        value={detallesPago.cvv}
                        onChange={e=>setDetallesPago(d=>({...d, cvv:e.target.value}))}
                      />
                    </>
                  )}
                  {tipoNuevoMetodo==='transferencia' && (
                    <input
                      type="email" placeholder="Correo PayPal"
                      value={detallesPago.email}
                      onChange={e=>setDetallesPago(d=>({...d, email:e.target.value}))}
                    />
                  )}
                  <button className="guardar-btn" onClick={guardarMetodoPago}>
                    Guardar método
                  </button>
                </div>
              )}
              {mensajePago && <p className="mensaje-confirmacion">{mensajePago}</p>}
            </section>

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
