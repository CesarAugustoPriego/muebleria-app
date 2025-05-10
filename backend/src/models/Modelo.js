const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Modelo = sequelize.define('modelo_mueble', {
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  fk_categoria: {                // 🔗 nueva columna
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'modelo_mueble',
  timestamps: false
});

module.exports = Modelo;
