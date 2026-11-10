import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  showConfirmDeleteAlert,
  showCancelDeleteAlert,
  showSuccessAlert,
} from "@/shared";

export default function UserRowActions({ user }) {

  const navigate = useNavigate();

  // Editar usuario
  const handleEdit = () => {
    navigate(`/UpdateUser/${user.id}`);
  };

  // Eliminar usuario
  const handleDelete = async () => {

    const result = await showConfirmDeleteAlert({
      title: "¿Eliminar usuario?",
      text: `¿Estás seguro de eliminar al usuario ${user.user_name}?`,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    });

    if (result.isConfirmed) {

      console.log("Eliminar usuario", user.id);

      await showSuccessAlert({
        title: "Usuario eliminado",
        text: "El usuario se eliminó correctamente.",
        confirmButtonText: "Aceptar",
      });

    } else if (result.dismiss === Swal.DismissReason.cancel) {

      await showCancelDeleteAlert({
        title: "Eliminación cancelada",
        text: "El usuario no fue eliminado.",
        confirmButtonText: "Aceptar",
      });

    }
  };

  // Ver usuario
  const handleView = () => {
    navigate(`/dashboard/userRead/${user.id}`);
  };

  return (
    <div className="flex gap-2">

      {/* Editar */}
      <button
        onClick={handleEdit}
        className="p-1 rounded hover:bg-gray-100"
      >
        <Pencil size={16} />
      </button>

      {/* Eliminar */}
      <button
        onClick={handleDelete}
        className="p-1 rounded hover:bg-gray-100"
      >
        <Trash2 size={16} />
      </button>

      {/* Ver */}
      <button
        onClick={handleView}
        className="p-1 rounded hover:bg-gray-100"
      >
        <Eye size={16} />
      </button>

    </div>
  );
}