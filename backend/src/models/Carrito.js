const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');

const Carrito = sequelize.define('Carrito', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fk_usuario:  { type: DataTypes.INTEGER, allowNull: false },
  estado:      { type: DataTypes.ENUM('abierto','cerrado'), defaultValue: 'abierto' }
}, {
  tableName: 'carrito',
  timestamps: false
});

module.exports = Carrito;
