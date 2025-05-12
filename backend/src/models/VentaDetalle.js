const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');

const VentaDetalle = sequelize.define('VentaDetalle', {
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

VentaDetalle.associate = models => {
  VentaDetalle.belongsTo(models.Venta, {
    as: 'venta',
    foreignKey: 'fk_venta'
  });
  VentaDetalle.belongsTo(models.Producto, {
    as: 'producto',
    foreignKey: 'fk_producto'
  });
};

module.exports = VentaDetalle;
