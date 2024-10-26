//requerir modelo actor

const { Actor } = require('../models/actor.js')
const { Contenido } = require('../models/contenido.js')

/**
 * @swagger
 * paths:
 *   /contenido/actor/{id_actores}:
 *     get:
 *       summary: Obtiene un actor junto con su contenido asociado
 *       description: Este endpoint recupera un registro de actor junto con el contenido asociado en la base de datos.
 *       tags:
 *         - Actores
 *       parameters:
 *         - in: path
 *           name: id_actores
 *           required: true
 *           description: ID del actor para filtrar el contenido asociado
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Actor y contenido obtenidos exitosamente.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id_actor:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: "Nombre del Actor"
 *                   apellido:
 *                     type: string
 *                     example: "Apellido del Actor"
 *                   contenido:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Contenido'
 *         '404':
 *           description: Actor no encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: 'Actor no encontrado'
 *         '500':
 *           description: Error en el servidor
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: 'Error del servidor'
 *                   error:
 *                     type: string
 */
//filtar actor con sus contenidos
const getActoresConContenido = async (req, res) => {
 try {
  const { id_actores } = req.params

  // Buscar actor
  const actor = await Actor.findByPk(id_actores, {
   include: [{ model: Contenido }]
  })

  // Validar
  if (!actor) return res.status(404).json({ message: 'Actor no encontrado' })

  res.json(actor)
 } catch (error) {
  res.status(500).json({ message: 'Error del servidor', error })
 }
}

/**
 * @swagger
 * paths:
 *   /contenido/actor:
 *     post:
 *       summary: Crear un nuevo actor
 *       description: Agrega un nuevo actor a la base de datos.
 *       tags:
 *         - Actor
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "Leonardo"
 *                   description: Nombre del actor
 *                 apellido:
 *                   type: string
 *                   example: "DiCaprio"
 *                   description: Apellido del actor
 *       responses:
 *         '201':
 *           description: Actor creado con éxito
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "se agrego un nuevo actor con exito"
 *                   actor:
 *                     $ref: '#/components/schemas/Actor'  # Asegúrate de que este esquema esté definido
 *         '400':
 *           description: No se pudo crear el actor
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *                 example: "No se pudo crear el actor"
 *         '500':
 *           description: Error en el servidor
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Error del servidor"
 *                   error:
 *                     type: string
 */
// Crear un nuevo actor
const addActor = async (req, res) => {
 try {
  const { nombre, apellido } = req.body

  // Crear actor
  const actor = await Actor.create({
   nombre,
   apellido
  })
  // validar
  if (!actor) return res.status(400).send('No se pudo crear el actor')

  res
   .status(201)
   .json({ messagge: 'se agrego un nuevo actor con exito', actor })
 } catch (error) {
  res.status(500).json({ message: 'Error del servidor', error })
 }
}
module.exports = {
 addActor,
 getActoresConContenido
}
