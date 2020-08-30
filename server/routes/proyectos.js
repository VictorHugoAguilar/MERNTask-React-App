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
        check('nombre', 'El nombre del proyecto es obligatorio')
            .trim()
            .not()
            .isEmpty()
            .escape()
    ],
    proyectoController.crearProyecto
);

// Obtenemos todos los proyectos del usuario logeado
// api/proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
);

// Actualizamos un proyecto via id
// api/proyectos
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio')
            .trim()
            .not()
            .isEmpty()
            .escape()
    ],
    proyectoController.actualizarProyecto
);


// Eliminar un proyecto via id
// api/proyectos
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
);

module.exports = router;