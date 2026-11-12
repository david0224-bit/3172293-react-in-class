
import { useEffect, useState } from "react";
import { Button, DetailItem } from "@/shared";
import { useNavigate, useParams } from "react-router-dom";
import { getAllProducts } from "../services/productServices";

export default function ReadProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await getAllProducts();

        const foundProduct = products.find(
          (item) => Number(item.id) === Number(id)
        );

        if (!foundProduct) {
          setError("No se encontró el producto.");
          return;
        }

        setProduct(foundProduct);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setError(error.message || "Error al cargar el producto.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(Number(price || 0));
  };

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center p-6">
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-4 p-6">
        <p className="text-red-600">
          {error || "Producto no encontrado."}
        </p>

        <Button
          variant="back"
          size="back"
          type="button"
          onClick={() => navigate("/dashboard/productList")}
        >
          ← Atrás
        </Button>
      </div>
    );
  }

  const productImage =
    typeof product.product_image === "string" &&
    (product.product_image.startsWith("http") ||
      product.product_image.startsWith("data:image"))
      ? product.product_image
      : null;

  const status = product.activo ? "Disponible" : "No disponible";

  return (
    <div className="flex-1 p-6 flex justify-center items-center">
      <div className="w-full max-w-6xl bg-gradient-to-b from-form-from to-form-to rounded-3xl shadow-lg p-8 relative">

        <Button
          variant="back"
          size="back"
          type="button"
          onClick={() => navigate("/dashboard/productList")}
        >
          ← Atrás
        </Button>

        <div className="flex items-center gap-3 mb-8 mt-8 border-b border-accent pb-3">
          <div className="text-4xl">
            🍽️
          </div>

          <h2 className="text-2xl font-bold uppercase text-accent">
            Visualizar producto
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="flex flex-col items-center">

            <div className="w-64 h-72 rounded-xl overflow-hidden border-4 border-panel shadow-md bg-panel flex items-center justify-center">
              {productImage ? (
                <img
                  src={productImage}
                  alt={product.product_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-text-muted">
                  Sin imagen disponible
                </span>
              )}
            </div>

            <h3 className="mt-5 text-xl font-bold text-text-primary">
              {product.product_name}
            </h3>

            <div className="w-full border-b border-accent my-5" />

            <div className="flex items-center gap-3">
              <span className="font-semibold">
                Estado
              </span>

              <span
                className={`${
                  product.activo
                    ? "bg-accent"
                    : "bg-red-500"
                } text-on-accent px-4 py-1 rounded-full text-sm font-semibold`}
              >
                {status}
              </span>
            </div>

            <div className="flex justify-center mt-8">
              <Button
                variant="finish"
                size="finish"
                type="button"
                onClick={() => navigate(`/UpdateProduct/${product.id}`)}
              >
                Editar producto
              </Button>
            </div>

          </div>

          <div className="bg-panel rounded-2xl shadow-md p-8 grid">

            <DetailItem
              label="Nombre del producto"
              value={product.product_name}
            />

            <DetailItem
              label="Precio"
              value={formatPrice(product.product_price)}
            />

            <DetailItem
              label="Categoría"
              value={product.product_category}
            />

            <DetailItem
              label="Descripción"
              value={product.product_description || "Sin descripción"}
            />

            <DetailItem
              label="Código del producto"
              value={product.product_code}
            />

            <DetailItem
              label="Cantidad disponible"
              value={product.product_quantity}
            />

            <DetailItem
              label="Proveedor"
              value={product.product_supplier_names || "Sin proveedor"}
            />

          </div>

        </div>
      </div>
    </div>
  );
}
