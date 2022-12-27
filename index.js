const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');



const app = express();

// Base de datos
dbConnection()

// CORS
app.use(cors());

// Public dir
app.use( express.static('public') );

// lectura y parseo body
app.use( express.json() );

// Rutes
app.use('/api/auth', require('./routes/auth'));

app.listen( process.env.PORT, () => {
    console.log(`servidor correind en el puerto ${ process.env.PORT }`);
});