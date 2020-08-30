// importamos el modelo
const Proyecto = require('../models/Proyecto');
// controlamos la validación de express-validator
const { validationResult } = require('express-validator');

// Controlador para añadir un proyecto 
exports.crearProyecto = async (req, res) => {
    // revisamos la validacion
    const errores = validationResult(req);
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
        const proyectos = await Proyecto.find({ creador: usuarioId }).sort({ creado: -1})
        res.status(200).json({ proyectos: proyectos})
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
    
}