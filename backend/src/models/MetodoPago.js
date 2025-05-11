// backend/src/models/MetodoPago.js
const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');

const MetodoPago = sequelize.define('MetodoPago', {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
  },
  fk_usuario:    { type: DataTypes.INTEGER, allowNull: false },
  tipo:          { type: DataTypes.ENUM('tarjeta','efectivo','transferencia'), allowNull: false },
  token_last4:   { type: DataTypes.STRING(4) },
  titular:       { type: DataTypes.STRING }
}, {
  tableName: 'metodo_pago',
  timestamps: false
});

module.exports = MetodoPago;
