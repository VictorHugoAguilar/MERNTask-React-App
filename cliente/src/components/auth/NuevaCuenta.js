import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// importamos componentes 

const NuevaCuenta = () => {

    // State para iniciar session
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    // extraer el usuario
    const { nombre, email, password, confirmar } = usuario;

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

        // Validar los datos vacios

        // Password minimo 6 caracteres

        // Confirmar debe ser igual que password

        // Pasarlo al accion
    }

    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una Cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Escribe tu nombre"
                            onChange={onChange}
                            value={nombre}
                        />
                    </div>

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
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            onChange={onChange}
                            value={password}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repíte tu password"
                            onChange={onChange}
                            value={confirmar}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrar" />
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Volver a inicio de sessión
                </Link>

            </div>
        </div>
    );
}

export default NuevaCuenta;