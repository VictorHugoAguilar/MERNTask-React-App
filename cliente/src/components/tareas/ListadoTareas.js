import React, { Fragment, useContext } from 'react'
// Importamos el contextProyecto
import proyectoContext from '../../context/proyectos/proyectoContext';

// Importamos los componentes personalizados
import Tarea from './Tarea';

const ListadoTareas = () => {

    // Obtenemos el state del proyectos
    const proyectosContext = useContext(proyectoContext);
    // extraemos el formulario de proyectoContext
    const { proyecto } = proyectosContext;

    // Si no hay proyectos seleccionados
    if (!proyecto) return <h2>Selecciona un proyecto</h2>;

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    const tareasProyecto = [
        {
            nombre: 'Elegir Plataforma',
            estado: true
        }, {
            nombre: 'Elegir Colores',
            estado: false
        }, {
            nombre: 'Elegir Plataforma de pago',
            estado: false
        }, {
            nombre: 'Elegir Hosting',
            estado: false
        },
    ]

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {
                    tareasProyecto.length === 0
                        ?
                        (
                            <li className="tarea"> <p>No hay tareas</p> </li>
                        )
                        :
                        (
                            tareasProyecto.map((tarea, index) => (
                                <Tarea key={index} tarea={tarea} />
                            ))
                        )
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
            >
                Eliminar Proyecto &times;
            </button>
        </Fragment>
    );
}

export default ListadoTareas;