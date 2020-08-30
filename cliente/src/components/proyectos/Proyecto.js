import React, { useContext } from 'react';
// Importamos el contextProyecto
import ProyectoContext from '../../context/proyectos/proyectoContext';
// Importamos el contextTarea
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({ proyecto }) => {

    // Obtenemos el context de proyectos y tarea
    const proyectosContext = useContext(ProyectoContext);
    const tareasContext = useContext(tareaContext);
    // extraemos el formulario de proyectoContext
    const { proyectoActual } = proyectosContext;
    // extraemos las tareas del context
    const { fnObtenerTareas } = tareasContext;

    // Funcion para agregar el proyecto actual
    const selectProyecto = id => {
        proyectoActual(id); // fijar el proyecto actual
        fnObtenerTareas(id); // obtenemos las tareas asociadas al id
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => selectProyecto(proyecto.id) }
            >
                {proyecto.nombre}
            </button>
        </li>
    );

}

export default Proyecto;