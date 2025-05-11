// backend/src/models/Categoria.js
const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING, allowNull: false, unique: true
  }
}, {
  tableName: 'categoria_mueble',  // ¡mismo nombre que en la BD!
  timestamps: false
});

Categoria.associate = db => {
  db.Categoria.hasMany(db.Modelo_mueble, {
    foreignKey: 'fk_categoria',
    as: 'modelos'
  });
};

module.exports = Categoria;
