import React from 'react';
// importamos los componentes personlizados
import Proyecto from './Proyecto';

const ListadoProyectos = () => {

    const proyectos = [
        {nombre: 'Tienda Virtual'}, 
        {nombre: 'Intranet'},
        {nombre: 'Diseño de sitio web'}
    ]

    return (
        <ul className="listado-proyectos">
            {proyectos.map( (proyecto, index) => (
                <Proyecto proyecto={proyecto} key={index} />
                ))}
        </ul>
    );
}

export default ListadoProyectos;