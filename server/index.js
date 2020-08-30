const express = require('express');
const conectDB = require('./config/db');

// crear el servidor
const app = express();

// conectar con la BD
conectDB();

// puerto de la app
const PORT = process.env.PORT || 4000;

// importamos las rutas
app.use('/api/usuarios', require('./routes/usuarios'));

// arrancar el server
app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});

// definir la pagina principal
app.get('/', (req, res) => {
    res.send("Hola desde principal");
})
