// Model for Categoria
const { sequelize } = require('../conexion/database.js')
const { DataTypes } = require('sequelize')

const Categoria = sequelize.define(
 'Categoria',
 {
  id_categoria: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true,
   allowNull: false,
   unique: true
  },

  nombre: {
   type: DataTypes.STRING(50),
   allowNull: false
  }
 },
 {
  tableName: 'categoria',
  timestamps: false
 }
)

module.exports = { Categoria }
