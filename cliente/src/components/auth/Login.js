import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Importamos los context personalizados
import AlertaContext from '../../context/alertas/alertaContext';
// Importamos el context de Auth
import AuthContext from '../../context/autentificacion/authContext';


const Login = (props) => {

    // extraemos las alertas del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, fnMostrarAlerta } = alertaContext;

    // extraemos la auth del context
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, fnInicioSesion } = authContext;

    // En caso que el usuario este registrado o es duplicado
    useEffect(() => {
        if (autenticado) {
            props.history.push('/proyectos');
        }

        if (mensaje) {
            fnMostrarAlerta(mensaje.msg, mensaje.categoria);
        }
    // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    // State para iniciar session
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    })

    // extraer el usuario
    const { email, password } = usuario;

    const onChange = (e) => {
        // seteamos el useState
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    // Llamamos al onSubmit 
    const onSubmit = (e) => {
        // para que no refresque inmediatamente
        e.preventDefault();

        // Validar los datos
        if (email.trim() === '' || password.trim() === '') {
            fnMostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        // Pasarlo al accion
        fnInicioSesion({ email, password });
    }

    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                {alerta && (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>)}
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            onChange={onChange}
                            value={email}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            onChange={onChange}
                            value={password}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Inciar Sesión" />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta"> Obtener cuenta</Link>
            </div>
        </div>
    );
}

export default Login;