// importamos el modelo
const Tarea = require('../models/Tarea');
// importamos el modelo
const Proyecto = require('../models/Proyecto');
// controlamos la validación de express-validator
const { validationResult } = require('express-validator');

// Controlador para añadir un proyecto 
exports.crearTarea = async (req, res) => {
    // revisamos la validacion
    const errores = validationResult(req);

    // Controlamos si existen los errores
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    try {
        // Extraer el proyecto y controlar si existe
        const { proyecto } = req.body;

        // comprobamos que el proyecto exista
        const proyectoExistente = await Proyecto.findById(proyecto);
        if (!proyectoExistente) {
            res.status(404).json({
                ok: false,
                msg: 'Proyecto no encontrado'
            })
        }

        // Revisar si el proyecto actual pertenece al usuario autentificado
        if (proyectoExistente.creador.toString() !== req.usuario.id) {
            res.status(401).json({
                ok: false,
                msg: 'Usuario no autorizado'
            });
        }

        // Crear un nuevo proyecto
        const tarea = new Tarea(req.body);
        await tarea.save();
        // Devolvemos el resultado
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha surgido un error en el servidor'
        });
    }
}

// Obtener tareas por proyecto
exports.obtenerTareas = async (req, res) => {
    try {
        // console.log(req.body)
        // Extraer el proyecto y controlar si existe
        const { proyecto } = req.body;

        // comprobamos que el proyecto exista
        const proyectoExistente = await Proyecto.findById(proyecto);
        if (!proyectoExistente) {
            res.status(404).json({
                ok: false,
                msg: 'Proyecto no encontrado'
            })
        }

        // Revisar si el proyecto actual pertenece al usuario autentificado
        if (proyectoExistente.creador.toString() !== req.usuario.id) {
            res.status(401).json({
                ok: false,
                msg: 'Usuario no autorizado'
            });
        }

        // Obtenemos las tareas por proyecto
        const tareas = await Tarea.find({ proyecto: proyecto });

        res.json({ tareas });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha surgido un error en el servidor'
        });
    }
}

// Actualizamos las tareas
exports.actualizarTarea = async (req, res) => {
    try {
        // Extraer el proyecto y controlar si existe
        const { proyecto, nombre, estado } = req.body;

        // comprobar si la tarea existe
        let tarea = await Tarea.findById(req.params.idTarea);

        if (!tarea) {
            res.status(404).json({
                ok: false,
                msg: 'Tarea no encontrada'
            })
        }

        // comprobamos que el proyecto exista
        const proyectoExistente = await Proyecto.findById(proyecto);
        if (!proyectoExistente) {
            res.status(404).json({
                ok: false,
                msg: 'Proyecto no encontrado'
            })
        }

        // Revisar si el proyecto actual pertenece al usuario autentificado
        if (proyectoExistente.creador.toString() !== req.usuario.id) {
            res.status(401).json({
                ok: false,
                msg: 'Usuario no autorizado'
            });
        }

        // Crear un objeto con la nueva informacion
        const nuevaTarea = {};

        if (nombre) {
            nuevaTarea.nombre = nombre;
        }

        if (estado) {
            nuevaTarea.estado = estado;
        }

        // Guardar el proyecto
        tarea = await Tarea.findOneAndUpdate(
            { _id: req.params.idTarea },
            nuevaTarea,
            { new: true })

        res.status(200).json({ tarea })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha surgido un error en el servidor'
        });
    }
}

// Controlador para eliminar una tarea
exports.eliminarProyecto = async (req, res) => {
    try {
        // Extraer el proyecto y controlar si existe
        const { proyecto   } = req.body;

        // comprobar si la tarea existe
        let tarea = await Tarea.findById(req.params.idTarea);

        if (!tarea) {
            res.status(404).json({
                ok: false,
                msg: 'Tarea no encontrada'
            })
        }

        // comprobamos que el proyecto exista
        const proyectoExistente = await Proyecto.findById(proyecto);
        if (!proyectoExistente) {
            res.status(404).json({
                ok: false,
                msg: 'Proyecto no encontrado'
            })
        }

        // Revisar si el proyecto actual pertenece al usuario autentificado
        if (proyectoExistente.creador.toString() !== req.usuario.id) {
            res.status(401).json({
                ok: false,
                msg: 'Usuario no autorizado'
            });
        }

        // Eliminar la tarea
        await Tarea.findOneAndRemove( {_id: req.params.idTarea})

        // Devolvemos el mensaje de la eliminación
        res.status(200).json({
            ok: true,
            msg: "La tarea ha sido eliminada"
        })
         
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha surgido un error en el servidor'
        });
    }
}