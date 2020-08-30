// importamos el modelo
const Usuario = require('../models/Usuario');
// importamos la dependencia para hashear el password
const bcryptjs = require('bcryptjs');
// controlamos la validación de express-validator
const {validationResult } = require('express-validator');
// importamos el JWT
const jwt = require('jsonwebtoken');
 
// Controlador para crear un usuario
exports.crearUsuario = async (req, res) => {

    // revisamos la validacion
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array()})
    }

    // extraer el mail y password
    const { email, password } = req.body;
    
    try {
        // revisamos si existe un usario con el mail
        let usuario = await Usuario.findOne({ email });

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            })
        }

        // crear  el nuevo usuario con los valores pasados
        usuario = new Usuario(req.body);

        // hashear el password
        const salt = await bcryptjs.genSalt(10);
        // reescribimos el password del usuario
        usuario.password = await bcryptjs.hash(password, salt);

        // guardamos el nuevo usuario
        await usuario.save();

        // Crear el payload del JWT
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

        // mensaje de confirmación
        /*
        res.status(200).json({
            ok: true,
            msg: 'El usuario se ha creado correctamente'
        })*/

    } catch (error) {
        error = {
            code: error.code,
            name: error.name,
            keyPattern: error.keyPattern,
            keyValue: error.keyValue
        }
        console.log(error);
        res.status(400).send(`Ha sucedido un error`);
    }
}