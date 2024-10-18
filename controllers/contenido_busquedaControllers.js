const { ContenidoBusqueda } = require('../models/contenido_busqueda')
const { Contenido } = require('../models/contenido.js')
const { Busqueda } = require('../models/busqueda.js')

//funcion para fucionar contenido y busqueda

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
   console.log(
    `Contenido ${id_contenido} conectado con la busqueda ${id_busqueda}`
   )
   res
    .status(201)
    .send(`Contenido ${id_contenido} conectado con la busqueda ${id_busqueda}`)
  }
  // En caso de que existan errores en la coneccion, se arroja un error 500
 } catch (error) {
  console.error('Error al conectar contenido con busqueda:', error)
  res.status(500).send('Error en el servidor')
 }
}

module.exports = {
 conectarContenidoConBusqueda
}
