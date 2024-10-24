const express = require('express')
const router = express.Router()
const db = require('../conexion/database')
const contenido_generoControllers = require('../controllers/contenido_generoControllers.js')

// router.get(
//  '/genero/:id_genero ',
//  contenido_generoControllers.showContenidoByGenero
// )

// Post de contenido y nombre de genero en tabla contenido-genero:
router.post(
 '/:id_contenido/genero/nombre/:nombre',
 contenido_generoControllers.addGeneroContenido
)
module.exports = router
