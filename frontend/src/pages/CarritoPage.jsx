// src/pages/CarritoPage.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Auth/Navbar';
import './CarritoPage.css';

export default function CarritoPage() {
  const [carrito, setCarrito]               = useState(null);

  // — Direcciones
  const [direccion, setDireccion]           = useState({
    nombre: '', calle: '', ciudad: '', estado: '', cp: '', telefono: '', referencia: ''
  });
  const [direccionGuardada, setDireccionGuardada] = useState(false);
  const [mensajeDireccion, setMensajeDireccion]   = useState('');

  // — Métodos de pago
  const [metodos, setMetodos]               = useState([]);
  const [selectedMetodoId, setSelectedMetodoId] = useState(null);
  const [nuevoMetodo, setNuevoMetodo]       = useState(false);
  const [newTipo, setNewTipo]               = useState('tarjeta');
  const [detallesPago, setDetallesPago]     = useState({
    numero: '', expiracion: '', cvv: '', email: ''
  });
  const [pagoGuardado, setPagoGuardado]     = useState(false);
  const [mensajePago, setMensajePago]       = useState('');

  // — Checkout
  const [mensajeFinal, setMensajeFinal]     = useState('');

  const token = localStorage.getItem('token');
  const API   = 'http://localhost:4000/api';

  useEffect(() => {
    // 🚀 1) Cargar carrito
    fetch(`${API}/carrito`, { headers:{ Authorization:`Bearer ${token}` }})
      .then(r=>r.json()).then(setCarrito).catch(console.error);

    // 🚀 2) Cargar direcciones
    fetch(`${API}/direcciones`,{ headers:{ Authorization:`Bearer ${token}` }})
      .then(r=>r.json())
      .then(dirs => {
        if(dirs.length){
          const d=dirs[0];
          setDireccion({
            nombre:    d.nombre_recibe,
            calle:     d.calle,
            ciudad:    d.ciudad,
            estado:    d.estado,
            cp:        d.cp,
            telefono:  d.telefono,
            referencia:d.referencia||''
          });
          setDireccionGuardada(true);
          setMensajeDireccion('📦 Dirección cargada del servidor.');
        }
      })
      .catch(console.error);

    // 🚀 3) Cargar métodos de pago
    fetch(`${API}/metodos`,{ headers:{ Authorization:`Bearer ${token}` }})
      .then(r=>r.json())
      .then(mps => {
        setMetodos(mps||[]);
        if(mps.length){
          const m=mps[0];
          setSelectedMetodoId(m.id);
          setNuevoMetodo(false);
          // prefill solo para label en select
          if(m.tipo==='transferencia'){
            setDetallesPago({ numero:'', expiracion:'', cvv:'', email:m.titular });
          } else {
            setDetallesPago({ numero:'', expiracion:'', cvv:'', email:'' });
          }
          setPagoGuardado(true);
          setMensajePago('💳 Método de pago cargado del servidor.');
        } else {
          setNuevoMetodo(true);
        }
      })
      .catch(console.error);
  }, []);

  if(!carrito) return <p>Cargando carrito…</p>;

  // — Actualizar/eliminar ítem
  const cambiarCantidad = (id, qty) => {
    fetch(`${API}/carrito/detalle/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
      },
      body: JSON.stringify({ cantidad: qty })
    })
    .then(()=> fetch(`${API}/carrito`,{ headers:{ Authorization:`Bearer ${token}` }})
      .then(r=>r.json()).then(setCarrito))
    .catch(console.error);
  };
  const eliminarItem = id => cambiarCantidad(id,0);

  // — Total
  const total = carrito.detalles.reduce(
    (sum,d)=> sum + d.producto.precio_unitario * d.cantidad, 0
  );

  // — Guardar dirección
  const guardarDireccion = async () => {
    if(!direccion.nombre||!direccion.calle||!direccion.ciudad||!direccion.cp){
      return alert('Completa nombre, calle, ciudad y código postal.');
    }
    try {
      const res = await fetch(`${API}/direcciones`,{
        method:'POST',
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
      if(!res.ok) throw new Error(body.msg||'Error guardando dirección');
      setDireccionGuardada(true);
      setMensajeDireccion('📦 Dirección guardada en el servidor.');
    } catch(e){
      alert('❌ ' + e.message);
    }
  };

  // — Guardar método de pago
  const guardarMetodoPago = async () => {
    // Validaciones
    if(nuevoMetodo){
      if(newTipo==='tarjeta'){
        const { numero, expiracion, cvv } = detallesPago;
        if(!numero||!expiracion||!cvv){
          return alert('Completa todos los datos de la tarjeta.');
        }
      }
      if(newTipo==='transferencia' && !detallesPago.email){
        return alert('Introduce tu correo de PayPal.');
      }
    } else if(!selectedMetodoId){
      return alert('Selecciona o crea un método de pago.');
    }

    try {
      let método = null;
      const url = nuevoMetodo
        ? `${API}/metodos`
        : `${API}/metodos/${selectedMetodoId}`;

      const opts = {
        method: nuevoMetodo ? 'POST' : 'PUT',
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${token}`
        },
        body: ''
      };

      if(nuevoMetodo){
        // crear
        const payload = { tipo: newTipo };
        if(newTipo==='tarjeta'){
          payload.token_last4 = detallesPago.numero.slice(-4);
          payload.titular     = detallesPago.numero;
        } else if(newTipo==='transferencia'){
          payload.titular     = detallesPago.email;
        }
        opts.body = JSON.stringify(payload);
      } else {
        // actualizar existente: (solo tipo y titular)
        const existing = metodos.find(m=>m.id===selectedMetodoId);
        const payload = { tipo: existing.tipo };
        if(existing.tipo==='transferencia'){
          payload.titular = existing.titular;
        }
        opts.body = JSON.stringify(payload);
      }

      const res = await fetch(url, opts);
      const body = await res.json();
      if(!res.ok) throw new Error(body.msg||'Error guardando método');

      // refrescar lista
      const refreshed = await fetch(`${API}/metodos`,{ headers:{ Authorization:`Bearer ${token}` }})
        .then(r=>r.json());
      setMetodos(refreshed);
      setSelectedMetodoId(body.id);
      setNuevoMetodo(false);
      setPagoGuardado(true);
      setMensajePago('💳 Método de pago guardado en el servidor.');
    } catch(e){
      alert('❌ '+e.message);
    }
  };

  // — Borrar método
  const borrarMetodo = async () => {
    if(!selectedMetodoId) return;
    try {
      const res = await fetch(`${API}/metodos/${selectedMetodoId}`,{
        method:'DELETE',
        headers:{ Authorization:`Bearer ${token}` }
      });
      if(!res.ok) throw new Error('Error borrando método');
      const remaining = metodos.filter(m=>m.id!==selectedMetodoId);
      setMetodos(remaining);
      setSelectedMetodoId(null);
      setNuevoMetodo(true);
      setPagoGuardado(false);
      setMensajePago('');
    } catch(e){
      alert('❌ '+e.message);
    }
  };

  // — Checkout
  const handleCheckout = async () => {
    if(!direccionGuardada||!pagoGuardado){
      return alert('Guarda dirección y método de pago antes de continuar.');
    }
    try {
      const res = await fetch(`${API}/carrito/checkout`,{
        method:'POST',
        headers:{ Authorization:`Bearer ${token}` }
      });
      if(!res.ok) throw new Error('Error en checkout');
      setMensajeFinal('✅ Tu compra se ha procesado correctamente.');
    } catch(e){
      alert('❌ '+e.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="carrito-container">
        <h2>🛒 Tu Carrito</h2>

        {carrito.detalles.length===0
          ? <p>Tu carrito está vacío.</p>
          : <>
              {/* — Items — */}
              <div className="carrito-items">
                {carrito.detalles.map(d=>(
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

              {/* — Dirección — */}
              <div className="direccion-section">
                <h3>📦 Dirección de envío</h3>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={direccion.nombre}
                  onChange={e=>setDireccion({...direccion,nombre:e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Calle"
                  value={direccion.calle}
                  onChange={e=>setDireccion({...direccion,calle:e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Ciudad"
                  value={direccion.ciudad}
                  onChange={e=>setDireccion({...direccion,ciudad:e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Estado"
                  value={direccion.estado}
                  onChange={e=>setDireccion({...direccion,estado:e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Código postal"
                  value={direccion.cp}
                  onChange={e=>setDireccion({...direccion,cp:e.target.value})}
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={direccion.telefono}
                  onChange={e=>setDireccion({...direccion,telefono:e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Referencia (opcional)"
                  value={direccion.referencia}
                  onChange={e=>setDireccion({...direccion,referencia:e.target.value})}
                />
                <button className="guardar-btn" onClick={guardarDireccion}>
                  Guardar dirección
                </button>
                {mensajeDireccion && <p className="mensaje-confirmacion">{mensajeDireccion}</p>}
              </div>

              {/* — Método de pago — */}
              <div className="metodo-pago-section">
                <h3>💳 Método de pago</h3>
                {!nuevoMetodo && (
                  <>
                    <select
                      value={ selectedMetodoId ?? '' }
                      onChange={e=>{
                        const v=e.target.value;
                        if(v==='nuevo'){
                          setNuevoMetodo(true);
                          setSelectedMetodoId(null);
                          setPagoGuardado(false);
                          setMensajePago('');
                        } else {
                          const id=parseInt(v,10);
                          const m=metodos.find(x=>x.id===id);
                          setSelectedMetodoId(id);
                          setNuevoMetodo(false);
                          setPagoGuardado(true);
                          setMensajePago('💳 Método de pago cargado del servidor.');
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
                              : 'Efectivo (Pago al recibir)'
                          }
                        </option>
                      ))}
                      <option value="nuevo">+ Agregar nuevo método</option>
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
                      value={newTipo}
                      onChange={e=>setNewTipo(e.target.value)}
                    >
                      <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                      <option value="transferencia">PayPal</option>
                      <option value="efectivo">Efectivo (Pago al recibir)</option>
                    </select>

                    {newTipo==='tarjeta' && (
                      <>
                        <input
                          type="text"
                          placeholder="Número de tarjeta (16 dígitos)"
                          value={detallesPago.numero}
                          onChange={e=>setDetallesPago({...detallesPago,numero:e.target.value})}
                        />
                        <input
                          type="text"
                          placeholder="MM/AA"
                          value={detallesPago.expiracion}
                          onChange={e=>setDetallesPago({...detallesPago,expiracion:e.target.value})}
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={detallesPago.cvv}
                          onChange={e=>setDetallesPago({...detallesPago,cvv:e.target.value})}
                        />
                      </>
                    )}
                    {newTipo==='transferencia' && (
                      <input
                        type="email"
                        placeholder="Correo de PayPal"
                        value={detallesPago.email}
                        onChange={e=>setDetallesPago({...detallesPago,email:e.target.value})}
                      />
                    )}
                    {newTipo==='efectivo' && (
                      <p>Se pagará al recibir.</p>
                    )}

                    <button className="guardar-btn" onClick={guardarMetodoPago}>
                      Guardar método de pago
                    </button>
                  </>
                )}

                {mensajePago && <p className="mensaje-confirmacion">{mensajePago}</p>}
              </div>

              {/* — Resumen y checkout — */}
              <div className="resumen-carrito">
                <h3>Total: ${total.toLocaleString()} MXN</h3>
                <button className="pago-btn" onClick={handleCheckout}>
                  Proceder al pago
                </button>
                {mensajeFinal && <p className="mensaje-confirmacion">{mensajeFinal}</p>}
              </div>
            </>
        }
      </div>
    </>
  );
}
