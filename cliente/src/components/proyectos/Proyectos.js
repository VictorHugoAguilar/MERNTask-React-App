import React, { useContext , useEffect} from 'react'
// importamos los componentes personalizados
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';
// importamos los context
import AuthContext from '../../context/autentificacion/authContext';

const Proyectos = () => {
    // extraer la informacion del context de autentificacion
    const authContext = useContext(AuthContext);
    // extraemos la funcion del authcontext
    const {fnUsuarioAutenticado} = authContext;

    useEffect(() => {
        fnUsuarioAutenticado();
    }, [])

    return (
        <div className="contenedor-app">
            <aside>
                <Sidebar />
            </aside>

            <div className="seccion-principal">
                <Barra />
                <main>
                    <FormTarea />
                    <div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>
                </main>
            </div>

        </div>
    );
}

export default Proyectos;