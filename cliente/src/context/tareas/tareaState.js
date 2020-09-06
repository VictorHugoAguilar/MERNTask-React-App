import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';

// Importamos los types
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    MODIFICAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

import tareaContext from './tareaContext';
import tareaReducer from './tareaReducers';

const TareaState = props => {

    // Configurando el state inicial
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    // dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(tareaReducer, initialState);

    // FUNCIONES

    // Obtener las tareas de un poyecto
    const fnObtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get(`/api/tareas/`, { params: { proyecto } });
            const { tareas } = resultado.data;
            dispatch({
                type: TAREAS_PROYECTO,
                payload: tareas
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Agregar tarea al proyecto seleccionado
    const fnAgregarTarea = async tarea => {
        try {
           const resultado = await clienteAxios.post('/api/tareas', tarea);
            // Insertamos la tarea al estate
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            });
        } catch (error) {
            console.error(error);
        }
    }

    // Valida y muestra un error
    const fnValidarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        });
    }

    // Eliminar tarea
    const fnEliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`,{ params: { proyecto }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.error(error);
        }
    }

    // Obtener la tarea actual
    const fnObtenerTarea = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    // Modificamos una tarea
    const fnModificarTarea = async tarea => {
        try{
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: MODIFICAR_TAREA,
                payload: resultado.data.tarea
            })
        }catch(error){
            console.log(error)
        }
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
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                fnObtenerTareas: fnObtenerTareas,
                fnAgregarTarea: fnAgregarTarea,
                fnValidarTarea: fnValidarTarea,
                fnEliminarTarea: fnEliminarTarea,
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