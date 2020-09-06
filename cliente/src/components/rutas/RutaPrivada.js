import React, { useContext, useEffect, Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autentificacion/authContext';

/**
 * Con Este componente de HighComponent logramos que pase primero 
 * por este componente y este será el que rediriga si el usuario
 * esta autenticado a un componente en concreto o si lo envia al
 * componente inicial.
 * @param {Componente, props} param0 
 */
const RutaPrivada = ({ component: Component, ...props }) => {

    const authContext = useContext(AuthContext);
    const { autenticado, cargando, fnUsuarioAutenticado } = authContext;

    useEffect(() => {
        fnUsuarioAutenticado();
        // eslint-disable-next-line
    }, [])

    return (
        <Route
            {...props}
            render={props => !autenticado && !cargando ?
                (
                    <Redirect to="/" />
                ) :
                (
                    <Component {...props} />
                )
            }
        />
    );
}

export default RutaPrivada;