// backend/src/controllers/modeloController.js
const Modelo = require('../models/Modelo'); // ajusta la ruta si tu archivo se llama modelo_mueble.js


// Todos los modelos
const obtenerModelos = async (_, res) => {
  try {
    const modelos = await Modelo.findAll({
      order: [['modelo', 'ASC']]
    });
    res.json(modelos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al obtener modelos' });
  }
};

// Modelos por categoría
const obtenerModelosPorCategoria = async (req, res) => {
  const { categoriaId } = req.params;
  try {
    const modelos = await Modelo.findAll({
      where: { fk_categoria: categoriaId },
      order: [['modelo', 'ASC']]
    });
    res.json(modelos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al obtener modelos por categoría' });
  }
};

module.exports = {
  obtenerModelos,
  obtenerModelosPorCategoria
};
