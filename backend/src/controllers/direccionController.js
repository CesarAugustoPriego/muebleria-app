// backend/src/controllers/direccionController.js
const { DireccionEnvio } = require('../models');
const { registrarAuditoria } = require('../utils/auditoria'); // Importa aquí

/**
 * GET /api/direcciones
 * Lista todas las direcciones del usuario (normalmente 0 o 1).
 */
exports.listarDirecciones = async (req, res) => {
  try {
    const userId = req.user.id;
    const dirs = await DireccionEnvio.findAll({
      where: { fk_usuario: userId }
    });
    res.json(dirs);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error al listar direcciones' });
  }
};

/**
 * POST /api/direcciones
 * Crea una nueva dirección para el usuario.
 */
exports.crearDireccion = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = { ...req.body, fk_usuario: userId };
    const dir = await DireccionEnvio.create(data);

    // AUDITORÍA
    await registrarAuditoria({
      usuario_id: userId,
      accion: 'CREAR',
      entidad: 'direccion_envio',
      entidad_id: dir.id,
      detalles: data
    });

    res.status(201).json(dir);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error al crear dirección' });
  }
};

/**
 * PUT /api/direcciones/:id
 * Actualiza la dirección existente (solo si pertenece al usuario).
 */
exports.actualizarDireccion = async (req, res) => {
  try {
    const dir = await DireccionEnvio.findByPk(req.params.id);
    if (!dir || dir.fk_usuario !== req.user.id) {
      return res.status(404).json({ msg: 'Dirección no encontrada' });
    }
    await dir.update(req.body);

    // AUDITORÍA
    await registrarAuditoria({
      usuario_id: req.user.id,
      accion: 'EDITAR',
      entidad: 'direccion_envio',
      entidad_id: dir.id,
      detalles: req.body
    });

    res.json(dir);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error al actualizar dirección' });
  }
};
