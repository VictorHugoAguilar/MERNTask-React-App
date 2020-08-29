import React, { Fragment, useState, useContext } from 'react'
// Importamos el contextProyecto
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    // Obtenemos el state del formulario
    const proyectosContext = useContext(proyectoContext);
    // extraemos el formulario de proyectoContext
    const { formulario, mostrarFormulario, agregarProyecto } = proyectosContext;

    // State para nuevo proyecto
    const [proyecto, setProyecto] = useState({
        nombre: '',
    });

    // extraer el nombre del proyecto
    const { nombre } = proyecto;

    // asignamos el valor del del useState
    const OnChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    // Enviarmos el proyecto
    const onSubmitProyecto = e => {
        // para que no se ejecute la accion por defecto
        e.preventDefault();

        // Validamos el proyecto
        if( !nombre ) return;
        
        // Agregar el state
        agregarProyecto(proyecto)
        
        // Enviar el dato
    }

    // Mostrar el formulario nuevo proyecto
    const onClickFormulario = () => { mostrarFormulario() }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-blocl btn-primario"
                onClick={onClickFormulario}
            >
                Nuevo Proyecto
        </button>
            {
                formulario ?
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitProyecto}
                        >
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Nombre del proyecto"
                                name="nombre"
                                value={nombre}
                                onChange={OnChangeProyecto}
                            />

                            <input
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Proyecto"
                            />
                        </form>
                    )
                    :
                    (
                        null
                    )
            }

        </Fragment>
    );
}

export default NuevoProyecto;