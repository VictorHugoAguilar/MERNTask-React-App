import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// importamos los componentes personlizados
import Proyecto from './Proyecto';
// Importamos el context
import proyectoContext from '../../context/proyectos/proyectoContext';

const ListadoProyectos = () => {
    // obtenemos el state del formulario
    const proyectosContext = useContext(proyectoContext);
    // Extraemos los proyectos del estate inicial
    const { proyectos, obtenerProyectos } = proyectosContext;

    // Cargamos los proyectos en el momento de carga de los componentes
    useEffect(() => {
        obtenerProyectos();
        // eslint-disable-next-line
    }, [])

    // Controlamos si existen proyectos
    if (proyectos.length === 0) { return <p>No hay proyectos aún, comienza creando uno...</p>; }

    return (
        <ul className="listado-proyectos">
            <TransitionGroup>
                {proyectos?.map((proyecto) => (
                    <CSSTransition
                        key={proyecto.id}
                        timeout={200}
                        className="proyecto"
                    >
                        <Proyecto
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default ListadoProyectos;