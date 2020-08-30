// rutas para crear usuarios
const express = require('express');
const router = express.Router();

// importamos los controladores
const usuarioController = require('../controller/usuarioController');

// crear un usuario
// api/usuarios
router.post('/', usuarioController.crearUsuario );

module.exports = router;