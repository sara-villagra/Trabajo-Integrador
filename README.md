# Proyecto Integrador: CRUD con Node.js y MySQL

## Descripción del Proyecto

En este proyecto, desarrolla una plataforma de streaming usando Node.js y MySQL. Ádemas,utilizaré Sequelize, este ORM nos permitirá manipular la bases de manera sencilla. La aplicación permitirá realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una base de datos relacional. Se implementó Express Router para optimizar la arquitectura de las diferentes rutas.

## Estructura del Repositorio

```plaintext
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
.env
.gitignore  
api.http
/app.js
/README.md
```

### Descripción de Archivos y carpetas

- **/conexion**: Carpeta que contiene archivos de conexión.
- **/controllers**: Carpeta que contiene los controladores de la aplicación.
- **/json**: Carpeta que contiene un archivos JSON con los datos de BD.
- **/models**: Carpeta que contiene los modelos de la aplicación.
- **/routes**: Carpeta que contiene las rutas de la aplicación.
- **.env**: Archivo que contiene las variables de entorno.
- **.gitignore**: Archivo que indica qué archivos o carpetas no se deben incluir
- **api.http**: Archivo que contiene las rutas de la API, para verificar funcionalidad.
- **app.js**: Archivo principal de la aplicación donde se define toda la lógica de rutas. 
- **README.md**: Archivo con la descripción del proyecto.

## Funcionalidades del CRUD
En el archivo api.http se puede realizar las operaciones CRUD y verificar la funcionalidad de la aplicación, para las siguientes operciones, utlizando Rest client. Tambien puedes utilizar Postman.

- **GET /**: Obtener ruta principal.
- **GET /contenido**: Obtener todos los contenidos.
- **GET /contenido/:id**: Obtener contenido específico.
- **GET /contenido/name/:nameCntenido**: Obtener contenido por su nombre
- **POST /contenido**: Crear un nuevo contenido.
- **PUT /contenido/:id**: Crear un nuevo contenido.
 - **DELETE /contenido/:id**: Eliminar un producto. Ruta protegida


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

- .env

***Crear archivo de conexión a la base de datos dentro de la carperta conexion:***

- conexion/database.js

***Crear archivo de controlador a la base de datos dentro de controllers:***

- controllers/contenidoController.js

***Crear archivos de modelos a la base de datos dentro de models:***

- models/contenido.js

***Crear archivo de rutas dentro de routes:***

- routes/contenidoRouter.js

***Crear archivo de rutas:***

- api.http

***Crear el servidor dentro de app.js***

La aplicación se inicializa y agregá la escucha de la conexión en el puerto 3008.

***Ejecutar el proyecto en terminal:***

- npm start
- Abrir en el navegador :
 http://localhost:3008/


## Datos JSON Proporcionados
Se proporciona dentro de la carpeta json un archivos correspondiente a los datos de los contenidos para cargar en la BD.


## Environment Variables
Para correr este proyecto, deberás modificar el archivo .env_copy por .env.
Para la de conexión , 
- DATABASE= NOMBRE_BD
- DBUSER=YOUR_ROOT
- PASSWORD=YOUR_PASSWORD
- HOST= localhost
- PORT= 3008

## Autor
- https://github.com/sara-villagra


***PRIMERA ENTREGA***
Se crearon rutas basicas sobre la tabla contenido.
ContenidoController.JS: Controla la funcionalidad del todo el CRUD.

/Carpeta models: Alli estan los modelos de la representación logica a nivel programacion de las tablas que tenemos en nuestra base de datos.

Carpeta routes: Se encuetra el enrutado del CRUD.

.env: Esta las claves de accesso a la BD como:
DATABASE
DBUSER=yourUser
PASSWORD=tu_paswoord
HOST= localhost
PORT= 3008

App.js: Alli se encuentra la ruta principal y atravéz de un midleware, se trae las rutas de routes con su la funcionalidad.
