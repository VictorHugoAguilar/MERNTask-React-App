// rutas para autenticar usuario
const express = require('express');
const router = express.Router();
// Importamos checkValidator para validar
const { check } = require('express-validator');
// importamos los controller de proyecto
const proyectoController = require('../controller/proyectoController');
// importamos los middleware personalizados
const auth = require('../middleware/auth');

//Crea proyectos
// api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ], 
    proyectoController.crearProyecto
);

// Obtenemos todos los proyectos del usuario logeado
// api/proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
);

module.exports = router;