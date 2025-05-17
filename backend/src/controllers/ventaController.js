// backend/src/controllers/ventaController.js
const Venta           = require('../models/Venta');
const VentaDetalle    = require('../models/VentaDetalle');
const Producto        = require('../models/Producto');
const ModeloMueble    = require('../models/modelo_mueble');
const Categoria       = require('../models/Categoria');
const DireccionEnvio  = require('../models/DireccionEnvio');
const MetodoPago      = require('../models/MetodoPago');
const Usuario         = require('../models/Usuario');
const { registrarAuditoria } = require('../utils/auditoria'); // Importa aquí

const estadosPermitidos = ['pedido','enviado','en reparto','entregado'];

exports.listarVentas = async (req, res) => {
  try {
    const where = {};
    // Solo si NO es admin, filtra para mostrar solo sus ventas
    if (req.user.rol !== 'admin') {
      where.fk_usuario = req.user.id;
    }

    const ventas = await Venta.findAll({
      where,
      order: [['fecha','DESC']],
      include: [
        { model: Usuario,        as: 'usuario',          attributes:['nombres','apellidos'] },
        { model: DireccionEnvio, as: 'direccionDeVenta', attributes:['calle','ciudad','cp'] },
        { model: MetodoPago,     as: 'metodoDeVenta',    attributes:['tipo'] },
        {
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
        }
      ]
    });

    return res.json(ventas);
  } catch (err) {
    console.error('Error listarVentas:', err);
    return res.status(500).json({ msg: 'Error al listar ventas' });
  }
};

exports.actualizarEstado = async (req, res) => {
  const { id }     = req.params;
  const { estado } = req.body;

  if (!estadosPermitidos.includes(estado)) {
    return res.status(400).json({ msg:'Estado no válido' });
  }

  try {
    const [updated] = await Venta.update(
      { estado },
      { where:{ id } }
    );
    if (!updated) {
      return res.status(404).json({ msg:'Venta no encontrada' });
    }

    // AUDITORÍA: Estado actualizado
    await registrarAuditoria({
      usuario_id: req.user?.id,
      accion: 'ACTUALIZAR_ESTADO',
      entidad: 'venta',
      entidad_id: id,
      detalles: { nuevo_estado: estado }
    });

    const ventaActualizada = await Venta.findByPk(id, {
      include: [
        { model: Usuario,        as:'usuario',          attributes:['nombres','apellidos'] },
        { model: DireccionEnvio, as:'direccionDeVenta', attributes:['calle','ciudad','cp'] },
        { model: MetodoPago,     as:'metodoDeVenta',    attributes:['tipo'] },
        {
          model: VentaDetalle,
          as:'detallesVenta',
          include:[{
            model: Producto,
            as:'producto',
            include:[{
              model: ModeloMueble,
              as:'modelo',
              include:[{ model:Categoria, as:'categoria' }]
            }]
          }]
        }
      ]
    });

    return res.json(ventaActualizada);
  } catch (err) {
    console.error('Error actualizarEstado:', err);
    return res.status(500).json({ msg:'Error al actualizar estado' });
  }
};
