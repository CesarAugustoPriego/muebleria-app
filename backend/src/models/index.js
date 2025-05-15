// backend/src/models/index.js
const sequelize      = require('../config/database');
const Usuario        = require('./Usuario');
const Categoria      = require('./Categoria');
const ModeloMueble   = require('./modelo_mueble');
const Producto       = require('./Producto');
const DireccionEnvio = require('./DireccionEnvio');
const MetodoPago     = require('./MetodoPago');
const Carrito        = require('./Carrito');
const CarritoDetalle = require('./CarritoDetalle');
const Venta          = require('./Venta');
const VentaDetalle   = require('./VentaDetalle');

// — Usuario ↔ Carrito
Usuario.hasMany(Carrito,   { foreignKey:'fk_usuario',   as:'carritos' });
Carrito.belongsTo(Usuario, { foreignKey:'fk_usuario',   as:'usuario' });

// — Carrito ↔ CarritoDetalle
Carrito.hasMany(CarritoDetalle,   { foreignKey:'fk_carrito', as:'detallesCarrito' });
CarritoDetalle.belongsTo(Carrito, { foreignKey:'fk_carrito', as:'carrito' });

// — Producto ↔ CarritoDetalle
Producto.hasMany(CarritoDetalle,   { foreignKey:'fk_producto', as:'entradasCarrito' });
CarritoDetalle.belongsTo(Producto, { foreignKey:'fk_producto', as:'producto' });

// — Usuario ↔ DirecciónEnvio
Usuario.hasMany(DireccionEnvio,   { foreignKey:'fk_usuario', as:'direcciones' });
DireccionEnvio.belongsTo(Usuario, { foreignKey:'fk_usuario', as:'usuarioDireccion' });

// — Usuario ↔ MetodoPago
Usuario.hasMany(MetodoPago,   { foreignKey:'fk_usuario', as:'metodos' });
MetodoPago.belongsTo(Usuario, { foreignKey:'fk_usuario', as:'usuarioMetodo' });

// — Usuario ↔ Venta
Usuario.hasMany(Venta,   { foreignKey:'fk_usuario', as:'ventas' });
Venta.belongsTo(Usuario, { foreignKey:'fk_usuario', as:'usuario' });

// — DirecciónEnvio ↔ Venta
DireccionEnvio.hasMany(Venta,   { foreignKey:'fk_direccion_envio', as:'ventas' });
Venta.belongsTo(DireccionEnvio, { foreignKey:'fk_direccion_envio', as:'direccionDeVenta' });

// — MetodoPago ↔ Venta
MetodoPago.hasMany(Venta,   { foreignKey:'fk_metodo_pago', as:'ventas' });
Venta.belongsTo(MetodoPago, { foreignKey:'fk_metodo_pago', as:'metodoDeVenta' });

// — Venta ↔ VentaDetalle
Venta.hasMany(VentaDetalle,   { foreignKey:'fk_venta', as:'detallesVenta' });
VentaDetalle.belongsTo(Venta, { foreignKey:'fk_venta', as:'venta' });

// — Producto ↔ VentaDetalle
Producto.hasMany(VentaDetalle,   { foreignKey:'fk_producto', as:'entradasVenta' });
VentaDetalle.belongsTo(Producto, { foreignKey:'fk_producto', as:'producto' });

// — ModeloMueble ↔ Categoria
Categoria.hasMany(ModeloMueble,   { foreignKey:'fk_categoria', as:'modelos' });
ModeloMueble.belongsTo(Categoria, { foreignKey:'fk_categoria', as:'categoria' });

// — ModeloMueble ↔ Producto
ModeloMueble.hasMany(Producto,   { foreignKey:'fk_modelo', as:'productos' });
Producto.belongsTo(ModeloMueble, { foreignKey:'fk_modelo', as:'modelo' });

// — Categoria ↔ Producto
Categoria.hasMany(Producto,   { foreignKey:'fk_categoria', as:'productosByCategory' });
Producto.belongsTo(Categoria, { foreignKey:'fk_categoria', as:'categoria' });

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
