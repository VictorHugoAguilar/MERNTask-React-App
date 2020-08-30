const express = require('express');
const conectDB = require('./config/db');
const cors = require('cors');
// crear el servidor
const app = express();

// conectar con la BD
conectDB();

// Habilitar los cors
app.use(cors());

// Habilitar exprees.json
app.use(express.json({ extended: true }));

// puerto de la app
const PORT = process.env.PORT || 4000;

// importamos las rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// arrancar el server
app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});