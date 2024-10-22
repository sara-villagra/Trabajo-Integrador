//traer el modelo contenido_genero
const { Contenido_Genero } = require('../models/contenido_genero.js')
//traer modelo genero
const { Genero } = require('../models/genero.js')
//traer modelo de contenido
const { Contenido } = require('../models/contenido.js')

//funcion para fucionar contenido y genero
const addGeneroContenido = async (req, res) => {
 try {
  const { nombre, id_contenido } = req.params // El nombre del género viene en los parámetros

  const contenido = await Contenido.findByPk(id_contenido)

  // Verifica que el ID del contenido esté presente
  if (!contenido) {
   return res.status(400).json({ message: 'ID de contenido es es el correcto' })
  }

  // Buscar el género en la tabla Genero usando su nombre que viene en el params
  const genero = await Genero.findOne({
   where: { nombre }
  })

  // Verifica si el género existe
  if (!genero) {
   return res
    .status(404)
    .json({ message: `El género ${nombre} no fue encontrado` })
  }

  // Asignar el id_genero correspondiente
  const id_genero = genero.id_genero

  // Crear la relación en la tabla intermedia Contenido_Genero
  const nuevaRelacion = await Contenido_Genero.create({
   id_contenido,
   id_genero
  })

  return res.status(201).json({
   message: `Género ${nombre} asignado correctamente al contenido`,
   data: nuevaRelacion
  })
 } catch (error) {
  return res.status(500).json({ message: 'Error del servidor', error })
 }
}

module.exports = {
 addGeneroContenido
}
