const Categoria = require('../models/Categoria');

const obtenerCategorias = async (_, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener categorías' });
  }
};

module.exports = { obtenerCategorias };
