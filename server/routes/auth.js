// rutas para autenticar usuario
const express = require('express');
const router = express.Router();
// Importamos checkValidator para validar
const { check } = require('express-validator');
// importamos los middleware personalizados
const auth = require('../middleware/auth');
// Importamos el controlador
const authController = require('../controller/authController');

// Iniciar sesion
// api/auth
router.post('/',
    authController.autenticarUsuario);

// obtiene el usuario registrado
router.get('/',
    auth,
    authController.usuarioAutenticado
);


module.exports = router;