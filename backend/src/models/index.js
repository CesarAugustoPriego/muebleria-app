// backend/src/models/index.js

const sequelize        = require('../config/database');
const Carrito          = require('./Carrito');
const CarritoDetalle   = require('./CarritoDetalle');
const Producto         = require('./Producto');
const Usuario          = require('./Usuario');
const Categoria        = require('./Categoria');
const ModeloMueble     = require('./Modelo_mueble');
const DireccionEnvio   = require('./DireccionEnvio');
const MetodoPago       = require('./MetodoPago');
const Venta            = require('./Venta');
const VentaDetalle     = require('./VentaDetalle');

// ——— Carrito & Detalle ———
Carrito.hasMany(CarritoDetalle, { foreignKey: 'fk_carrito', as: 'detalles' });
CarritoDetalle.belongsTo(Carrito,     { foreignKey: 'fk_carrito', as: 'carrito' });
Producto.hasMany(CarritoDetalle,      { foreignKey: 'fk_producto', as: 'ventasProducto' });
CarritoDetalle.belongsTo(Producto,    { foreignKey: 'fk_producto', as: 'producto' });

// ——— Usuario & Dirección/Metodos ———
Usuario.hasMany(DireccionEnvio, { foreignKey: 'fk_usuario', as: 'direcciones' });
DireccionEnvio.belongsTo(Usuario, { foreignKey: 'fk_usuario', as: 'usuario' });

Usuario.hasMany(MetodoPago, { foreignKey: 'fk_usuario', as: 'metodos' });
MetodoPago.belongsTo(Usuario, { foreignKey: 'fk_usuario', as: 'usuario' });

// ——— Venta & VentaDetalle ———
Usuario.hasMany(Venta, { foreignKey: 'fk_usuario', as: 'ventas' });
Venta.belongsTo(Usuario, { foreignKey: 'fk_usuario', as: 'usuario' });

Venta.hasMany(VentaDetalle, { foreignKey: 'fk_venta', as: 'detalles' });
VentaDetalle.belongsTo(Venta, { foreignKey: 'fk_venta', as: 'venta' });

Producto.hasMany(VentaDetalle,   { foreignKey: 'fk_producto', as: 'detalleVentas' });
VentaDetalle.belongsTo(Producto, { foreignKey: 'fk_producto', as: 'producto' });

module.exports = {
  sequelize,
  Carrito,
  CarritoDetalle,
  Producto,
  Usuario,
  Categoria,
  ModeloMueble,
  DireccionEnvio,
  MetodoPago,
  Venta,
  VentaDetalle
};
