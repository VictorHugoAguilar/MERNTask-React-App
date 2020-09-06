import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// importamos los componentes personlizados
import Proyecto from './Proyecto';
// Importamos el context
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {
    // obtenemos el state del formulario
    const proyectosContext = useContext(proyectoContext);
    // Extraemos los proyectos del estate inicial
    const { proyectos, mensaje, obtenerProyectos } = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta, fnMostrarAlerta } = alertaContext;

    // Cargamos los proyectos en el momento de carga de los componentes
    useEffect(() => {
        // comprobamos si salta una alerta
        if(mensaje){
            fnMostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje])

    // Controlamos si existen proyectos
    if (proyectos.length === 0) { return <p>No hay proyectos aún, comienza creando uno...</p>; }

    return (
        <ul className="listado-proyectos">

            {
                alerta && ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> )
            }
            <TransitionGroup>
                {proyectos?.map((proyecto) => (
                    <CSSTransition
                        key={proyecto._id}
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