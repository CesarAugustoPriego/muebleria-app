// backend/src/models/VentaDetalle.js
const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');

const Venta   = require('./Venta');
const Producto = require('./Producto');

const VentaDetalle = sequelize.define('venta_detalle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fk_venta: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fk_producto: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  precio_total: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  }
}, {
  tableName: 'venta_detalle',
  timestamps: false
});

// ——— Asociaciones ———
Venta.hasMany(VentaDetalle, {
  foreignKey: 'fk_venta',
  as: 'detalles'
});
VentaDetalle.belongsTo(Venta, {
  foreignKey: 'fk_venta',
  as: 'venta'
});

Producto.hasMany(VentaDetalle, {
  foreignKey: 'fk_producto',
  as: 'venta_productos'
});
VentaDetalle.belongsTo(Producto, {
  foreignKey: 'fk_producto',
  as: 'producto'
});

module.exports = VentaDetalle;
