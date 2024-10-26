const { ContenidoBusqueda } = require('../models/contenido_busqueda')
const { Contenido } = require('../models/contenido.js')
const { Busqueda } = require('../models/busqueda.js')

//funcion para fucionar contenido y busqueda
/**
 * @swagger
 * paths:
 *   /api/contenido/{id_contenido}/busqueda/{id_busqueda}:
 *     post:
 *       summary: Conectar contenido con una búsqueda
 *       description: Asocia un contenido existente a una búsqueda específica en la base de datos.
 *       tags:
 *         - Conexiones
 *       parameters:
 *         - in: path
 *           name: id_contenido
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID del contenido a conectar
 *         - in: path
 *           name: id_busqueda
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID de la búsqueda con la cual conectar el contenido
 *       responses:
 *         '201':
 *           description: Contenido conectado exitosamente con la búsqueda
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Contenido {id_contenido} conectado con la búsqueda {id_busqueda}"
 *         '404':
 *           description: Contenido o búsqueda no encontrados
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *                 example: "No hay contenido disponible"
 *         '500':
 *           description: Error en el servidor al intentar conectar contenido con búsqueda
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Error del servidor"
 */
const conectarContenidoConBusqueda = async (req, res) => {
 try {
  const { id_contenido, id_busqueda } = req.params
  const busqueda = await Busqueda.findByPk(id_busqueda)
  const contenido = await Contenido.findByPk(id_contenido)
  if (!busqueda) {
   res.status(404).send('No hay busqueda disponible')
  } else if (!contenido) {
   res.status(404).send('No hay contenido disponible')
  } else {
   await ContenidoBusqueda.create({
    id_busqueda,
    id_contenido
   })
   res.status(201).json({
    message: `Contenido ${id_contenido} conectado con la busqueda ${id_busqueda}`
   })
  }
 } catch (error) {
  res.status(500).json({ message: 'Error del servidor', error })
 }
}

module.exports = {
 conectarContenidoConBusqueda
}
