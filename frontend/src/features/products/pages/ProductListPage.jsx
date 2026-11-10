import { useEffect, useState } from "react";
import { DataTable, Button, ListReportModal } from "@/shared";
import { productColumns } from "../table/ProductColumns";
import { getAllProducts } from "../services/productServices";
import { Link } from "react-router-dom";

const productReportFields = [
  { key: "product_name", label: "Producto", default: true },
  { key: "product_price", label: "Precio", default: true },
  { key: "product_description", label: "Descripción", default: true },
  { key: "product_category", label: "Categoría", default: true },
];

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setError(error.message || "Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
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
            Listado de Productos
          </h1>

          <div className="flex gap-4">
            <Button
              variant="secondary"
              onClick={() => setIsReportOpen(true)}
              disabled={loading || products.length === 0}
            >
              Generar reporte
            </Button>

            <Link to="/CreateProduct">
              <Button variant="primary">
                Crear producto
              </Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <p className="text-center py-6 text-gray-600">
            Cargando productos...
          </p>
        ) : error ? (
          <p className="text-center py-6 text-red-600">
            {error}
          </p>
        ) : (
          <DataTable
            data={products}
            columns={productColumns}
          />
        )}
      </div>

      <ListReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        title="productos"
        data={products}
        fields={productReportFields}
        filePrefix="products"
      />
    </div>
  );
}