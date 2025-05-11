// backend/src/controllers/carritoController.js

const {
  Carrito,
  CarritoDetalle,
  Producto,
  DireccionEnvio,
  MetodoPago,
  Venta,
  VentaDetalle,
  sequelize
} = require('../models');

/**
 * Obtiene (o crea) el carrito "abierto" del usuario.
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
    const uid = req.user.id;
    const { productoId, cantidad } = req.body;

    const carrito = await obtenerCarritoActivo(uid);

    let det = await CarritoDetalle.findOne({
      where: {
        fk_carrito: carrito.id,
        fk_producto: productoId
      }
    });

    if (det) {
      det.cantidad += cantidad;
      await det.save();
    } else {
      const prod = await Producto.findByPk(productoId);
      if (!prod) return res.status(404).json({ msg: 'Producto no existe' });

      det = await CarritoDetalle.create({
        fk_carrito:     carrito.id,
        fk_producto:    productoId,
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

/**
 * POST /api/carrito/checkout
 */
async function checkout(req, res) {
  const t = await sequelize.transaction();
  try {
    const uid = req.user.id;
    const { direccionId, metodoId } = req.body;

    // 1) Traer carrito y sus detalles
    const carrito = await obtenerCarritoActivo(uid);
    const detalles = await CarritoDetalle.findAll({
      where: { fk_carrito: carrito.id }
    });
    if (detalles.length === 0) {
      await t.rollback();
      return res.status(400).json({ msg: 'El carrito está vacío' });
    }

    // 2) Calcular total
    const total = detalles.reduce(
      (sum, d) => sum + parseFloat(d.precio_unitario) * d.cantidad,
      0
    );

    // 3) Crear la venta
    const venta = await Venta.create({
      fk_usuario:         uid,
      fk_direccion_envio: direccionId || null,
      fk_metodo_pago:     metodoId   || null,
      fecha:              new Date(),
      total,
      estado:             'pagado'
    }, { transaction: t });

    // 4) Registrar detalles de venta
    for (const d of detalles) {
      await VentaDetalle.create({
        fk_venta:        venta.id,
        fk_producto:     d.fk_producto,
        cantidad:        d.cantidad,
        precio_unitario: d.precio_unitario,
        precio_total:    (d.precio_unitario * d.cantidad).toFixed(2)
      }, { transaction: t });
    }

    // 5) Cerrar carrito y limpiar detalles
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
