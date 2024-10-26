const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const contenidoSchema = {
 type: 'object',
 properties: {
  id_contenido: {
   type: 'integer',
   description: 'ID único del contenido',
   example: 1
  },
  poster: {
   type: 'string',
   description: 'ruta del contenido',
   example: 'poster.jpg'
  },
  titulo: {
   type: 'string',
   description: 'Título del contenido',
   example: 'El Silencio de los Insectos'
  },
  id_categoria: {
   type: 'integer',
   description: 'ID de la categoría a la que pertenece el contenido',
   example: 1
  },
  resumen: {
   type: 'string',
   description: 'Resumen del contenido',
   example:
    'El Silencio de los Insectos es una película ambiental que explora la historia del silencio y la violencia en América Latina.'
  },
  temporada: {
   type: 'string',
   description: 'Temporada del contenido',
   example: 'Temporada 1'
  },
  duracion: {
   type: 'integer',
   description: 'Duración del contenido en minutos',
   example: 97
  },
  trailer: {
   type: 'string',
   description: 'Link del trailer del contenido',
   example: 'https://www.youtube.com/watch?v=82-L-9Z6w7I'
  }
 },
 required: [
  'id_contenido',
  'poster',
  'titulo',
  'id_categoria',
  'resumen',
  'temporada',
  'duracion',
  'trailer'
 ]
}
const actoresSchema = {
 type: 'object',
 properties: {
  id_actores: {
   type: 'integer',
   description: 'ID único de actor',
   example: 1
  },
  nombre: {
   type: 'string',
   description: 'Nombre del actor',
   example: 'Sam'
  },
  apellido: {
   type: 'string',
   description: 'Apellido del actor',
   example: 'Heughan'
  },
  required: ['id_actores', 'nombre', 'apellido']
 }
}
const generoSchema = {
 type: 'object',
 properties: {
  id_genero: {
   type: 'integer',
   description: 'ID único del género',
   example: 1
  },
  nombre: {
   type: 'string',
   description: 'Nombre del género',
   example: 'Drama'
  },
  required: ['id_genero', 'nombre']
 }
}
const busquedaSchema = {
 type: 'object',
 properties: {
  id_busqueda: {
   type: 'integer',
   description: 'ID único del género',
   example: 1
  },
  palabras_de_busqueda: {
   type: 'text',
   description: 'Palabra o palabras que referencie a su contenido',
   example: 'Stranger Thing'
  },
  required: ['id_busqueda']
 }
}
const categoriaSchema = {
 type: 'object',
 properties: {
  id_categoria: {
   type: 'integer',
   description: 'ID único de categoría',
   example: 1
  },
  nombre: {
   type: 'string',
   description: 'Nombre de la categoría',
   example: 'Drama'
  },
  required: ['id_categoria', 'nombre']
 }
}
const contenidoBusquedaSchema = {
 type: 'object',
 properties: {
  id_contenido: {
   type: 'integer',
   description: 'ID del contenido, referenciado en la tabla Contenido',
   example: 1
  },
  id_busqueda: {
   type: 'integer',
   description: 'ID de la búsqueda, referenciado en la tabla Busqueda',
   example: 1
  },

  required: ['id_contenido', 'id_busqueda']
 }
}
const contenidoGeneroSchema = {
 type: 'object',
 properties: {
  id_contenido_genero: {
   type: 'integer',
   description: 'ID único del género',
   example: 1
  },
  id_contenido: {
   type: 'integer',
   description: 'ID único del contenido',
   example: 1
  },
  id_genero: {
   type: 'integer',
   description: 'ID único del género',
   example: 1
  },
  required: ['id_genero', 'nombre']
 }
}
const contenidoActoresSchema = {
 type: 'object',
 properties: {
  id_contenido_actores: {
   type: 'integer',
   description: 'ID único de la relación entre contenido y actores',
   example: 1
  },
  id_contenido: {
   type: 'integer',
   description: 'ID del contenido, referenciado en la tabla Contenido',
   example: 1
  },
  id_actores: {
   type: 'integer',
   description: 'ID del actor, referenciado en la tabla Actor',
   example: 23
  },
  required: ['id_actores', 'id_contenido', 'id_contenido_actores']
 }
}
const swaggerOptions = {
 swaggerDefinition: {
  openapi: '3.0.0',
  info: {
   title: ' Proyecto Integrador: CRUD con Node.js y MySQL',
   version: '1.0.0',
   description:
    'Este proyecto, desarrolla una plataforma de streaming usando Node.js y MySQL. Ádemas,utiliza Sequelize, este ORM nos permitirá manipular la bases de manera sencilla. La aplicación permitirá realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una base de datos relacional. Se implementó Express Router para optimizar la arquitectura de las diferentes rutas.'
  },

  basePath: '/',
  servers: [
   {
    url: 'http://localhost:3008',
    description: 'Development Api Server contenidos de peliculas y series'
   }
  ],
  components: {
   schemas: {
    Contenido: contenidoSchema,
    Actor: actoresSchema,
    Genero: generoSchema,
    Busqueda: busquedaSchema,
    Categoria: categoriaSchema,
    Contenido_Genero: contenidoGeneroSchema,
    Contenido_Busqueda: contenidoBusquedaSchema,
    Contenido_Actores: contenidoActoresSchema
   }
  }
 },
 apis: ['./routers/*.js', './controllers/*.js']
}
const swaggerDocs = swaggerJsdoc(swaggerOptions)

module.exports = { swaggerDocs, swaggerUi }
