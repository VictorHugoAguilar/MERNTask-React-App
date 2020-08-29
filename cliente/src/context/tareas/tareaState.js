import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Importamos los types
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA
} from '../../types';

import {tareas} from './mockTareas';

import tareaContext from './tareaContext';
import tareaReducer from './tareaReducers';

const TareaState = props => {

    // Configurando el state inicial
    const initialState = {
        tareas: tareas, 
        tareasproyecto: null,
        errortarea: false
    }

    // dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(tareaReducer, initialState);

    // FUNCIONES

    // Obtener las tareas de un poyecto
    const fnObtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        });
    }

    // Agregar tarea al proyecto seleccionado
    const fnAgregarTarea = tarea => {
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        });
    }

    // Valida y muestra un error
    const fnValidarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        }) ;  
    }

    return (
        <tareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                fnObtenerTareas: fnObtenerTareas,
                fnAgregarTarea: fnAgregarTarea,
                fnValidarTarea: fnValidarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}

export default TareaState;