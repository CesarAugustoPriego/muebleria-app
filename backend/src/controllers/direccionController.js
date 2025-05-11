// backend/src/controllers/direccionController.js
const { DireccionEnvio } = require('../models');

exports.listarDirecciones = async (req, res) => {
  try {
    const userId = req.user.id;
    const dirs = await DireccionEnvio.findAll({ where: { fk_usuario: userId } });
    res.json(dirs);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error al listar direcciones' });
  }
};

exports.crearDireccion = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = { ...req.body, fk_usuario: userId };
    const dir = await DireccionEnvio.create(data);
    res.status(201).json(dir);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error al crear dirección' });
  }
};
