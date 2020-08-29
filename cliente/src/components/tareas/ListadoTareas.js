import React, { Fragment, useContext } from 'react'
// Importamos el contextProyecto
import proyectoContext from '../../context/proyectos/proyectoContext';
// Importamos el contextTarea
import tareaContext from '../../context/tareas/tareaContext';

// Importamos los componentes personalizados
import Tarea from './Tarea';

const ListadoTareas = () => {

    // Obtenemos los useContext de la App
    const proyectosContext = useContext(proyectoContext);
    const tareasContext = useContext(tareaContext);
    // extraemos el formulario de proyectoContext
    const { proyecto, eliminarProyecto } = proyectosContext;
    const { tareasproyecto } = tareasContext;

    // Si no hay proyectos seleccionados
    if (!proyecto) return <h2>Selecciona un proyecto</h2>;

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // Eliminar el proyecto
    const onclickEliminar = () => {
        eliminarProyecto(proyectoActual.id);
    }

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {
                    tareasproyecto.length === 0
                        ?
                        (
                            <li className="tarea"> <p>No hay tareas</p> </li>
                        )
                        :
                        (
                            tareasproyecto.map((tarea, index) => (
                                <Tarea key={index} tarea={tarea} />
                            ))
                        )
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onclickEliminar}
            >
                Eliminar Proyecto &times;
            </button>
        </Fragment>
    );
}

export default ListadoTareas;