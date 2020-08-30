// rutas para autenticar usuario
const express = require('express');
const router = express.Router();
// Importamos checkValidator para validar
const { check } = require('express-validator');
// importamos los controller de proyecto
const tareaController = require('../controller/tareaController');
// importamos los middleware personalizados
const auth = require('../middleware/auth');

//Crea Tarea
// api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatorio')
            .trim()
            .not()
            .isEmpty()
            .escape()
    ],
    tareaController.crearTarea
);

// Obtenemos todas las tarea del proyecto
// api/tareas
router.get('/',
    auth,
    tareaController.obtenerTareas
);

// Actualizamos una tarea via id
// api/tareas
router.put('/:idTarea',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio')
            .trim() 
            .not()
            .isEmpty()
            .escape()
    ],
    tareaController.actualizarTarea
);

// Eliminar un tarea via id
// api/tareas
router.delete('/:idTarea',
    auth,
    tareaController.eliminarProyecto
);

module.exports = router;