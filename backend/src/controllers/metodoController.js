// backend/src/controllers/metodoController.js
const { MetodoPago } = require('../models');

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
    res.status(201).json(mp);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error al crear método de pago' });
  }
};
