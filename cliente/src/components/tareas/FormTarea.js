import React, { useContext } from 'react'
// Importamos el contextProyecto
import proyectoContext from '../../context/proyectos/proyectoContext';
// Importamos los componentes personalizados

const FormTarea = () => {
    // Obtenemos el state del proyectos activo
    const proyectosContext = useContext(proyectoContext);
    // extraemos el formulario de proyectoContext
    const { proyecto } = proyectosContext;
    // Si no hay proyectos seleccionados
    if (!proyecto) return null; 
    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;


    return (
        <div className="formulario">
            <form>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
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
        </div>

    );
}

export default FormTarea;