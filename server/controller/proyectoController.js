// importamos el modelo
const Proyecto = require('../models/Proyecto');
// importamos el modelo
const Usuario = require('../models/Usuario');
// controlamos la validación de express-validator
const { validationResult } = require('express-validator');

// Controlador para añadir un proyecto 
exports.crearProyecto = async (req, res) => {
    // revisamos la validacion
    const errores = validationResult(req);

    // Controlamos si existen los errores
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    try {
        // Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        // Obtenermos el creador
        proyecto.creador = req.usuario.id;

        // Guardamos el proyecto
        proyecto.save();

        // Devolvemos el resultado
        res.json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha surgido un error en el servidor'
        })
    }
}

// Controlador para obtner todos los proyectos del usuario logueado
exports.obtenerProyectos = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const proyectos = await Proyecto.find({ creador: usuarioId }).sort({ creado: -1 })
        res.status(200).json({ proyectos: proyectos })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha surgido un error en el servidor'
        })
    }
}

// Controlador para actualizar un proyecto
exports.actualizarProyecto = async (req, res) => {
    // revisamos la validacion
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    // extraer la informacion del proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};

    // Verificamos si se ha puesto un nombre y asignamos
    if (nombre) {
        nuevoProyecto.nombre = nombre;
    }

    try {
        // revisar el id
        let proyecto = await Proyecto.findById(req.params.id);

        // revisar el proyecto
        if (!proyecto) {
            res.status(404).json({
                ok: false,
                msg: 'Proyecto no encontrado'
            });
        }

        // verificar el creador
        if (proyecto.creador.toString() !== req.usuario.id) {
            res.status(401).json({
                ok: false,
                msg: 'Usuario no autorizado'
            })
        }

        // guardamos el proyecto actualizado
        proyecto = await Proyecto.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: nuevoProyecto },
            { new: true }
        );

        // Devolvemos el mensaje de resultado
        res.status(200).json({ proyecto });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha surgido un error en el servidor'
        });
    }
}

// Controlador para eliminar un proyecto
exports.eliminarProyecto = async (req, res) => {
    // Obtener el proyecto
    try {
        // revisar el id
        let proyecto = await Proyecto.findById(req.params.id);

        // revisar el proyecto
        if (!proyecto) {
            res.status(404).json({
                ok: false,
                msg: 'Proyecto no encontrado'
            });
        }

        // verificar el creador
        if (proyecto.creador.toString() !== req.usuario.id) {
            res.status(401).json({
                ok: false,
                msg: 'Usuario no autorizado'
            });
        }

        // Eliminamos el proyecto
        await Proyecto.findOneAndRemove({ _id: req.params.id });

        // Devolvemos el mensaje de resultado
        res.json({ ok: true, msg: 'Proyecto eliminado' });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha surgido un error en el servidor'
        });
    }
}