import { Button } from "@/shared"
import { DetailItem } from "@/shared";
import { products } from "@/features/products/data/products";
import Pizza from "@/assets/images/pizza2.png";
import { useNavigate } from "react-router-dom";

export default function ReadMenu() {
  const menu = {
    menuName: "Combo Pizza Flavor",
    menuImage: Pizza,
    menuDescription:
      "Disfruta de un delicioso combo preparado con productos frescos y de excelente calidad.",
    menuPrice: "$28.000",
    menuCategory: "Combos",
    menuStatus: "Activo",
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <div className="flex-1 p-6 flex justify-center items-center">

        <div className="w-full max-w-7xl bg-gradient-to-b from-form-from to-form-to rounded-3xl shadow-lg p-8 relative">

          <Button
            variant="back"
            size="back"
            type="button"
            onClick={() => navigate("/HomePage")}
          >
            ← Atrás
          </Button>

          <div className="flex items-center gap-3 mt-8 mb-8 border-b border-accent pb-3">

            <div className="text-4xl">
              🍽️
            </div>

            <h2 className="text-2xl font-bold uppercase text-accent">
              Información del Menú
            </h2>

          </div>

          <div className="grid lg:grid-cols-2 gap-10">

            <div>

              <h3 className="text-lg font-bold text-center mb-6">
                Productos del menú
              </h3>

              <div className="grid grid-cols-2 gap-5">

                {products.map((product) => (

                  <div
                    key={product.id}
                    className="bg-panel rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
                  >

                    <div className="h-40 bg-field flex items-center justify-center">

                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-32 h-32 object-contain"
                      />

                    </div>

                    <div className="p-4">

                      <h4 className="font-bold text-center text-text-primary">
                        {product.title}
                      </h4>

                      <p className="text-center text-sm text-text-muted mt-1">
                        {product.category}
                      </p>

                      <p className="text-center text-lg font-bold text-accent mt-2">
                        ${product.price.toLocaleString()}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-panel rounded-3xl shadow-lg overflow-hidden">

              <div className="flex justify-center bg-field p-6">

                <img
                  src={menu.menuImage}
                  alt={menu.menuName}
                  className="w-72 h-56 object-contain"
                />

              </div>

              <div className="p-8">

                <h2 className="text-3xl font-bold text-center text-text-primary">
                  {menu.menuName}
                </h2>

                <p className="text-center text-text-secondary mt-4 leading-relaxed">
                  {menu.menuDescription}
                </p>

                <div className="my-6 border-b" />

                <DetailItem
                  label="Categoría"
                  value={menu.menuCategory}
                />

                <DetailItem
                  label="Precio"
                  value={menu.menuPrice}
                />

                <div className="flex items-center justify-between py-3 border-b">

                  <span className="font-semibold">
                    Estado
                  </span>

                  <span className="bg-accent text-on-accent px-4 py-1 rounded-full text-sm font-semibold">
                    {menu.menuStatus}
                  </span>

                </div>

                <div className="flex justify-center gap-8 mt-8 text-4xl">

                  <div title="Comidas">
                    🍽️
                  </div>

                  <div title="Postres">
                    🍨
                  </div>

                  <div title="Promoción">
                    🏷️
                  </div>

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

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

