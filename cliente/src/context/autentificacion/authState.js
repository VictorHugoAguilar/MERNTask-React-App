import React, { useReducer } from 'react';

import authContext from './authContext';
import authReducers from './authReducers';

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
    }

    const [state, dispach] = useReducer(authReducers, initialState);

    // FUNCIONES

    return (
        <authContext.Provider
            value={{

            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;
