// backend/src/models/index.js
const sequelize       = require('../config/database');
const Carrito         = require('./Carrito');
const CarritoDetalle  = require('./CarritoDetalle');
const Producto        = require('./Producto');
// (importa aquí Usuario, Categoria, Modelo_mueble si los usas)

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

module.exports = {
  sequelize,
  Carrito,
  CarritoDetalle,
  Producto,
  // Usuario, Categoria, Modelo_mueble...
};
