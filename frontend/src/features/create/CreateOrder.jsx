import { useState, useEffect } from "react";
import { Select, Button } from "@/shared";
import { getOrderTables } from "@/services/selectOrderService";
import { getOrderUsers } from "@/services/selectUserService";
import { getOrderProducts } from "@/services/selectOrderProductService";
import { createOrder } from "@/features/order/services/orderServices";
import Navbar from "@/shared/layouts/Navbar";
import { useNavigate } from "react-router-dom";
import backgroundImage from "@/assets/images/restaurant.jpg";
import {
  showSuccessAlert,
  showUserErrorAlert,
} from "@/shared/services/alertService";

export default function CreateOrder() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [tables, setTables] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    tableNumber: "",
    waiter: "",
    dishes: [
      {
        productId: "",
        quantity: 1,
      },
    ],
    observations: "",
    status: "Abierta",
  });

  useEffect(() => {
    getOrderTables().then(setTables);
  }, []);

  useEffect(() => {
    getOrderUsers().then(setUsers);
  }, []);

  useEffect(() => {
  const loadProducts = async () => {
    try {
      const data = await getOrderProducts();
      console.log("Productos recibidos:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  loadProducts();
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDishChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedDishes = [...prev.dishes];

      updatedDishes[index] = {
        ...updatedDishes[index],
        [field]: value,
      };

      return {
        ...prev,
        dishes: updatedDishes,
      };
    });
  };

  const addDish = () => {
    setFormData((prev) => ({
      ...prev,
      dishes: [
        ...prev.dishes,
        {
          productId: "",
          quantity: 1,
        },
      ],
    }));
  };

  const removeDish = (index) => {
    setFormData((prev) => ({
      ...prev,
      dishes: prev.dishes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.tableNumber) {
      newErrors.tableNumber = "Seleccione una mesa";
    }

    if (!formData.waiter) {
      newErrors.waiter = "Seleccione un mesero";
    }

    if (formData.dishes.length === 0) {
      newErrors.dishes = "Debe agregar al menos un platillo";
    }

    const hasEmptyDish = formData.dishes.some(
      (dish) =>
        !dish.productId ||
        !dish.quantity ||
        dish.quantity < 1
    );

    if (hasEmptyDish) {
      newErrors.dishes =
        "Seleccione un platillo y una cantidad válida";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      await showUserErrorAlert({
        title: "Error al crear orden",
        text: "Hay campos vacíos o datos incorrectos. Por favor, verifica la información ingresada.",
      });

      return;
    }

    setErrors({});

    try {
      const orderData = {
        ...formData,
        tableNumber: Number(formData.tableNumber),
        waiter: Number(formData.waiter),
        dishes: formData.dishes.map((dish) => ({
          productId: Number(dish.productId),
          quantity: Number(dish.quantity),
        })),
      };

      await createOrder(orderData);

      await showSuccessAlert({
        title: "Orden creada correctamente",
        text: "La orden se registró correctamente.",
        confirmButtonText: "Aceptar",
        timer: 3000,
      });

      navigate("/dashboard/orderList");
    } catch (error) {
      console.error("Error al crear orden:", error);

      await showUserErrorAlert({
        title: "Error al crear orden",
        text: error.message || "No fue posible registrar la orden.",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Navbar />

      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="w-full max-w-6xl bg-gradient-to-b from-form-from to-form-to rounded-3xl p-8 shadow-md relative">
          <Button
            variant="back"
            size="back"
            type="button"
            onClick={() => navigate("/dashboard/orderList")}
          >
            <span>←</span> Atrás
          </Button>

          <div className="flex items-center gap-2 mt-8 mb-6 border-b border-accent/30 pb-3">
            <div className="text-2xl text-accent">
              🧾
              <span className="font-bold text-xl relative -top-2 -left-1">
                +
              </span>
            </div>

            <h2 className="text-accent font-bold text-xl uppercase tracking-wider">
              Crear Orden
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Select
                label="Número de mesa"
                name="tableNumber"
                value={formData.tableNumber}
                htmlFor="tableNumber"
                onChange={handleChange}
                options={tables}
                error={errors.tableNumber}
              />

              <Select
                label="Mesero responsable"
                name="waiter"
                value={formData.waiter}
                htmlFor="waiter"
                onChange={handleChange}
                options={users}
                error={errors.waiter}
              />
            </div>

            <div className="bg-accent-soft p-5 rounded-2xl border border-brand-soft">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-text-secondary uppercase text-sm">
                  Platillos de la orden
                </h3>

                <button
                  type="button"
                  onClick={addDish}
                  className="text-sm font-semibold text-accent hover:underline"
                >
                  + Agregar platillo
                </button>
              </div>

              <div className="space-y-4">
                {formData.dishes.map((dish, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_100px_45px] gap-4 items-end"
                  >
                    <Select
                      label={`Platillo ${index + 1}`}
                      name={`product-${index}`}
                      value={dish.productId}
                      htmlFor={`product-${index}`}
                      onChange={(e) =>
                        handleDishChange(
                          index,
                          "productId",
                          e.target.value
                        )
                      }
                      options={products}
                    />

                    <div className="w-[100px] max-w-full">
                      <label
                        htmlFor={`quantity-${index}`}
                        className="block text-sm font-semibold text-text-secondary mb-2"
                      >
                        Cantidad
                      </label>

                      <input
                        id={`quantity-${index}`}
                        name={`quantity-${index}`}
                        type="number"
                        min="1"
                        value={dish.quantity}
                        onChange={(e) =>
                          handleDishChange(
                            index,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                        className="w-full h-10 rounded-xl border border-border px-3 focus:outline-none focus:ring-2 focus:ring-focus-ring"
                      />
                    </div>

                    {formData.dishes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDish(index)}
                        className="h-10 w-10 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition font-bold"
                        title="Eliminar platillo"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {errors.dishes && (
                <p className="text-red-600 text-sm mt-3">
                  {errors.dishes}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">
                Observaciones especiales
              </label>

              <textarea
                name="observations"
                rows={4}
                value={formData.observations}
                onChange={handleChange}
                placeholder="Escriba observaciones especiales de la orden..."
                className="w-full rounded-xl border border-border p-3 resize-none focus:outline-none focus:ring-2 focus:ring-focus-ring"
              />
            </div>

            <div className="pt-6 border-accent/20 flex flex-col sm:flex-row justify-end items-center gap-4">
              <Button
                variant="cancel"
                size="cancel"
                type="button"
                onClick={() => navigate("/dashboard/orderList")}
              >
                Cancelar
              </Button>

              <Button
                variant="finish"
                size="finish"
                type="submit"
              >
                Crear orden
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}