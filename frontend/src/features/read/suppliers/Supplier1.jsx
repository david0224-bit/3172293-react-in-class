import { Button } from "@/shared";
import Postobon from "@/assets/images/suppliers/postobon.png";
import { useNavigate } from "react-router-dom";

export default function ReadSupplier() {
  const supplier = {
    companyName: "Postobon",
    supplierImage: Postobon,
    documentType: "NIT",
    documentNumber: "860002503",
    supplierEmail: "postobonExpss@email.com",
    supplierPhone: "+57 311 123 5678",
    supplierAddress: "Diagonal 25a DB",
    productTypes: ["Bebidas", "Utencilios"],
    status: "Activo",
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <div className="flex-1 p-6 flex justify-center items-center">
        <div className="w-full max-w-6xl bg-gradient-to-b from-[var(--color-primary-800)] to-[var(--color-primary-200)] rounded-3xl shadow-lg p-8 relative">

          {/* Botón atrás */}
          <Button
            variant="back"
            size="back"
            type="button"
            onClick={() => navigate("/dashboard/supplierList")}
          >
            ← Atrás
          </Button>

          {/* Encabezado */}
          <div className="flex items-center gap-3 mb-8 mt-8 border-b border-[var(--color-primary-950)] pb-3">
            <div className="text-4xl">🏢</div>

            <h2 className="text-2xl font-bold uppercase text-[var(--color-primary-950)]">
              Perfil de Proveedor
            </h2>
          </div>

          {/* Contenido */}
          <div className="grid md:grid-cols-2 gap-10">

            {/* Panel izquierdo */}
            <div className="flex flex-col items-center">

              <div className="w-64 h-72 rounded-xl overflow-hidden border-4 border-white shadow-md bg-white">
                <img
                  src={supplier.supplierImage}
                  alt={supplier.companyName}
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-800">
                {supplier.companyName}
              </h3>

              <div className="w-full border-b border-[var(--color-primary-950)] my-5"></div>

              <div className="flex items-center gap-3">
                <span className="font-semibold">Estado</span>

                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  {supplier.status}
                </span>
              </div>

              <div className="flex justify-center mt-8">

                  <Button
                    variant="finish"
                    size="finish"
                    type="button"
                    onClick={() => navigate("/UpdateSupplier")}
                  >
                    ✏ Editar
                  </Button>

                </div>

            </div>

            {/* Panel derecho */}
            <div className="flex flex-col gap-6">

              {/* Información */}
              <div className="rounded-2xl shadow-md p-8 bg-white">

                <div className="grid grid-cols-[220px_1fr] gap-y-5 text-gray-900">

                  <span className="font-medium">Tipo de documento:</span>
                  <span>{supplier.documentType}</span>

                  <span className="font-medium">Número de documento:</span>
                  <span>{supplier.documentNumber}</span>

                  <span className="font-medium">Nombre:</span>
                  <span>{supplier.companyName}</span>

                  <span className="font-medium">Dirección:</span>
                  <span>{supplier.supplierAddress}</span>

                  <span className="font-medium">Teléfono:</span>
                  <span>{supplier.supplierPhone}</span>

                  <span className="font-medium">Correo:</span>
                  <span>{supplier.supplierEmail}</span>

                </div>

              </div>

              {/* Productos */}
              <div className="rounded-2xl shadow-md p-6 bg-white">

                <h3 className="text-center text-2xl font-medium mb-6">
                  Productos que suministra
                </h3>

                <div className="flex justify-center gap-6 flex-wrap">

                  {supplier.productTypes.map((product) => (
                    <span
                      key={product}
                      className="px-6 py-2 rounded-full bg-yellow-100 border border-gray-600 text-sm font-medium"
                    >
                      {product}
                    </span>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}