// backend/src/models/Venta.js
const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');

const Venta = sequelize.define('Venta', {
  id:                    { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fk_usuario:            { type: DataTypes.INTEGER, allowNull: false },
  fk_direccion_envio:    { type: DataTypes.INTEGER, allowNull: true },
  fk_metodo_pago:        { type: DataTypes.INTEGER, allowNull: true },
  fecha:                 { type: DataTypes.DATE,    allowNull: false, defaultValue: DataTypes.NOW },
  total:                 { type: DataTypes.DECIMAL(10,2), allowNull: false },
  estado:                { type: DataTypes.ENUM('pedido','enviado','en reparto','entregado'), allowNull: false, defaultValue: 'pedido' }
}, {
  tableName: 'venta',
  timestamps: false
});

module.exports = Venta;
