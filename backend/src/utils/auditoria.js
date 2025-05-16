// backend/src/utils/auditoria.js
const sequelize = require('../config/database');

/**
 * Registra un evento en la tabla de auditoría.
 * @param {Object} params
 * @param {number} params.usuario_id - ID del usuario
 * @param {string} params.usuario - username o email del usuario
 * @param {string} params.accion - 'CREAR', 'EDITAR', 'ELIMINAR', etc.
 * @param {string} params.entidad - tabla afectada ('producto', 'usuario', etc.)
 * @param {number} params.entidad_id - ID de la fila afectada
 * @param {string|Object} params.detalles - Descripción o JSON con los cambios
 */
async function registrarAuditoria({ usuario_id, usuario, accion, entidad, entidad_id, detalles }) {
  await sequelize.query(
    `INSERT INTO auditoria (usuario_id, usuario, accion, entidad, entidad_id, detalles)
     VALUES (?, ?, ?, ?, ?, ?)`,
    {
      replacements: [
        usuario_id || null,
        usuario || null,
        accion,
        entidad,
        entidad_id || null,
        detalles ? (typeof detalles === 'object' ? JSON.stringify(detalles) : detalles) : null
      ]
    }
  );
}

module.exports = { registrarAuditoria };
