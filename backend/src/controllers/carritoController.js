// backend/src/controllers/carritoController.js

const {
  Carrito,
  CarritoDetalle,
  Producto,
  Venta,
  VentaDetalle,
  sequelize
} = require('../models');

/**
 * Obtiene o crea (sólo si es necesario) el carrito "abierto" del usuario.
 */
async function obtenerCarritoActivo(usuarioId) {
  let carrito = await Carrito.findOne({
    where: { fk_usuario: usuarioId, estado: 'abierto' }
  });
  if (!carrito) {
    carrito = await Carrito.create({ fk_usuario: usuarioId, estado: 'abierto' });
  }
  return carrito;
}

/**
 * GET /api/carrito
 */
async function verCarrito(req, res) {
  try {
    const uid = req.user.id;
    const carrito = await Carrito.findOne({
      where: { fk_usuario: uid, estado: 'abierto' }
    });
    if (!carrito) {
      return res.json({ id: null, detalles: [] });
    }
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
    const uid = req.user.id;
    const { productoId, cantidad } = req.body;
    const carrito = await obtenerCarritoActivo(uid);

    let detalle = await CarritoDetalle.findOne({
      where: { fk_carrito: carrito.id, fk_producto: productoId }
    });

    if (detalle) {
      detalle.cantidad += cantidad;
      await detalle.save();
    } else {
      const prod = await Producto.findByPk(productoId);
      if (!prod) return res.status(404).json({ msg: 'Producto no existe' });

      detalle = await CarritoDetalle.create({
        fk_carrito:     carrito.id,
        fk_producto:    productoId,
        cantidad,
        precio_unitario: prod.precio_unitario
      });
    }

    return res.json({ msg: 'Producto agregado', detalle });
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
    const detalle = await CarritoDetalle.findByPk(req.params.id, {
      include: [{ model: Carrito, as: 'carrito' }]
    });

    if (!detalle || detalle.carrito.fk_usuario !== uid) {
      return res.status(404).json({ msg: 'Detalle no encontrado' });
    }

    if (cantidad < 1) {
      await detalle.destroy();
      return res.json({ msg: 'Producto eliminado' });
    }

    detalle.cantidad = cantidad;
    await detalle.save();
    return res.json({ msg: 'Cantidad actualizada', detalle });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'Error al actualizar la cantidad' });
  }
}

/**
 * POST /api/carrito/checkout
 */
async function checkout(req, res) {
  const t = await sequelize.transaction();
  try {
    const uid = req.user.id;
    const { direccionId, metodoId } = req.body;

    // 1) Carrito abierto
    const carrito = await Carrito.findOne({
      where: { fk_usuario: uid, estado: 'abierto' }
    });
    if (!carrito) {
      await t.rollback();
      return res.status(400).json({ msg: 'No tienes un carrito activo' });
    }

    // 2) Detalles
    const detalles = await CarritoDetalle.findAll({
      where: { fk_carrito: carrito.id }
    });
    if (detalles.length === 0) {
      await t.rollback();
      return res.status(400).json({ msg: 'El carrito está vacío' });
    }

    // 3) Total
    const total = detalles.reduce(
      (sum, d) => sum + parseFloat(d.precio_unitario) * d.cantidad,
      0
    );

    // 4) Crear Venta (SIN estado para usar DEFAULT 'pedido')
    const venta = await Venta.create({
      fk_usuario:         uid,
      fk_direccion_envio: direccionId || null,
      fk_metodo_pago:     metodoId   || null,
      fecha:              new Date(),
      total
    }, { transaction: t });

    // 5) Detalles de Venta
    for (const d of detalles) {
      await VentaDetalle.create({
        fk_venta:        venta.id,
        fk_producto:     d.fk_producto,
        cantidad:        d.cantidad,
        precio_unitario: d.precio_unitario,
        precio_total:    (d.precio_unitario * d.cantidad).toFixed(2)
      }, { transaction: t });
    }

    // 6) Cerrar y limpiar carrito
    carrito.estado = 'cerrado';
    await carrito.save({ transaction: t });
    await CarritoDetalle.destroy({
      where: { fk_carrito: carrito.id }
    }, { transaction: t });

    await t.commit();
    return res.json({ msg: 'Checkout completado', ventaId: venta.id });
  } catch (e) {
    console.error(e);
    await t.rollback();
    return res.status(500).json({ msg: 'Error en checkout' });
  }
}

module.exports = {
  verCarrito,
  agregarAlCarrito,
  actualizarCantidad,
  checkout
};
