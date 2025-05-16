// backend/src/controllers/productoController.js
const path = require('path');
const fs = require('fs');
const Producto = require('../models/Producto');
const { sequelize } = require ('../models');
const { QueryTypes } = require ('sequelize');

/**
 * POST /api/productos
 * Crea un nuevo producto con imagen.
 */
exports.crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, existencia, fk_categoria, fk_modelo } = req.body;
    if (!req.file) {
      return res.status(400).json({ msg: 'Falta imagen' });
    }

    const nuevo = await Producto.create({
      nombre,
      descripcion,
      precio_unitario: parseFloat(precio),
      existencia: parseInt(existencia, 10),
      fk_categoria: parseInt(fk_categoria, 10),
      fk_modelo: parseInt(fk_modelo, 10),
      imagen_url: `/uploads/${req.file.filename}`
    });

    res.status(201).json({ producto: nuevo });
  } catch (err) {
    console.error('Error al crear producto:', err);
    res.status(500).json({ msg: 'Error al crear producto' });
  }
};

/**
 * GET /api/productos
 * Obtiene todos los productos.
 */
exports.obtenerProductos = async (_req, res) => {
  try {
    const todos = await Producto.findAll({
      order: [['nombre', 'ASC']]
    });
    res.json(todos);
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).json({ msg: 'Error al obtener productos' });
  }
};

/**
 * DELETE /api/productos/:id
 * Elimina un producto y su archivo de imagen opcionalmente.
 */
exports.eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    // Borrar registro
    await producto.destroy();

    // Opcional: borrar archivo físico de uploads
    const imagenPath = path.join(__dirname, '..', '..', 'uploads', path.basename(producto.imagen_url || ''));
    if (fs.existsSync(imagenPath)) {
      fs.unlinkSync(imagenPath);
    }

    res.json({ msg: 'Producto eliminado' });
  } catch (err) {
    console.error('Error al eliminar producto:', err);
    res.status(500).json({ msg: 'Error al eliminar producto' });
  }
};

/**
 * GET /api/productos/modelo/:modeloId
 * Obtiene productos filtrados por modelo.
 */
exports.getProductosPorModelo = async (req, res) => {
  const { modeloId } = req.params;
  try {
    const productos = await Producto.findAll({
      where: { fk_modelo: modeloId },
      order: [['nombre', 'ASC']]
    });
    res.json(productos);
  } catch (err) {
    console.error('Error al obtener productos por modelo:', err);
    res.status(500).json({ msg: 'Error al obtener productos por modelo' });
  }
};

/**
 * GET /api/productos/top-vendidos
 * Obtiene los 3 productos más vendidos usando la vista top_vendidos.
 */
exports.obtenerTopVendidos = async (_req, res) => {
  try {
    const top = await sequelize.query(
      'SELECT * FROM top_vendidos',
      { type: QueryTypes.SELECT }
    );
    res.json(top);
  } catch (err) {
    console.error('Error al obtener top vendidos:', err);
    res.status(500).json({ msg: 'Error al obtener productos más vendidos' });
  }
};