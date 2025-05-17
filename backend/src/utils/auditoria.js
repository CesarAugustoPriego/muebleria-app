const sequelize = require('../config/database');

async function registrarAuditoria({ usuario_id, usuario, accion, entidad, entidad_id, detalles }) {
  // Si no viene usuario, buscarlo por usuario_id
  if ((!usuario || usuario === 'Desconocido') && usuario_id) {
    try {
      const result = await sequelize.query(
        `SELECT username, nombres, apellidos FROM usuario WHERE id = ? LIMIT 1`,
        { replacements: [usuario_id], type: sequelize.QueryTypes.SELECT }
      );
      const row = result[0];  // Primer registro o undefined

      if (row) {
        // Formar un string: "username (nombres apellidos)"
        const nombreCompleto = `${row.nombres || ''} ${row.apellidos || ''}`.trim();
        usuario = row.username
          ? `${row.username} (${nombreCompleto})`
          : nombreCompleto || 'Desconocido';
      } else {
        usuario = 'Desconocido';
      }
    } catch (e) {
      console.error('Error obteniendo usuario en auditoria:', e);
      usuario = 'Desconocido';
    }
  }

  await sequelize.query(
    `INSERT INTO auditoria (fecha, usuario_id, usuario, accion, entidad, entidad_id, detalles)
     VALUES (NOW(), ?, ?, ?, ?, ?, ?)`,
    {
      replacements: [
        usuario_id || null,
        usuario || 'Desconocido',
        accion,
        entidad,
        entidad_id,
        typeof detalles === "object" ? JSON.stringify(detalles) : detalles
      ]
    }
  );
}

module.exports = { registrarAuditoria };
