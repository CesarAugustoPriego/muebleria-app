const sequelize = require('../config/database');

/**
 * Consulta los últimos registros de auditoría (puedes agregar filtros después).
 * Solo debe usarse para administradores.
 */
exports.getAuditoria = async (req, res) => {
  try {
    const auditoria = await sequelize.query(
      `SELECT * FROM auditoria ORDER BY fecha DESC LIMIT 100`,
      { type: sequelize.QueryTypes.SELECT }
    );
    res.json(auditoria);
  } catch (error) {
    console.error('Error al consultar auditoría:', error);
    res.status(500).json({ error: 'Error al obtener registros de auditoría' });
  }
};
