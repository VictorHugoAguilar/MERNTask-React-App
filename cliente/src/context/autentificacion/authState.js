import React, { useReducer } from 'react';
// importamos los context
import authContext from './authContext';
import authReducers from './authReducers';
// importamos cliente axios
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

// IMPORTAMOS LOS TYPES
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
    }

    const [state, dispach] = useReducer(authReducers, initialState);

    // FUNCIONES

    // Registro de usuario
    const fnRegistrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            // console.log(respuesta);
            dispach({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            // Obtener el usuario registrado
            fnUsuarioAutenticado();
        } catch (error) {
            console.log(error.response.data.msg);

            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispach({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    // Retorna el usuario autenticado
    const fnUsuarioAutenticado = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            // Funcion para enviar el token por header
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            // console.log(respuesta);
            dispach({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
        } catch (error) {
            dispach({
                type: LOGIN_ERROR
            })
        }
    }

    // login de usuario
    const fnInicioSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);

            dispach({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })

            // Obtener el usuario autenticado
            fnUsuarioAutenticado();
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispach({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    // cerrar la sesion del usuario
    const fnCerrarSession = () => {
        dispach({
            type: CERRAR_SESION
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                fnRegistrarUsuario: fnRegistrarUsuario,
                fnInicioSesion: fnInicioSesion,
                fnUsuarioAutenticado: fnUsuarioAutenticado,
                fnCerrarSession: fnCerrarSession
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;
