const { Carrito, CarritoDetalle, Producto, Venta, VentaDetalle } = require('../models');

/**
 * Obtiene o crea el carrito activo para un usuario.
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
 * Muestra el carrito abierto con sus detalles.
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
 * Agrega un producto o suma a la cantidad en el carrito.
 */
async function agregarAlCarrito(req, res) {
  try {
    const uid = req.user.id;
    const { productoId, cantidad } = req.body;

    // 1) Obtén o crea carrito activo
    const carrito = await obtenerCarritoActivo(uid);

    // 2) Busca detalle existente
    let det = await CarritoDetalle.findOne({
      where: { fk_carrito: carrito.id, fk_producto: productoId }
    });

    if (det) {
      // 3a) Si existe, suma cantidad
      det.cantidad += cantidad;
      await det.save();
    } else {
      // 3b) Si no existe, obtiene precio del producto
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
 * Actualiza la cantidad de un detalle o lo elimina si queda en 0.
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
 * DELETE /api/carrito/detalle/:id
 * Elimina un producto del carrito.
 */
async function eliminarDetalle(req, res) {
  try {
    const uid = req.user.id;
    const det = await CarritoDetalle.findByPk(req.params.id, {
      include: [{ model: Carrito, as: 'carrito' }]
    });

    if (!det || det.carrito.fk_usuario !== uid) {
      return res.status(404).json({ msg: 'Detalle no encontrado' });
    }

    await det.destroy();
    return res.json({ msg: 'Producto eliminado' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'Error al eliminar detalle' });
  }
}

/**
 * POST /api/carrito/checkout
 * Cierra el carrito, crea venta y detalle de venta.
 */
async function checkout(req, res) {
  try {
    const uid = req.user.id;

    // 1) Obtener carrito con detalles
    const carrito = await Carrito.findOne({
      where: { fk_usuario: uid, estado: 'abierto' },
      include: [{ model: CarritoDetalle, as: 'detalles', include: [{ model: Producto, as: 'producto' }] }]
    });
    if (!carrito || carrito.detalles.length === 0) {
      return res.status(400).json({ msg: 'No hay productos en el carrito' });
    }

    // 2) Calcular total
    const total = carrito.detalles.reduce(
      (sum, d) => sum + d.cantidad * parseFloat(d.precio_unitario),
      0
    );

    // 3) Crear venta
    const venta = await Venta.create({
      fk_usuario:         uid,
      fk_direccion_envio: req.body.direccionId || null,
      fk_metodo_pago:     req.body.metodoPagoId || null,
      fecha:              new Date(),
      tipo_venta:         'de contado',
      total
    });

    // 4) Crear detalle de venta
    for (const d of carrito.detalles) {
      await VentaDetalle.create({
        fk_venta:        venta.id,
        fk_producto:     d.fk_producto,
        cantidad:        d.cantidad,
        precio_unitario: d.precio_unitario,
        precio_total:    d.cantidad * parseFloat(d.precio_unitario)
      });
    }

    // 5) Cerrar carrito
    carrito.estado = 'cerrado';
    await carrito.save();

    return res.json({ msg: 'Compra completada', ventaId: venta.id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'Error en checkout' });
  }
}

module.exports = {
  verCarrito,
  agregarAlCarrito,
  actualizarCantidad,
  eliminarDetalle,
  checkout
};
