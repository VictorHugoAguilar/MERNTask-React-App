import React, { useEffect, useContext } from 'react';
// importamos los context
import AuthContext from '../../context/autentificacion/authContext';

const Barra = () => {

    // extraer la informacion del context de autentificacion
    const authContext = useContext(AuthContext);
    // extraemos la funcion del authcontext
    const { usuario, fnUsuarioAutenticado, fnCerrarSession } = authContext;

    useEffect(() => {
        fnUsuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    const cerrarSesion = () => {
        fnCerrarSession();
    };

    return (
        <header className="app-header">
           { usuario && ( <p className="nombre-usuario">
                Hola, <span> {usuario.nombre} </span>
            </p>)
            }
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={cerrarSesion}
                    >Cerrar Sesión</button>
            </nav>
        </header>
    );
}

export default Barra;