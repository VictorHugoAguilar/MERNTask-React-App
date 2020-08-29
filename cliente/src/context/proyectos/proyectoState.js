import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
// Importamos los types
import {    FORMULARIO_PROYECTO, 
            OBTENER_PROYECTOS, 
            AGREGAR_PROYECTO,
            VALIDAR_FORMULARIO,
            PROYECTO_ACTUAL 
} from '../../types';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducers';

const ProyectoState = props => {
    // mockeamos los proyectos
    const proyectos = [
        { id: 1, nombre: 'Tienda Virtual' },
        { id: 2, nombre: 'Intranet' },
        { id: 3, nombre: 'Diseño de sitio web' },
        { id: 4, nombre: 'Diseño de imagen' },
        { id: 5, nombre: 'Diseño de folletos' }
    ]

    // Configurando el state inicial
    const initialState = {
        formulario: false,
        proyectos: [],
        errorformulario : false,
        proyecto : null
    }

    // dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    // Serie de funciones para el CRUD 
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    // Obtener los proyectos
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    // Agregar nuevo proyecto
    const agregarProyecto = proyecto => {
        proyecto.id = uuidv4();

        // insertamos el proyecto en el state
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
    }

    // Validar el formulario
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // Obtener proyecto seleccionado
    const proyectoActual = ( proyectoId ) => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto : state.proyecto,
                obtenerProyectos: obtenerProyectos,
                mostrarFormulario: mostrarFormulario,
                agregarProyecto: agregarProyecto,
                mostrarError: mostrarError,
                proyectoActual: proyectoActual
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;