import * as React from 'react';

// Importamos los componentes personaliados
import NuevoProyecto from '../proyectos/NuevoProyecto';
import ListadoProyectos from '../proyectos/ListadoProyectos';

const Sidebar = () => {

    return (
        <aside>
            <h1>MERN 
                <span>
                    Task
                </span>
            </h1>

            <NuevoProyecto />
            
            <div className="proyectos">
                <h2>Tus Proyectos</h2>
                <ListadoProyectos />
            </div>
        </aside>
    );
}

export default Sidebar;