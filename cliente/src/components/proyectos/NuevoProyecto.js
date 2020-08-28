import React, { Fragment, useState } from 'react'


const NuevoProyecto = () => {

    // State para nuevo proyecto
    const [ proyecto, setProyecto ] = useState({
        nombre: '',
    });
    
    // extraer el nombre del proyecto
    const { nombre } = proyecto;

    // asignamos el valor del del useState
    const OnChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    // Enviarmos el proyecto
    const onSubmitProyecto = e => {
        // para que no se ejecute la accion por defecto
        e.preventDefault();

        // Validamos el proyecto

        // Agregar el state

        // Enviar el dato
    }

    return (
        <Fragment>
        <button
            type="button"
            className="btn btn-blocl btn-primario">
            Nuevo Proyecto
        </button>

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

        </Fragment>
    );
}

export default NuevoProyecto;