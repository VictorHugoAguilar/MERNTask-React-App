// rutas para autenticar usuario
const express = require('express');
const router = express.Router();
// Importamos checkValidator para validar
const { check } = require('express-validator');
// Importamos el controlador
const authController = require('../controller/authController');
// crear un usuario
// api/auth
router.post('/',
    [
        check('email', 'Agregar un email valido').isEmail(),
        check('password', 'El password tiene que ser de 6 dígitos mínimo').isLength({ min: 6 })
    ],
    authController.autenticarUsuario);

module.exports = router;