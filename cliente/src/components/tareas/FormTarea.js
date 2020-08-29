import React, { useContext, useState } from 'react'
// Importamos el contextProyecto
import proyectoContext from '../../context/proyectos/proyectoContext';
// Importamos los componentes personalizados
// Importamos el contextTarea
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
    // Obtenemos el state del proyectos activo
    const proyectosContext = useContext(proyectoContext);
    // extraemos el formulario de proyectoContext
    const tareasContext = useContext(tareaContext);
    // extraemos las tareas del context
    const { errortarea, fnAgregarTarea, fnValidarTarea, fnObtenerTareas } = tareasContext;
    // extraemos los proyectos del context
    const { proyecto } = proyectosContext;

    // State del formulario
    const [tarea, setTarea] = useState({
        nombre: '',
    });

    // extraemos los valores del state
    const { nombre } = tarea;

    // Si no hay proyectos seleccionados
    if (!proyecto) return null;
    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // leer los valores del formulario
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name ] : e.target.value
        })
    }

    // Para añadir la tarea 
    const onSubmitTarea = (e) => {
        e.preventDefault();
        // Validamos
        if(!nombre || nombre.trim() === ''){
            fnValidarTarea();
            return;
        }
        // Pasar la validacion

        // agregar la nueva tarea al state
        tarea.proyectoId = proyectoActual.id;
        tarea.estado = false;
        fnAgregarTarea(tarea);

        // Obtener las tareas
        fnObtenerTareas(proyectoActual.id);

        // reiniciar el form
        setTarea({
            nombre: ''
        })
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmitTarea}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value = {nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value="Agregar Tarea"
                    />

                </div>
            </form>
            {
                errortarea && <p className="mensaje error">El nombre de la tarea es obligatorio</p>
            }
        </div>

    );
}

export default FormTarea;