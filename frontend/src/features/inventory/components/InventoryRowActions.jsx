
import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  showConfirmDeleteAlert,
  showCancelDeleteAlert,
  showSuccessAlert,
} from "@/shared/services/alertService";

export default function InventoryRowActions({ item }) {
  const navigate = useNavigate();

  const handleEdit = () => {
  navigate(`/UpdateInventory/${item.id}`);
  };

  const handleRead = () => {
    navigate(`/dashboard/inventoryRead/${item.id}`);
  };

  const handleDelete = async () => {
    const result = await showConfirmDeleteAlert({
      title: "¿Eliminar registro?",
      text: `¿Estás seguro de eliminar el registro de inventario ${item.id}?`,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    });

    if (result.isConfirmed) {
      console.log("Eliminar registro de inventario", item.id);

      await showSuccessAlert({
        title: "Registro eliminado",
        text: "El registro de inventario se eliminó correctamente.",
        confirmButtonText: "Aceptar",
        timer: 3000,
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await showCancelDeleteAlert({
        title: "Eliminación cancelada",
        text: "El registro de inventario no fue eliminado.",
        confirmButtonText: "Aceptar",
        timer: 3000,
      });
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleRead}
        className="p-1 rounded hover:bg-gray-100"
      >
        <Eye size={16} />
      </button>

      <button
        onClick={handleEdit}
        className="btn btn-primary"
      >
        <Pencil size={16} />
      </button>

      <button
        onClick={handleDelete}
        className="p-1 rounded hover:bg-gray-100"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
