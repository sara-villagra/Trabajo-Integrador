const express = require('express')
const router = express.Router()
const db = require('../conexion/database')
//traer el controlador
const contenido_generoControllers = require('../controllers/contenido_generoControllers.js')

router.post(
 '/:id_contenido/nombre/:nombre',
 contenido_generoControllers.addGeneroContenido
)
module.exports = router
