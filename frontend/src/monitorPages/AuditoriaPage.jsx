import React, { useEffect, useState } from 'react';
import Navbar from '../components/Auth/Navbar';

export default function AuditoriaPage() {
  const [auditoria, setAuditoria] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/api/auditoria', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Sin permiso o error de red');
        return res.json();
      })
      .then(data => {
        setAuditoria(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Cargando auditoría...</p>;
  if (error) return <p style={{ color: '#c0392b' }}>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 900, margin: '2rem auto', padding: 16, fontFamily: 'sans-serif', marginTop: '60px' }}>
        <h1>Historial de Auditoría</h1>
        <div style={{ background: '#f7fafd', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px #bbb4' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {auditoria.length === 0 ? (
              <li style={{ color: '#888' }}>Sin registros aún</li>
            ) : (
              auditoria.map(a => (
                <li key={a.id} style={{
                  marginBottom: 14,
                  background: '#fcfcfc',
                  borderRadius: 4,
                  padding: 10,
                  boxShadow: '0 1px 3px #e8e8e8'
                }}>
                  <strong>
                    {a.usuario || `ID: ${a.usuario_id || 'N/A'}`}
                  </strong>
                  : {a.accion} <b>{a.entidad}</b>
                  {a.entidad_id && <> (ID: {a.entidad_id})</>}
                  <br />
                  <span style={{ fontSize: '0.96em', color: '#555' }}>
                    {a.fecha ? new Date(a.fecha).toLocaleString() : 'Fecha no disponible'}
                    <br />
                    <b>Detalles:</b> {
                      (() => {
                        try {
                          const obj = typeof a.detalles === 'string' ? JSON.parse(a.detalles) : a.detalles;
                          return (
                            <pre style={{
                              margin: 0,
                              display: 'inline',
                              fontSize: '0.98em',
                              color: '#003366',
                              background: '#f5f8fb',
                              borderRadius: 3,
                              padding: '2px 6px'
                            }}>
                              {JSON.stringify(obj, null, 2)}
                            </pre>
                          );
                        } catch {
                          return a.detalles;
                        }
                      })()
                    }
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
}