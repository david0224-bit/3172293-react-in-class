import { Button } from "@/shared";
import Colombina from "@/assets/images/suppliers/colombina.png";
import { useNavigate } from "react-router-dom";

export default function ReadSupplier() {
  const supplier = {
    companyName: "Colombina",
    supplierImage: Colombina,
    documentType: "NIT",
    documentNumber: "890300186",
    supplierEmail: "nestleExpss@email.com",
    supplierPhone: "+57 311 123 5678",
    supplierAddress: "Diagonal 25a DB",
    productTypes: ["Dulces", "helados"],
    status: "Activo",
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <div className="flex-1 p-6 flex justify-center items-center">
        <div className="w-full max-w-6xl bg-gradient-to-b from-form-from to-form-to rounded-3xl shadow-lg p-8 relative">

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
          <div className="flex items-center gap-3 mb-8 mt-8 border-b border-accent pb-3">
            <div className="text-4xl">🏢</div>

            <h2 className="text-2xl font-bold uppercase text-accent">
              Perfil de Proveedor
            </h2>
          </div>

          {/* Contenido */}
          <div className="grid md:grid-cols-2 gap-10">

            {/* Panel izquierdo */}
            <div className="flex flex-col items-center">

              <div className="w-64 h-72 rounded-xl overflow-hidden border-4 border-panel shadow-md bg-panel">
                <img
                  src={supplier.supplierImage}
                  alt={supplier.companyName}
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="mt-5 text-xl font-bold text-text-primary">
                {supplier.companyName}
              </h3>

              <div className="w-full border-b border-accent my-5"></div>

              <div className="flex items-center gap-3">
                <span className="font-semibold">Estado</span>

                <span className="bg-accent text-on-accent px-4 py-1 rounded-full text-sm font-semibold">
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
              <div className="bg-panel rounded-2xl shadow-md p-8">

                <div className="grid grid-cols-[220px_1fr] gap-y-5 text-text-primary">

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
              <div className="bg-panel rounded-2xl shadow-md p-6">

                <h3 className="text-center text-2xl font-medium mb-6">
                  Productos que suministra
                </h3>

                <div className="flex justify-center gap-6 flex-wrap">

                  {supplier.productTypes.map((product) => (
                    <span
                      key={product}
                      className="px-6 py-2 rounded-full bg-warning-soft border border-border-strong text-sm font-medium"
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