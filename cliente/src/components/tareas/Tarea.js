import React, { useContext } from 'react'
// Importamos el contextTarea
import tareaContext from '../../context/tareas/tareaContext';
// Importamos los componentes personalizados

const Tarea = ({ tarea }) => {
    // Obtener el context de tareas
    const tareasContext = useContext(tareaContext);
    // extraemos las tareas del context
    const { fnEliminarTarea, fnObtenerTareas, 
        fnObtenerTarea, fnCambioEstado } = tareasContext;

    // funcion que se ejecuta al presionar el boton de eliminar
    const eliminarTarea = (id) => {
        fnEliminarTarea(id);

        // refrescamos los datos en la pantalla
        fnObtenerTareas(tarea.proyectoId);
    }

    // funcion para cambiar el estado de la tarea
    const chageEstado = (tarea) => {
        tarea.estado = !tarea.estado;
        fnCambioEstado(tarea);
    }

    // Seleccionamos la tarea actual
    const seleccionarTarea = tarea => {
        fnObtenerTarea(tarea);
    }

    return (
        <li
            className="tarea sombra"
        >
            <p>{tarea.nombre}</p>
            <div className="estado">
                {
                    tarea.estado ?
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => chageEstado(tarea)}
                            >
                                Completo
                            </button>
                        )
                        :
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => chageEstado(tarea)}
                            >
                                Incompleto
                            </button>
                        )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={ () => seleccionarTarea(tarea)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => { eliminarTarea(tarea.id) }}
                >Eliminar</button>
            </div>
        </li>
    );
}

export default Tarea;