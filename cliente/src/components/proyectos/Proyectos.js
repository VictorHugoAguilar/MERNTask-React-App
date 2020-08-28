import React from 'react'
// importamos los componentes personalizados
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';

const Proyectos = () => {
    return (
        <div className="contenedor-app">
            <aside>
                <Sidebar />
            </aside>

            <div className="seccion-principal">
                <Barra />
                <main>
                    <div className="contenedor-tareas">

                    </div>
                </main>
            </div>

        </div>
    );
}

export default Proyectos;