// backend/src/controllers/carritoController.js

const { Carrito, CarritoDetalle, Producto } = require('../models');

/**
 * Obtiene el carrito "abierto" del usuario o lo crea si no existe.
 * @param {number} usuarioId 
 * @returns {Promise<Carrito>}
 */
async function obtenerCarritoActivo(usuarioId) {
  let carrito = await Carrito.findOne({
    where: { fk_usuario: usuarioId, estado: 'abierto' }
  });
  if (!carrito) {
    carrito = await Carrito.create({ fk_usuario: usuarioId });
  }
  return carrito;
}

/**
 * GET /api/carrito
 */
async function verCarrito(req, res) {
  try {
    const uid = req.user.id;
    const carrito = await obtenerCarritoActivo(uid);
    const detalles = await CarritoDetalle.findAll({
      where: { fk_carrito: carrito.id },
      include: [{ model: Producto, as: 'producto' }]
    });
    return res.json({ id: carrito.id, detalles });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'Error al obtener carrito' });
  }
}

/**
 * POST /api/carrito/agregar
 */
async function agregarAlCarrito(req, res) {
  try {
    const uid             = req.user.id;
    const { productoId, cantidad } = req.body;

    // 1) Obtén o crea carrito
    const carrito = await obtenerCarritoActivo(uid);

    // 2) Busca si ya existe el detalle
    let det = await CarritoDetalle.findOne({
      where: {
        fk_carrito: carrito.id,
        fk_producto: productoId
      }
    });

    if (det) {
      // 3a) Si existe, sumas cantidad
      det.cantidad += cantidad;
      await det.save();
    } else {
      // 3b) Si no existe, obtén el producto para precio
      const prod = await Producto.findByPk(productoId);
      if (!prod) return res.status(404).json({ msg: 'Producto no existe' });

      det = await CarritoDetalle.create({
        fk_carrito:    carrito.id,
        fk_producto:   productoId,
        cantidad,
        precio_unitario: prod.precio_unitario
      });
    }

    return res.json({ msg: 'Producto agregado', detalle: det });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'Error al agregar al carrito' });
  }
}

/**
 * PUT /api/carrito/detalle/:id
 */
async function actualizarCantidad(req, res) {
  try {
    const uid = req.user.id;
    const { cantidad } = req.body;
    const det = await CarritoDetalle.findByPk(req.params.id, {
      include: [{ model: Carrito, as: 'carrito' }]
    });

    if (!det || det.carrito.fk_usuario !== uid) {
      return res.status(404).json({ msg: 'Detalle no encontrado' });
    }

    if (cantidad < 1) {
      await det.destroy();
      return res.json({ msg: 'Producto eliminado' });
    }

    det.cantidad = cantidad;
    await det.save();
    return res.json({ msg: 'Cantidad actualizada', detalle: det });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'Error al actualizar la cantidad' });
  }
}

module.exports = {
  verCarrito,
  agregarAlCarrito,
  actualizarCantidad
};
