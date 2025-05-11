// backend/src/models/index.js
const sequelize        = require('../config/database');

// Modelos
const Usuario          = require('./Usuario');
const Categoria        = require('./Categoria');
const ModeloMueble     = require('./modelo_mueble');
const Producto         = require('./Producto');
const DireccionEnvio   = require('./DireccionEnvio');
const MetodoPago       = require('./MetodoPago');
const Carrito          = require('./Carrito');
const CarritoDetalle   = require('./CarritoDetalle');
const Venta            = require('./Venta');
const VentaDetalle     = require('./VentaDetalle');


// ——— Usuario ↔ Carrito ———
Usuario.hasMany(Carrito, {
  foreignKey: 'fk_usuario',
  as: 'carritos'
});
Carrito.belongsTo(Usuario, {
  foreignKey: 'fk_usuario',
  as: 'usuario'
});

// ——— Carrito ↔ CarritoDetalle ———
Carrito.hasMany(CarritoDetalle, {
  foreignKey: 'fk_carrito',
  as: 'detallesCarrito'
});
CarritoDetalle.belongsTo(Carrito, {
  foreignKey: 'fk_carrito',
  as: 'carrito'
});

// ——— Producto ↔ CarritoDetalle ———
Producto.hasMany(CarritoDetalle, {
  foreignKey: 'fk_producto',
  as: 'entradasCarrito'
});
CarritoDetalle.belongsTo(Producto, {
  foreignKey: 'fk_producto',
  as: 'producto'
});

// ——— Usuario ↔ Dirección de Envío ———
Usuario.hasMany(DireccionEnvio, {
  foreignKey: 'fk_usuario',
  as: 'direcciones'
});
DireccionEnvio.belongsTo(Usuario, {
  foreignKey: 'fk_usuario',
  as: 'usuarioDireccion'
});

// ——— Usuario ↔ Método de Pago ———
Usuario.hasMany(MetodoPago, {
  foreignKey: 'fk_usuario',
  as: 'metodos'
});
MetodoPago.belongsTo(Usuario, {
  foreignKey: 'fk_usuario',
  as: 'usuarioMetodo'
});

// ——— Venta ↔ VentaDetalle ———
Venta.hasMany(VentaDetalle, {
  foreignKey: 'fk_venta',
  as: 'detallesVenta'
});
VentaDetalle.belongsTo(Venta, {
  foreignKey: 'fk_venta',
  as: 'ventaParent'
});

// ——— Producto ↔ VentaDetalle ———
Producto.hasMany(VentaDetalle, {
  foreignKey: 'fk_producto',
  as: 'entradasVenta'
});
VentaDetalle.belongsTo(Producto, {
  foreignKey: 'fk_producto',
  as: 'productoVenta'
});

// (Opcional) ——— DirecciónEnvio ↔ Venta ———
// si quieres poder acceder a la dirección de una venta, descomenta:
// DireccionEnvio.hasMany(Venta, { foreignKey: 'fk_direccion_envio', as: 'ventas' });
// Venta.belongsTo(DireccionEnvio, { foreignKey: 'fk_direccion_envio', as: 'direccionDeVenta' });

// (Opcional) ——— MetodoPago ↔ Venta ———
// si quieres poder acceder al método de pago de una venta, descomenta:
// MetodoPago.hasMany(Venta, { foreignKey: 'fk_metodo_pago', as: 'ventas' });
// Venta.belongsTo(MetodoPago, { foreignKey: 'fk_metodo_pago', as: 'metodoDeVenta' });

module.exports = {
  sequelize,
  Usuario,
  Categoria,
  ModeloMueble,
  Producto,
  DireccionEnvio,
  MetodoPago,
  Carrito,
  CarritoDetalle,
  Venta,
  VentaDetalle,
};
