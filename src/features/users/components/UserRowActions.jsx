// src/features/users/components/UserRowAction.jsx

// Iconos usados en los botones de acciones
import { Pencil, Trash2 } from "lucide-react";

// Hoook de reacr router para navegar programaticamente entre rutas
import { useNavigate } from "react-router-dom";

// Componente que renderiza las acciones de cada fila de usuario
// Recibe como prop el objeto a user
export default function UserRowAction ({ user }) {

    // const handleEdit = () => {
    //     console.log("Editar usuario", user.id);
    // };

    // Hook que permite redirigir a otra ruta desde codigo
    const navigate = useNavigate();

    // Accion para editar al usuario
    // Redirige la pagina de ediciion usando el id del usuario
    const handleEdit = () => {
        navigate(`/users/${user.id}/edit`);
    };

    // Acción para eliminar el usuario
    // Actualmente solo imprime en consola el id 
    // EN una aplicacion real aqui se llamaria a la API
    const handleDelete = () => {
        console.log("Eliminar usuario", user.id);
    };

    return (
        // Contenedor de los botones de acciones
        <div className="flex gap-2">

            {/* Boton editar */}
            <button
                onClick={handleEdit} // Ejecuta la navegacion a la pagina de edicion
                className="p-1 rounded hover:bg-gray-100"
            >
                <Pencil size={16} /> {/* Icono de editar */} 
            </button>
            
            {/* Boton eliminar */}
            <button
                onClick={handleDelete} // Ejecuta la navegacion a la pagina de edicion
                className="p-1 rounded hover:bg-gray-100"
            >
                <Trash2 size={16} /> {/* Icono de eliminar */} 
            </button>
        </div>
    );

}
