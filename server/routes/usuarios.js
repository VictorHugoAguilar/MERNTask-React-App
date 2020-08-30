// rutas para crear usuarios
const express = require('express');
const router = express.Router();
// Importamos checkValidator para validar
const { check } = require('express-validator');

// importamos los controladores
const usuarioController = require('../controller/usuarioController');

// crear un usuario
// api/usuarios
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agregar un email valido').isEmail(),
        check('password', 'El password tiene que ser de 6 dígitos mínimo').isLength({min: 6})
    ],
    usuarioController.crearUsuario );

module.exports = router;