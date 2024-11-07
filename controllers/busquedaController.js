const { Busqueda } = require('../models/busqueda.js')

/**
 * @swagger
 * paths:
 *   /contenido/busqueda:
 *     post:
 *       summary: Crear una nueva búsqueda
 *       description: Crea una nueva búsqueda en la base de datos utilizando las palabras de búsqueda proporcionadas.
 *       tags:
 *         - Búsqueda
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 palabras_de_busqueda:
 *                   type: string
 *                   description: Palabras de búsqueda que se desean agregar
 *                   example: "acción, aventura, ciencia ficción"
 *       responses:
 *         '201':
 *           description: Búsqueda creada con éxito
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Busqueda creada con éxito"
 *                   data:
 *                     type: object
 *                     properties:
 *                       id_busqueda:
 *                         type: integer
 *                         description: ID de la búsqueda creada
 *                       palabras_de_busqueda:
 *                         type: string
 *                         description: Palabras de búsqueda guardadas
 *         '400':
 *           description: Palabras de búsqueda no ingresadas o no se pudo crear la búsqueda
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *                 example: "No se ingresaron las palabras de búsqueda"
 *         '500':
 *           description: Error en el servidor al crear la búsqueda
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: "Error al crear la búsqueda"
 */
//crear nueva busqueda
const addBusqueda = async (req, res) => {
 try {
  const { palabras_de_busqueda } = req.body

  // Validar que se ingresaron las palabras de búsqueda
  if (!palabras_de_busqueda)
   return res.status(400).send('No se ingresaron las palabras de búsqueda')

  // Verificar si ya existe esa palabra en la base de datos
  const existeBusqueda = await Busqueda.findOne({
   where: { palabras_de_busqueda }
  })

  // Si la palabra ya existe, responder que no se agregará
  if (existeBusqueda) {
   return res.status(400).json({
    message: 'La palabra de búsqueda ya existe',
    data: existeBusqueda
   })
  }

  // Si no existe, crear la nueva búsqueda
  const busqueda = await Busqueda.create({
   palabras_de_busqueda
  })

  // Si no se pudo crear, manejar el error
  if (!busqueda) return res.status(400).send('No se pudo crear la búsqueda')

  // Respuesta exitosa
  res.status(201).json({
   message: 'Búsqueda creada con éxito',
   data: busqueda
  })
 } catch (error) {
  res.status(500).json({ error: 'Error al crear la búsqueda', error })
 }
}
module.exports = {
 addBusqueda
}
