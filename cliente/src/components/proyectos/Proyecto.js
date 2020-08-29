import React, { useContext } from 'react';
// Importamos el contextProyecto
import proyectoContext from '../../context/proyectos/proyectoContext';

const Proyecto = ({ proyecto }) => {

    // Obtenemos el state del proyectos
    const proyectosContext = useContext(proyectoContext);
    // extraemos el formulario de proyectoContext
    const { proyectoActual } = proyectosContext;

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => proyectoActual(proyecto.id) }
            >
                {proyecto.nombre}
            </button>
        </li>
    );

}

export default Proyecto;