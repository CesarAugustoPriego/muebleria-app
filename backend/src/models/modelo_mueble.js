// backend/src/models/modelo_mueble.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./categoria_mueble');

const Modelo = sequelize.define('modelo_mueble', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  fk_categoria: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'modelo_mueble',
  timestamps: false
});

// Asociación (opcional, para incluir datos de categoría)
Modelo.belongsTo(Categoria, {
  foreignKey: 'fk_categoria',
  as: 'categoria'
});

module.exports = Modelo;
