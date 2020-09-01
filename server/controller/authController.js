// importamos el modelo
const Usuario = require('../models/Usuario');
// importamos la dependencia para hashear el password
const bcryptjs = require('bcryptjs');
// controlamos la validación de express-validator
const { validationResult } = require('express-validator');
// importamos el JWT
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {

    // revisamos la validacion
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    // extraer el mail y password
    const { email, password } = req.body;

    try {
        // revisamos que el usuario este registrado
        let usuario = await Usuario.findOne({email});

        if(!usuario) {
            return res.status(400).json({ok: false, msg: 'El usuario no existe'});
        }

        // Revisamos el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);

        if(!passCorrecto){
            return res.status(400).json({ok: false, msg: 'El password no es correcto'});
        }

        // Si todo es correcto enviamos el JWT
        // Crear para payload del JWT
        const payload = {
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre
            }
        }

        // firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            // Mensaje de confirmacion
            res.json({token})
        });
        
    } catch (error) {
        return res.status(400).json({ok: false, msg: 'Ha ocurrido un error', error: error});
    }
}

// Controlador para obtener el usuario autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok: false, msg: 'Ha ocurrido un error', error: error});
    }
}