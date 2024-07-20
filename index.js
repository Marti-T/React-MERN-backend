const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//console.log( process.env );

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Público, el use() es un middleware
app.use( express.static('public') );


// Lectura y parseo del body
app.use( express.json() );


// Rutas req: request, res: response
// TODO: auth // crear, login, renew
// Todo lo que está en el archivo ./routes/auth vaya exportar lo va habilitar en api/auth
app.use('/api/auth', require('./routes/auth') ); 
// controllers/events.js y routes/events.js
app.use('/api/events', require('./routes/events') ); 


// TODO: CRUD: Eventos



// Escuchar peticiones (No poner el puerto 3000)
// app.listen( 4000, () => {
//     console.log(`Servidor corriendo en puerto ${ 4000 }`)
// });
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
});