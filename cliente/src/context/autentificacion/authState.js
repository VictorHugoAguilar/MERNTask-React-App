import React, { useReducer } from 'react';
// importamos los context
import authContext from './authContext';
import authReducers from './authReducers';
// importamos cliente axios
import clienteAxios from '../../config/axios';

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

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                fnRegistrarUsuario: fnRegistrarUsuario
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;
