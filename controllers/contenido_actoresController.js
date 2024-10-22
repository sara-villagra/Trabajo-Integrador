const { Contenido_Actores } = require('../models/contenido_actores.js')
const { Actor } = require('../models/actor.js')
const { Contenido } = require('../models/contenido.js')

//funcion para conectar actor con contenido
const conectarActorConContenido = async (req, res) => {
 try {
  const { id_actores, id_contenido } = req.params
  const actor = await Actor.findByPk(id_actores)
  const contenido = await Contenido.findByPk(id_contenido)
  if (!actor) {
   return res.status(404).json({ error: 'Actor no encontrado' })
  }
  if (!contenido) {
   return res.status(404).json({ error: 'Contenido no encontrado' })
  }
  const relacion = await Contenido_Actores.create({
   id_actores,
   id_contenido
  })
  res
   .status(201)
   .json({ message: 'Actor y peli asociada correctamente', relacion })
 } catch (error) {
  res
   .status(500)
   .json({ error: 'Hubo un error al conectar actor con contenido' })
 }
}
module.exports = {
 conectarActorConContenido
}
