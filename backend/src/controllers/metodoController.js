// backend/src/controllers/metodoController.js
const { MetodoPago } = require('../models');
const { ForeignKeyConstraintError } = require('sequelize');
const { registrarAuditoria } = require('../utils/auditoria');

exports.listarMetodos = async (req, res) => {
  try {
    const userId = req.user.id;
    const mp = await MetodoPago.findAll({ where: { fk_usuario: userId } });
    res.json(mp);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error al listar métodos de pago' });
  }
};

exports.crearMetodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tipo, token_last4, titular } = req.body;
    const mp = await MetodoPago.create({ fk_usuario: userId, tipo, token_last4, titular });

    // AUDITORÍA
    await registrarAuditoria({
      usuario_id: userId,
      accion: 'CREAR',
      entidad: 'metodo_pago',
      entidad_id: mp.id,
      detalles: { tipo, token_last4, titular }
    });

    res.status(201).json(mp);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error al crear método de pago' });
  }
};

exports.eliminarMetodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Recupera antes de borrar, para guardar en la auditoría
    const mp = await MetodoPago.findOne({ where: { id, fk_usuario: userId } });

    const eliminado = await MetodoPago.destroy({
      where: { id, fk_usuario: userId }
    });

    if (!eliminado) {
      return res.status(404).json({ msg: 'Método no encontrado' });
    }

    // AUDITORÍA
    await registrarAuditoria({
      usuario_id: userId,
      accion: 'ELIMINAR',
      entidad: 'metodo_pago',
      entidad_id: id,
      detalles: mp ? { tipo: mp.tipo, token_last4: mp.token_last4, titular: mp.titular } : {}
    });

    return res.json({ msg: 'Método eliminado' });
  } catch (e) {
    if (e instanceof ForeignKeyConstraintError) {
      return res
        .status(400)
        .json({ msg: 'No puedes borrar este método porque ya fue usado en una venta.' });
    }
    console.error(e);
    return res.status(500).json({ msg: 'Error al eliminar método' });
  }
};
