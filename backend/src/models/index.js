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

// ----------------- Asociaciones carrito -----------------
Carrito.hasMany(CarritoDetalle, {
  foreignKey: 'fk_carrito',
  as: 'detalles'
});
CarritoDetalle.belongsTo(Carrito, {
  foreignKey: 'fk_carrito',
  as: 'carrito'
});

Producto.hasMany(CarritoDetalle, {
  foreignKey: 'fk_producto',
  as: 'detallesProducto'
});
CarritoDetalle.belongsTo(Producto, {
  foreignKey: 'fk_producto',
  as: 'producto'
});

// ----------------- Asociaciones de usuario -----------------
// (opcional, si quieres eager-load)
Usuario.hasMany(DireccionEnvio, {
  foreignKey: 'fk_usuario',
  as: 'direcciones'
});
DireccionEnvio.belongsTo(Usuario, {
  foreignKey: 'fk_usuario',
  as: 'usuario'
});

Usuario.hasMany(MetodoPago, {
  foreignKey: 'fk_usuario',
  as: 'metodos'
});
MetodoPago.belongsTo(Usuario, {
  foreignKey: 'fk_usuario',
  as: 'usuario'
});

module.exports = {
  sequelize,
  Carrito,
  CarritoDetalle,
  Producto,
  Usuario,
  Categoria,
  ModeloMueble,
  DireccionEnvio,
  MetodoPago
};
