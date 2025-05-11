// backend/src/models/modelo_mueble.js
const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');
const Categoria     = require('./Categoria');   // <— usa tu Categoria.js

const Modelo_mueble = sequelize.define('Modelo_mueble', {
  id: {
    type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
  },
  modelo: {
    type: DataTypes.STRING, allowNull: false, unique: true
  },
  fk_categoria: {
    type: DataTypes.INTEGER, allowNull: true
  }
}, {
  tableName: 'modelo_mueble',   // <— mismo nombre que en la BD
  timestamps: false
});

Modelo_mueble.associate = db => {
  db.Modelo_mueble.belongsTo(db.Categoria, {
    foreignKey: 'fk_categoria',
    as: 'categoria'
  });
};

module.exports = Modelo_mueble;
