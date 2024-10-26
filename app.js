const express = require('express')
const app = express()
// const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, './src/.env') })
const { Contenido } = require('./models/contenido.js')
const { Actor } = require('./models/actor.js')
const { Contenido_Actores } = require('./models/contenido_actores.js')
const { sequelize } = require('./conexion/database.js')
const contenidoRouters = require('./routes/contenidoRoutes.js')
const actorRouter = require('./routes/actorRouter.js')
const contenidoActorRouters = require('./routes/contenidoActorRouters.js')
const { Contenido_Genero } = require('./models/contenido_genero.js')
const { ContenidoBusqueda } = require('./models/contenido_busqueda.js')
const { Busqueda } = require('./models/busqueda.js')
const contenidoGeneroRouter = require('./routes/contenidoGeneroRouter.js')
const contenidoBusquedaRouter = require('./routes/contenidoBusquedaRouter.js')
const busquedaRouter = require('./routes/busquedaRouter.js')
const { swaggerUi, swaggerDocs } = require('./utils/swaggerConfig.js')
const PORT = process.env.PORT || 3000
app.disable('x-powered-by')
// Middlewares json
app.use(express.json())
//middleware para parsear body

app.use(express.urlencoded({ extended: true }))
//crea middleware de conexion y verificacion:

app.use(async (req, res, next) => {
 try {
  await sequelize.authenticate()
  console.log('Conexión establecida con éxito!')
  await sequelize.sync()
  await Contenido.sync()
  await Actor.sync()
  await Contenido_Actores.sync()
  await Contenido_Genero.sync()
  await Busqueda.sync()
  await ContenidoBusqueda.sync()
  next()
 } catch (error) {
  console.error('No se pudo conectar con la base de datos:', error)
 }
})
//swagger config
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
//Roters
app.get('/', (req, res) => {
 res.status(200).json({ messagge: 'Bienvenido a TrailerFlix!' })
})
app.use(
 '/contenido',
 contenidoRouters,
 actorRouter,
 contenidoActorRouters,
 contenidoGeneroRouter,
 contenidoBusquedaRouter,
 busquedaRouter
)

//Middleware para rutas no encontradas 404
app.use((req, res) => {
 res.status(404).json({ messagge: '404 página no encontrada upps! =(' })
})

app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`)

 console.log(`Api documentacion running on http://localhost:${PORT}/api-docs`)
})
