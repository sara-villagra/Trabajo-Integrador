const { sequelize } = require('../conexion/database.js')
const { DataTypes } = require('sequelize')
const { Busqueda } = require('./busqueda.js')
const { Contenido } = require('./contenido.js')
// Tabla intermedia
const ContenidoBusqueda = sequelize.define(
 'ContenidoBusqueda',
 {
  id_contenido: {
   type: DataTypes.INTEGER,
   references: {
    model: Contenido,
    key: 'id_contenido'
   }
  },
  id_busqueda: {
   type: DataTypes.INTEGER,
   references: {
    model: Busqueda,
    key: 'id_busqueda'
   }
  }
 },

 {
  tableName: 'contenido_busqueda',
  timestamps: false
 }
)

// Relaciones
Contenido.belongsToMany(Busqueda, {
 through: ContenidoBusqueda,
 foreignKey: 'id_contenido'
})
Busqueda.belongsToMany(Contenido, {
 through: ContenidoBusqueda,
 foreignKey: 'id_busqueda'
})
module.exports = { ContenidoBusqueda }
