const { sequelize } = require('../conexion/database.js')
const { DataTypes } = require('sequelize')

const Busqueda = sequelize.define(
 'Busqueda',
 {
  id_busqueda: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true,
   allowNull: false,
   unique: true
  },
  palabras_de_busqueda: {
   type: DataTypes.TEXT,
   allowNull: true,
   default: 1
  }
 },
 {
  tableName: 'Busqueda',
  timestamps: false
 }
)

module.exports = { Busqueda }