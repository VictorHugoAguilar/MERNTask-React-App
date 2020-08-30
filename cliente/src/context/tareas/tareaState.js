import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
// Importamos los types
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    MODIFICAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

import {tareas} from './mockTareas';

import tareaContext from './tareaContext';
import tareaReducer from './tareaReducers';

const TareaState = props => {

    // Configurando el state inicial
    const initialState = {
        tareas: tareas, 
        tareasproyecto: null,
        errortarea: false, 
        tareaseleccionada: null
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
        tarea.id = uuidv4();
        // Insertamos la tarea al estate
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

    // Eliminar tarea
    const fnEliminarTarea = (id) => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }

    // Cambiando el estado de las tareas
    const fnCambioEstado = (tarea) => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }

    // Obtener la tarea actual
    const fnObtenerTarea = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    // Modificamos una tarea
    const fnModificarTarea = tarea => {
        dispatch({
            type: MODIFICAR_TAREA,
            payload: tarea
        })
    }

    // Eliminamos la tarea seleccionada
    const fnEliminaTareaSeleccionada = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <tareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                fnObtenerTareas: fnObtenerTareas,
                fnAgregarTarea: fnAgregarTarea,
                fnValidarTarea: fnValidarTarea,
                fnEliminarTarea: fnEliminarTarea,
                fnCambioEstado: fnCambioEstado,
                fnObtenerTarea: fnObtenerTarea,
                fnModificarTarea: fnModificarTarea,
                fnEliminaTareaSeleccionada: fnEliminaTareaSeleccionada
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}

export default TareaState;