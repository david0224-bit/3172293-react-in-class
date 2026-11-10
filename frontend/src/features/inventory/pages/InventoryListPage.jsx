import { useEffect, useState } from "react";
import { DataTable, Button, ListReportModal } from "@/shared";
import { inventoryColumns } from "../table/InventoryColumns";
import { getAllInventory } from "../services/inventoryServices";
import { Link } from "react-router-dom";

const inventoryReportFields = [
  { key: "product_name", label: "Producto", default: true },
  { key: "product_id", label: "ID del producto", default: true },
  { key: "product_quantity", label: "Stock actual", default: true },
  { key: "product_price", label: "Precio", default: true },
  { key: "product_supplier_names", label: "Proveedor", default: true },
  { key: "product_entry_date", label: "Fecha de ingreso", default: true },
];

export default function InventoryListPage() {
  const [inventory, setInventory] = useState([]);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const data = await getAllInventory();
        setInventory(data);
      } catch (error) {
        console.error("Error al cargar el inventario:", error);
        setError(error.message || "Error al cargar el inventario");
      } finally {
        setLoading(false);
      }
    };

    loadInventory();
  }, []);

  return (
    <div className="p-6">
      <div
        className="
          rounded-2xl
          bg-white/80
          backdrop-blur-md
          shadow-lg
          p-6
          border border-white/40
        "
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Listado de inventario
          </h1>

          <div className="flex gap-4">
            <Button
              variant="secondary"
              onClick={() => setIsReportOpen(true)}
              disabled={loading || inventory.length === 0}
            >
              Generar reporte
            </Button>

            <Link to="/Createinventory">
              <Button variant="primary">
                Agregar producto
              </Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <p className="text-center py-6 text-gray-600">
            Cargando inventario...
          </p>
        ) : error ? (
          <p className="text-center py-6 text-red-600">
            {error}
          </p>
        ) : (
          <DataTable
            data={inventory}
            columns={inventoryColumns}
          />
        )}
      </div>

      <ListReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        title="inventario"
        data={inventory}
        fields={inventoryReportFields}
        filePrefix="inventory"
      />
    </div>
  );
}