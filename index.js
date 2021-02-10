//const express = require('express'); // asi se hacia antes y es lo que se conoce como common js, se utilizaba asi hasta antes que crearan los import y export en JS
import express from 'express'; // para activar los import y export debo necesariamente ir al archivo de package.json y colocar "type"; "module"
import router from './routes/index.js'; // de esta manera importo el router
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({path: "./variables.env"});


const app = express(); // Esta es la instancia de express

// Contectar la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

// Definir el puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000; // Asi arranco el servidor, la primera parte es el servidos asignado cuando entro a producción y el 4000 es el localhost que asigno yo mientras hago el desarrollo

// a continuacion todas las weas que empiezan com .app se les conoce como middleware, los middleware se ejecutan en ppila de arriba hacia abajo uno por uno, cuando utilizo rez o res, necesariamente le tengo que poner next de lo contrario, el codigo no s capas de seguir ejecutandose y avanzar hacia el siguiente middleware. a veces ocurre que aun poniendo el next el codigo queda atorado, la solucioón para esto es pornerle return next() para asi forzar el codigo.
//Habilitar PUG
app.set('view engine', 'pug'); // con esta sintaxis habilito pug como templatengine para hacer las viwe de las rutas

// Obtener el año actual
app.use( (req, res, next) => {
   // res.locals.unaVariable = 'Una nueva variable' // con locals (que son variables internas de express) puedo pasar valores de un archivo a otro o de un archivo hacia una vista
    //console.log(res.locals);
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    next();
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la Carpeta Pública - De la siguiente manera se tiene acceso y agrega la carpeta public como los archivos estaticos de express
app.use(express.static('public'));

// Agregar Router
app.use('/', router); // .use soporta todas los verbos http  get. post, delete, patch, put. para las rutas.

app.listen(port, host, () => {
    console.log('El servidor esta funcionando en el puerto ${port}');
})