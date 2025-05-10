const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  existencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  fk_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fk_modelo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imagen_url: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'producto',
  timestamps: false
});

module.exports = Producto;
