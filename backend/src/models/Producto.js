const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');

const Producto = sequelize.define('Producto', {
  id:            { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre:        { type: DataTypes.STRING },
  descripcion:   { type: DataTypes.TEXT },
  imagen_url:    { type: DataTypes.STRING },
  existencia:    { type: DataTypes.INTEGER },
  precio_unitario:{ type: DataTypes.DECIMAL(10,2) },
  fk_categoria:  { type: DataTypes.INTEGER },
  fk_modelo:     { type: DataTypes.INTEGER }
}, {
  tableName: 'producto',
  timestamps: false
});

module.exports = Producto;
