import { useState, useEffect } from "react";
import { DataTable, Button, ListReportModal } from "@/shared";
import { suppliersColumns } from "../table/SuppliersColumns";
import { Link } from "react-router-dom";
import { getAllSuppliers } from "../services/supplierServices.js";

const suppliersReportFields = [
  { key: "id", label: "ID", default: true },
  { key: "supplier_name", label: "Nombre", default: true },
  { key: "supplier_document_number", label: "NIT", default: true },
  { key: "supplier_email", label: "Email", default: true },
  { key: "supplier_phone", label: "Teléfono", default: true },
  { key: "supplier_address", label: "Dirección", default: true },
  { key: "is_active", label: "Estado", default: true },
  { key: "created_at", label: "Fecha de registro", default: true },
];

export default function SupplierListPage() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const data = await getAllSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error("Error al cargar los proveedores:", error);
      }
    };

    loadSuppliers();
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
            Listado de proveedores
          </h1>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={() => setIsReportOpen(true)}
            >
              Generar reporte
            </Button>

            <Link to="/CreateSupplier">
              <Button variant="primary">
                Crear proveedor
              </Button>
            </Link>
          </div>
        </div>

        <DataTable
          data={suppliers}
          columns={suppliersColumns}
        />
      </div>

      <ListReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        title="proveedores"
        data={suppliers}
        fields={suppliersReportFields}
        filePrefix="suppliers"
      />
    </div>
  );
}