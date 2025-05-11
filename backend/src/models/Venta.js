// backend/src/models/Venta.js
const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');

const Venta = sequelize.define('Venta', {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
  },
  fk_usuario: {
    type: DataTypes.INTEGER, allowNull: false
  },
  fk_direccion_envio: {
    type: DataTypes.INTEGER, allowNull: true
  },
  fk_metodo_pago: {
    type: DataTypes.INTEGER, allowNull: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW    // ← valor por defecto
  },
  tipo_venta: {
    type: DataTypes.ENUM('de contado','venta a pagos'),
    allowNull: false,
    defaultValue: 'de contado'
  },
  total: {
    type: DataTypes.DECIMAL(10,2), allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente','pagado','enviado','entregado','cancelado'),
    allowNull: false,
    defaultValue: 'pendiente'
  }
}, {
  tableName: 'venta',
  timestamps: false
});

module.exports = Venta;
