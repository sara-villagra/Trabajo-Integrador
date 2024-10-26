const { Contenido_Actores } = require('../models/contenido_actores.js')
const { Actor } = require('../models/actor.js')
const { Contenido } = require('../models/contenido.js')

/**
 * @swagger
 * paths:
 *   /api/contenido/{id_contenido}/actor/{id_actores}:
 *     post:
 *       summary: Conectar un actor con un contenido
 *       description: Asocia un actor existente a un contenido específico en la base de datos.
 *       tags:
 *         - Conexiones
 *       parameters:
 *         - in: path
 *           name: id_actores
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID del actor a conectar
 *         - in: path
 *           name: id_contenido
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID del contenido con el cual conectar el actor
 *       responses:
 *         '201':
 *           description: Actor conectado exitosamente con el contenido
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Actor y peli asociada correctamente"
 *                   relacion:
 *                     type: object
 *                     properties:
 *                       id_actores:
 *                         type: integer
 *                         example: 1
 *                       id_contenido:
 *                         type: integer
 *                         example: 10
 *         '404':
 *           description: Actor o contenido no encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: "Actor no encontrado"
 *         '500':
 *           description: Error en el servidor al intentar conectar el actor con el contenido
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: "Hubo un error al conectar actor con contenido"
 */
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
