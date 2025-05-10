const Modelo = require('../models/Modelo');

const obtenerModelos = async (_, res) => {
  try {
    const modelos = await Modelo.findAll();
    res.json(modelos);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener modelos' });
  }
};

module.exports = { obtenerModelos };
