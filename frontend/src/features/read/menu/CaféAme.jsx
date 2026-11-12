
import { Button } from "@/shared";
import { DetailItem } from "@/shared";
import Café from "@/assets/images/cafe-americano.png";
import { useNavigate } from "react-router-dom";

export default function ReadUser() {
  const user = {
    userName: "Café americano",
    userImage: Café,
    price: "$3.500",
    category: "Bebidas calientes",
    description:
      "Café americano preparado con café de alta calidad, servido caliente y con un sabor intenso y agradable.",
    status: "Disponible",
  };

   const navigate = useNavigate();

  return (
    <div className="flex-1 p-6 flex justify-center items-center">
      <div className="w-full max-w-6xl bg-gradient-to-b from-form-from to-form-to rounded-3xl shadow-lg p-8 relative">

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
        <div className="flex items-center gap-3 mb-8 mt-8 border-b border-accent pb-3">
          <div className="text-4xl">
            🍽️
          </div>

          <h2 className="text-2xl font-bold uppercase text-accent">
            Visualizar platillo
          </h2>
        </div>

        {/* Contenido */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Panel izquierdo */}
          <div className="flex flex-col items-center">

            <div className="w-64 h-72 rounded-xl overflow-hidden border-4 border-panel shadow-md">
              <img
                src={user.userImage}
                alt={user.userName}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="mt-5 text-xl font-bold text-text-primary">
              {user.userName}
            </h3>

            <div className="w-full border-b border-accent my-5" />

            <div className="flex items-center gap-3">
              <span className="font-semibold">
                Estado
              </span>

              <span className="bg-accent text-on-accent px-4 py-1 rounded-full text-sm font-semibold">
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
          <div className="bg-panel rounded-2xl shadow-md p-8 grid">

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

