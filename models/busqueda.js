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
   type: DataTypes.TEXT
  }
 },
 {
  tableName: 'busqueda',
  timestamps: false
 }
)

module.exports = { Busqueda }
