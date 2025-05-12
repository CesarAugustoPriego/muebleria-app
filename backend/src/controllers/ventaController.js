// backend/src/controllers/ventaController.js
const { Venta, VentaDetalle, Producto } = require('../models');

exports.listarVentas = async (req, res) => {
  try {
    const userId = req.user.id;

    const ventas = await Venta.findAll({
      where: { fk_usuario: userId },
      order: [['fecha', 'DESC']],
      include: [
        {
          model: VentaDetalle,
          as: 'detallesVenta',       // coincide con Venta.hasMany(..., as: 'detallesVenta')
          include: [
            {
              model: Producto,
              as: 'productoVenta'    // coincide con VentaDetalle.belongsTo(Producto, as: 'productoVenta')
            }
          ]
        }
      ]
    });

    return res.json(ventas);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'Error al listar ventas' });
  }
};
