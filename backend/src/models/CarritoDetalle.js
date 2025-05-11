// backend/src/models/CarritoDetalle.js
const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');

const CarritoDetalle = sequelize.define('CarritoDetalle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fk_carrito: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fk_producto: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  }
}, {
  tableName: 'carrito_detalle',
  timestamps: false
});

module.exports = CarritoDetalle;
