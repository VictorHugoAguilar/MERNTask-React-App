import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// importamos componentes 

const Login = () => {

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

        // Pasarlo al accion
    }

    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

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