# Proyecto Integrador: CRUD con Node.js y MySQL

## Descripción del Proyecto

Este proyecto, desarrolla una plataforma de streaming usando Node.js y MySQL. Ádemas,utilizé Sequelize, este ORM nos permitirá manipular la bases de manera sencilla. La aplicación permitirá realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una base de datos relacional. Se implementó Express Router para optimizar la arquitectura de las diferentes rutas.
Se implementó Swagger para documentar endpoints.

## DER del Proyecto

Dentro de la carperta json se encuentra los datos de los contenidos del streaming, con ellos, desarrolle el siguiente modelo relacional. Donde cree 8 tablas:
- categorias:
Dentro estan las categorias.
- actores:
Dentro estan nombre y apellido de los actores.
- generos:
Dentro estan los generos.
- busqueda:
Dentro estan las palabras de busqueda.
- contenido:
Dentro estan  poster, titulo, id_categorias(FK-de categorias), resumen , temporada, duracion y trailer.
- contenido-generos:
Dentro se encuentra se cea la relacion entre contenido y los generos.
- contenido-actores:
Dentro se encuentra se cea la relacion entre contenido y los actores.
- contenido_busqueda:
Dentro se encuentra se cea la relacion entre contenido y las palabras de busqueda.


**En base a este esquema, se genero los script para crear una base de datos llamada "trailersFlix" e insertar las tablas dentro de MySQL Workbench .
Con ayuda AI, ingrese los datos en las tablas.**

![DER de contenido](assets/diagrama/trailerFLIX2.png)


## Estructura del Repositorio

```plaintext
/assets
/conexion/
  - database.js
/controllers
  - contenidoController.js
/json
  - trailerflix.json
/models/
  - contenido.js
  - categoria.js
  - genero.js
  - actor.js
/routes/
  - contenidoRoutes.js
/utils
 - swaggerConfig.js
.env.local
.env.local_railway
.env.production
.gitignore  
api.http
app.js
/README.md
```

### Descripción de Archivos y carpetas


- **/assets**:Carpeta que contine dos carpetas con script para crear la BD y insert para cargar datos a la BD.
- **/conexion**: Carpeta que contiene archivos de conexión.
- **/controllers**: Carpeta que contiene los controladores de la aplicación.
- **/json**: Carpeta que contiene un archivos JSON con los datos de BD.
- **/models**: Carpeta que contiene los modelos de la aplicación.
- **/routes**: Carpeta que contiene las rutas de la aplicación.
- **.env.local**: Archivo que contiene las variables de entorno.
- **.env.local_railway**: Archivo que contiene las variables de entorno para Railway.
- **.env.production**: Archivo que contiene las variables de entorno para producción.
- **.gitignore**: Archivo que indica qué archivos o carpetas no se deben incluir
- **api.http**: Archivo que contiene las rutas de la API, para verificar funcionalidad.
- **app.js**: Archivo principal de la aplicación donde se define toda la lógica de rutas. 
- **README.md**: Archivo con la descripción del proyecto.

## Funcionalidades del CRUD
En el archivo api.http se puede realizar las operaciones CRUD y verificar la funcionalidad de la aplicación, para las siguientes operciones, utlizando Rest client,Postman o verificar atraves del api de swagger

- **GET /**: Obtener ruta principal.
- **GET /contenido**: Obtener todos los contenidos.
- **GET /contenido/:id**: Obtener contenido por su id específico.
- **GET /contenido/:id/actores**: Obtener de un contenido, los actores.
- **GET /contenido/name/:nameContenido**: Obtener contenido por su nombre.
- **GET /contenido/actor/:id_actor**: Obtener los contenido de un actor por su id.
- **GET /contenido/genero/:id_genero**: Obtener los contenido por su id genero.
- **GET /contenido/genero/nombre/:name**: Obtener los contenido por el nombre del genero.
- **POST /contenido**: Crear un nuevo contenido.
- **POST /contenido/actor**: Crear un actor para contenido.
- **POST /contenido/:id_contenido/actor/:id_actor**: Asociar contenido y actor.
- **PUT /contenido/:id**: Actualizar un contenido.
- **PATCH /contenido/:id**: Actualizar un contenido parcialmente.
- **POST /contenido/:id_contenido/genero/nombre/:nombre**: Asociar contenido y genero.
- **POST /contenido/busqueda**: Crea una nueva palabra de busqueda.
- **POST /contenido/:id/busqueda/:id**: Asociar contenido con palabra de busqueda.
- **DELETE /contenido/:id**: Eliminar un contenido. 


## Instrucciones :


***Crear archivo principal de la aplicación :***
- app.js

***Inicializar el proyecto :***
- npm init -y

***Agregar las siguientes dependencias:***

- npm i express mysql2 sequelize

***Agregar en los script del archivo package.json:***
 
- "start": "node  -- watch app.js"

***Crear archivo de configuración de variables de entorno:***

- .env.local
- .env.local_railway
- .env.production


***Crear archivo de conexión a la base de datos dentro de la carperta conexion:***

- conexion/database.js

***Crear archivo de controlador a la base de datos dentro de controllers:***

- controllers/contenidoController.js

***Crear archivos de modelos a la base de datos dentro de models:***

- models/contenido.js

***Crear archivo de rutas dentro de routes:***

- routes/contenidoRouter.js

***Crear archivo para probar las rutas:***

- api.http

***Crear el servidor dentro de app.js***

La aplicación se inicializa y agregá la escucha de la conexión en el puerto 3008.

***Ejecutar el proyecto en terminal:***

- npm start:local (despliega desde local)
- npm start:local_railway (despliega desde railway)
- npm start(despliega para produccion)


## Datos Proporcionados:
Se proporciona dentro de la carpeta json un archivos correspondiente a los datos de los contenidos para cargar en la BD utilizando IA.
Sin embargo, se proporcionar dentro de la carpeta assets dos carpetas: En uno, con los script para crear la BD y en el otro, con los insert para cargar 50 contenidos para que puedas realizar las pruebas del funcionamiento del CRUD.


## Environment Variables
Para correr este proyecto, deberás modificar el archivo .env_copy por .env.local
Para la de conexión , 
- DB_USER=root
- DB_PASSWORD=YOUR_PASSWORD
- DB_NAME=NAME_BD
- DB_HOST=YOUR_HOST
- DB_DIALECT=mysql
- PORT= 3008


## Deploy


Para desplegar el proyecto en Railway, deberás crear un archivo .env.local_railway y alli deberas agregar el DB_PASSWORD, DB_HOST y DB_USER que te proporciona Railway.app.
- Abrir en el navegador, ir a   :
 https://railway.app/

Alli, en la sección settings, encontaras las variables correspondientes para realizar el deploy.Luego..


- Ir, a Create.(para crear deploy)



![alt text](/assets/imagen/image.png)


- Seleccionar Github Repo



![alt text](/assets/imagen/image-1.png)



- Agregar el nombre del repositorio a desplegar.

![alt text](/assets/imagen/image-2.png)


- Seleccionar Deploy Repo.


Una vez que lo genere, podrás encontrar en Networking, la url de dominio publico para desplegar tu proyecto.

Tambien .env.production deberas modificar el DB_HOST y el DB_PORT con los que te proporciona railway en su plataforma.
para poder conectarte con mysql y alli crear la bd, con los datos que te proporciono en la carpeta assets.
## Autor
- https://github.com/sara-villagra





