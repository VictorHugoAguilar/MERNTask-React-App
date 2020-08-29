import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Importamos los types
import {

} from '../../types';

import TareaContext from './tareaContext';
import TareaReducer from './tareaReducers';

const TareaState = props => {

    // Configurando el state inicial
    const initialState = {
        tareas: []
    }

    // dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(TareaReducer, initialState)



    return (
        <TareaContext.Provider
            value={{

            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;