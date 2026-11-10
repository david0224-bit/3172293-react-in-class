
import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared";
import Swal from "sweetalert2";
import {
  showConfirmDeleteAlert,
  showCancelDeleteAlert,
  showSuccessAlert,
} from "@/shared/services/alertService";

export default function OrderRowActions({ order }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/UpdateOrder/${order.id}`);
};

  const handleDelete = async () => {
    const result = await showConfirmDeleteAlert({
      title: "¿Eliminar orden?",
      text: `¿Estás seguro de eliminar la orden ${order.id}?`,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    });

    if (result.isConfirmed) {
      console.log("Eliminar orden", order.id);

      await showSuccessAlert({
        title: "Orden eliminada",
        text: "La orden se eliminó correctamente.",
        confirmButtonText: "Aceptar",
        timer: 3000,
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await showCancelDeleteAlert({
        title: "Eliminación cancelada",
        text: "La orden no fue eliminada.",
        confirmButtonText: "Aceptar",
        timer: 3000,
      });
    }
  };

  const handleView = () => {
  navigate(`/dashboard/orderRead/${order.id}`);
};

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="icon"
        onClick={handleEdit}
        title="Actualizar orden"
      >
        <Pencil size={16} />
      </Button>

      <Button
        type="button"
        variant="icon"
        onClick={handleDelete}
        title="Eliminar orden"
      >
        <Trash2 size={16} />
      </Button>

      <Button
        type="button"
        variant="icon"
        onClick={handleView}
        title="Ver orden"
      >
        <Eye size={16} />
      </Button>
    </div>
  );
}
