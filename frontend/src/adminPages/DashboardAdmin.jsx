import React, { useState, useEffect } from 'react';
import Navbar from '../components/Auth/Navbar';
import './DashboardAdmin.css';

const API_BASE = 'http://localhost:4000/api';

export default function DashboardAdmin() {
  const [compras, setCompras] = useState([]);
  const [stats, setStats]     = useState({ mes:0, semana:0, ano:0 });
  const token = localStorage.getItem('token');

  useEffect(() => {
    (async()=>{
      const res = await fetch(`${API_BASE}/ventas`, {
        headers:{ Authorization:`Bearer ${token}` }
      });
      const data = await res.json();
      setCompras(data);
    })();
  },[token]);

  useEffect(() => {
    const hoy = new Date();
    let mes=0, sem=0, ano=0;
    compras.forEach(c => {
      const f = new Date(c.fecha), monto = parseFloat(c.total);
      if (f.getFullYear() === hoy.getFullYear()) ano += monto;
      if (f.getMonth()    === hoy.getMonth())    mes += monto;
      if ((hoy - f)/(1000*60*60*24) <= 7)        sem += monto;
    });
    setStats({ mes, semana:sem, ano });
  },[compras]);

  const actualizar = async (id, nuevo) => {
    const res = await fetch(`${API_BASE}/ventas/${id}/estado`, {
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
      },
      body: JSON.stringify({ estado: nuevo })
    });
    const upd = await res.json();
    setCompras(prev => prev.map(c => c.id===upd.id?upd:c));
  };

  const opciones = [
    { value:'pedido',     label:'Pedido' },
    { value:'enviado',    label:'Enviado' },
    { value:'en reparto', label:'En reparto' },
    { value:'entregado',  label:'Entregado' }
  ];

  return (
    <div className="dashboard-admin">
      <Navbar/>
      <h2>Dashboard Admin</h2>

      <div className="ingresos-cards">
        <div><h4>Mes</h4><p>${stats.mes.toFixed(2)}</p></div>
        <div><h4>Semana</h4><p>${stats.semana.toFixed(2)}</p></div>
        <div><h4>Año</h4><p>${stats.ano.toFixed(2)}</p></div>
      </div>

      <table className="tabla-compras">
        <thead>
          <tr>
            <th>ID</th><th>Usuari o</th><th>Fecha</th><th>Dirección</th>
            <th>Estado</th><th>Pago</th><th>Monto</th><th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {compras.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.usuario.nombres} {c.usuario.apellidos}</td>
              <td>{new Date(c.fecha).toLocaleString()}</td>
              <td>{c.direccionDeVenta? `${c.direccionDeVenta.calle}, ${c.direccionDeVenta.ciudad}`:'Recoger'}</td>
              <td>
                <select
                  value={c.estado}
                  onChange={e=> actualizar(c.id, e.target.value)}
                >
                  {opciones.map(o=>(
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </td>
              <td>{c.metodoDeVenta.tipo}</td>
              <td>${parseFloat(c.total).toFixed(2)}</td>
              <td><button onClick={()=>actualizar(c.id,c.estado)}>Guardar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
