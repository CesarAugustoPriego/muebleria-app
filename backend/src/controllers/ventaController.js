// backend/src/controllers/ventaController.js
const { Venta, VentaDetalle, Producto } = require('../models');

exports.listarVentas = async (req, res) => {
  try {
    const userId = req.user.id;
    const ventas = await Venta.findAll({
      where: { fk_usuario: userId },
      include: [{
        model: VentaDetalle,
        as: 'detalles',
        include: [{ model: Producto, as: 'producto' }]
      }],
      order: [['fecha', 'DESC']]
    });
    return res.json(ventas);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'Error al listar ventas' });
  }
};
