
import { useEffect, useState } from "react";
import { DataTable, Button, ListReportModal } from "@/shared";
import { orderColumns } from "../table/OrderColumns";
import { Link } from "react-router-dom";
import { getAllOrders } from "../services/orderServices.js";

const orderReportFields = [
  { key: "id", label: "ID", default: true },
  { key: "table_number", label: "Mesa", default: true },
  { key: "waiter_id", label: "Mesero", default: true },
  { key: "status", label: "Estado", default: true },
  { key: "observations", label: "Observaciones", default: true },
  { key: "dishes", label: "Productos", default: true },
];

export default function OrderListPage() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error al cargar las órdenes:", error);
      }
    };

    loadOrders();
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
            Listado de órdenes
          </h1>

          <div className="flex items-center gap-3">

            <Button
              variant="secondary"
              onClick={() => setIsReportOpen(true)}
            >
              Generar reporte
            </Button>

            <Link to="/CreateOrder">
              <Button variant="primary">
                Crear orden
              </Button>
            </Link>

          </div>
        </div>

        <DataTable
          data={orders}
          columns={orderColumns}
        />

      </div>

      <ListReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        title="órdenes"
        data={orders}
        fields={orderReportFields}
        filePrefix="orders"
      />

    </div>
  );
}
