// backend/src/controllers/ventaController.js
const { Venta, VentaDetalle, Producto, ModeloMueble, Categoria } = require('../models');

exports.listarVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      where: { fk_usuario: req.user.id },
      order: [['fecha', 'DESC']],
      include: [{
        model: VentaDetalle,
        as: 'detallesVenta',
        include: [{
          model: Producto,
          as: 'producto',
          include: [{
            model: ModeloMueble,
            as: 'modelo',
            include: [{ model: Categoria, as: 'categoria' }]
          }]
        }]
      }]
    });
    return res.json(ventas);
  } catch (error) {
    console.error('Error listarVentas:', error);
    return res.status(500).json({ msg: 'Error al listar ventas' });
  }
};
