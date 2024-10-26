//traer el modelo contenido_genero
const { Contenido_Genero } = require('../models/contenido_genero.js')
//traer modelo genero
const { Genero } = require('../models/genero.js')
//traer modelo de contenido
const { Contenido } = require('../models/contenido.js')

/**
 * @swagger
 * paths:
 *   /contenido/{id_contenido}/genero/{nombre}:
 *     post:
 *       summary: Asignar género a un contenido
 *       description: Crea una relación entre un contenido y un género especificado por su nombre, asignándolo en la tabla intermedia `Contenido_Genero`.
 *       tags:
 *         - Contenido
 *       parameters:
 *         - in: path
 *           name: id_contenido
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID del contenido al que se va a asignar el género
 *         - in: path
 *           name: nombre
 *           required: true
 *           schema:
 *             type: string
 *           description: Nombre del género a asignar
 *       responses:
 *         '201':
 *           description: Género asignado exitosamente al contenido
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Género [nombre] asignado correctamente al contenido"
 *                   data:
 *                     type: object
 *                     properties:
 *                       id_contenido:
 *                         type: integer
 *                         description: ID del contenido
 *                       id_genero:
 *                         type: integer
 *                         description: ID del género asignado
 *         '400':
 *           description: ID de contenido no es correcto
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "ID de contenido es incorrecto"
 *         '404':
 *           description: Género no encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "El género [nombre] no fue encontrado"
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
 *                     type: object
 *                     description: Información del error
 */
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
