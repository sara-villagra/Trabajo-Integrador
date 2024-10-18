const express = require('express')
const router = express.Router()
const db = require('../conexion/database')

//traer el controlador de contenido-busqueda
const contenido_busquedaControllers = require('../controllers/contenido_busquedaControllers.js')

router.post(
 '/:id_contenido/busqueda/:id_busqueda',
 contenido_busquedaControllers.conectarContenidoConBusqueda
)
module.exports = router
