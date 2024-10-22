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
   res
    .status(201)
    .json({
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
