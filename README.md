# Proyecto Integrador: CRUD con Node.js y MySQL

## Descripción del Proyecto

En este proyecto, desarrolla una plataforma de streaming usando Node.js y MySQL. La aplicación permitirá realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una base de datos relacional

Este proyecto esta en proceso...

Se crearon rutas basicas sobre la tabla contenido.
En la carpeta controllers: 
contenidoController: Controla la funcionalidad del todo el CRUD
Carpeta models: Para poder levanatar la base de datos, necesitamos crear un modelo que representa nuestras tablas(representacion logica a nivel programacion de las tablas que tenemos en nuestra base de datos)Para esto se crearon los archivos necesarios para su control.
Carpeta routes: se encuetra el enrutado de mi CRUD.
.env: Esta las claves de accesso a la BD como:
DATABASE
DBUSER=yourUser
PASSWORD=tu_paswoord
HOST= localhost
PORT= 3008
app.js:Atravez de un midleware, se trae las rutas y la funcionalidad del router.
Este proyecto esta en proceso