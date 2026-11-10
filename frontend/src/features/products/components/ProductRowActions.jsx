import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  showConfirmDeleteAlert,
  showCancelDeleteAlert,
  showSuccessAlert,
} from "@/shared/services/alertService";

export default function ProductRowActions({ product }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/UpdateProduct/${product.id}`);
  };

  const handleDelete = async () => {
    const result = await showConfirmDeleteAlert({
      title: "¿Eliminar producto?",
      text: `¿Estás seguro de eliminar el producto ${product.product_name}?`,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    });

    if (result.isConfirmed) {
      console.log("Eliminar producto", product.id);

      await showSuccessAlert({
        title: "Producto eliminado",
        text: "El producto se eliminó correctamente.",
        confirmButtonText: "Aceptar",
        timer: 3000,
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await showCancelDeleteAlert({
        title: "Eliminación cancelada",
        text: "El producto no fue eliminado.",
        confirmButtonText: "Aceptar",
        timer: 3000,
      });
    }
  };

  const handleView = () => {
    navigate(`/dashboard/productRead/${product.id}`);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleEdit}
        className="p-1 rounded hover:bg-gray-100"
      >
        <Pencil size={16} />
      </button>

      <button
        onClick={handleDelete}
        className="p-1 rounded hover:bg-gray-100"
      >
        <Trash2 size={16} />
      </button>

      <button
        onClick={handleView}
        className="p-1 rounded hover:bg-gray-100"
      >
        <Eye size={16} />
      </button>
    </div>
  );
}