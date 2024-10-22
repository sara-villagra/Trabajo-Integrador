const express = require('express')
const router = express.Router()
const db = require('../conexion/database')
const contenido_busquedaControllers = require('../controllers/contenido_busquedaControllers.js')
//unir contenido y palabra de busqueda en tabla contenido-busqueda:
router.post(
 '/:id_contenido/busqueda/:id_busqueda',
 contenido_busquedaControllers.conectarContenidoConBusqueda
)
module.exports = router
