import React, { useReducer } from 'react';

import alertaContext from './alertaContext';
import alertaReducers from './alertaReducers';

// IMPORTAMOS LOS TYPES
import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../../types';

const AlertaState = props => {

    const initialState = {
        alerta: null
    }

    const [state, dispach] = useReducer(alertaReducers, initialState);

    // Funciones
    const fnMostrarAlerta = (msg, categoria) => {
        dispach({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });
        // despues de 5 segundos desaparece la alerta
        setTimeout(() => {
            dispach({
                type: OCULTAR_ALERTA
            })
        }, 5000)
    }

    return (
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                fnMostrarAlerta: fnMostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )

}

export default AlertaState;

