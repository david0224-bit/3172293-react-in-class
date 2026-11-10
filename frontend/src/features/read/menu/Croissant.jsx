
import { Button } from "@/shared";
import { DetailItem } from "@/shared";
import Croissant from "@/assets/images/criossant.png";
import { useNavigate } from "react-router-dom";

export default function ReadUser() {
  const user = {
    userName: "Croissant de jamon y queso",
    userImage: Croissant,
    price: "$9.000",
    category: "Panadería",
    description:
      "Croissant horneado relleno de jamón y queso mozzarella.",
    status: "Disponible",
  };

   const navigate = useNavigate();

  return (
    <div className="flex-1 p-6 flex justify-center items-center">
      <div className="w-full max-w-6xl bg-gradient-to-b from-[var(--color-primary-800)] to-[var(--color-primary-200)] rounded-3xl shadow-lg p-8 relative">

        {/* Botón atrás */}
        <Button
            variant="back"
            size="back"
            type="button"
            onClick={() => navigate("/dashboard/productList")}
          >
            ← Atrás
          </Button>

        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-8 mt-8 border-b border-[var(--color-primary-950)] pb-3">
          <div className="text-4xl">
            🍽️
          </div>

          <h2 className="text-2xl font-bold uppercase text-[var(--color-primary-950)]">
            Visualizar platillo
          </h2>
        </div>

        {/* Contenido */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Panel izquierdo */}
          <div className="flex flex-col items-center">

            <div className="w-64 h-72 rounded-xl overflow-hidden border-4 border-white shadow-md">
              <img
                src={user.userImage}
                alt={user.userName}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-800">
              {user.userName}
            </h3>

            <div className="w-full border-b border-[var(--color-primary-950)] my-5" />

            <div className="flex items-center gap-3">
              <span className="font-semibold">
                Estado
              </span>

              <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                {user.status}
              </span>
            </div>

            <div className="flex justify-center mt-8">

                  <Button
                    variant="finish"
                    size="finish"
                    type="button"
                    onClick={() => navigate("/UpdateProduct")}
                  >
                    ✏ Editar menú
                  </Button>

                </div>

          </div>

          {/* Panel derecho */}
          <div className="bg-white rounded-2xl shadow-md p-8 grid">

            <DetailItem
              label="Nombre del platillo"
              value={user.userName}
            />

            <DetailItem
              label="Precio"
              value={user.price}
            />

            <DetailItem
              label="Categoría"
              value={user.category}
            />

            <DetailItem
              label="Descripción"
              value={user.description}
            />

          </div>

        </div>
      </div>
    </div>
  );
}

