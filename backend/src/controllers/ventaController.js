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
          as: 'detallesVenta',        // ← coincide con tu alias en models/index.js
          include: [
            {
              model: Producto,
              as: 'producto'          // ← coincide con el alias en tu VentaDetalle model
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
