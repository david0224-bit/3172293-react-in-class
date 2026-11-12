
import { useEffect, useState } from "react";
import { Button } from "@/shared";
import { useNavigate, useParams } from "react-router-dom";
import { getAllOrders } from "../services/orderServices.js";

const formatPrice = (value) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    }).format(Number(value));
};

export default function ReadOrder() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrder = async () => {
            try {
                setLoading(true);

                const orders = await getAllOrders();

                const orderData = orders.find(
                    (order) => Number(order.id) === Number(id)
                );

                if (orderData) {
                    let dishes = orderData.dishes;

                    if (typeof dishes === "string") {
                        dishes = JSON.parse(dishes);
                    }

                    dishes = Array.isArray(dishes) ? dishes : [];

                    const hasPrices = dishes.length > 0 &&
                        dishes.every(
                            (dish) =>
                                dish.unitPrice !== undefined &&
                                dish.unitPrice !== null &&
                                dish.subtotal !== undefined &&
                                dish.subtotal !== null
                        );

                    setOrder({
                        id: orderData.id,
                        tableNumber: orderData.table_number,
                        waiter: orderData.waiter_id,
                        dishes,
                        total: Number(orderData.total || 0),
                        hasPrices,
                        observations: orderData.observations,
                        status: orderData.status,
                        createdAt: orderData.created_at
                            ? new Date(orderData.created_at).toLocaleString("es-CO")
                            : "Sin definir",
                    });
                } else {
                    setOrder(null);
                }
            } catch (error) {
                console.error("Error al cargar la orden:", error);
                setOrder(null);
            } finally {
                setLoading(false);
            }
        };

        loadOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-text-primary">
                Cargando información de la orden...
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-4 text-text-primary">
                <p>No se encontró la orden con ID {id}.</p>

                <Button
                    size="sm"
                    variant="primary"
                    onClick={() => navigate("/dashboard/orderList")}
                >
                    ← Atrás
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col font-sans bg-panel/80 backdrop-blur-md shadow-lg">

            <div className="flex-1 p-6 flex justify-center items-center border">

                <div className="w-full max-w-6xl bg-primary rounded-3xl shadow-lg p-8 relative text-text-primary border-2 border-border">

                    <Button
                        size="sm"
                        variant="primary"
                        onClick={() => navigate("/dashboard/orderList")}
                    >
                        ← Atrás
                    </Button>

                    <div className="flex items-center gap-3 mb-8 mt-8 border-b border-border-strong pb-3">

                        <div className="text-4xl">
                            🧾
                        </div>

                        <h2 className="text-2xl font-bold uppercase text-text-primary">
                            Detalle de Orden #{order.id}
                        </h2>

                    </div>

                    <div className="grid md:grid-cols-2 gap-8">

                        <div className="bg-panel rounded-2xl shadow-md p-8 text-text-primary">

                            <h3 className="text-center text-2xl font-semibold mb-6">
                                Información de la orden
                            </h3>

                            <div className="grid grid-cols-[180px_1fr] gap-y-6">

                                <span className="font-semibold">
                                    Número de orden:
                                </span>
                                <span>{order.id}</span>

                                <span className="font-semibold">
                                    Número de mesa:
                                </span>
                                <span>{order.tableNumber}</span>

                                <span className="font-semibold">
                                    Mesero (ID):
                                </span>
                                <span>{order.waiter}</span>

                                <span className="font-semibold">
                                    Fecha de registro:
                                </span>
                                <span>{order.createdAt}</span>

                                <span className="font-semibold">
                                    Estado:
                                </span>

                                <span className={`font-semibold ${
                                    order.status === "Abierta"
                                        ? "text-accent"
                                        : order.status === "Cerrada"
                                            ? "text-text-secondary"
                                            : "text-accent"
                                }`}>
                                    {order.status}
                                </span>

                            </div>

                            <div className="border-t border-border mt-8 pt-6">

                                <h3 className="font-semibold mb-3">
                                    Observaciones
                                </h3>

                                <p className="text-text-secondary whitespace-pre-wrap">
                                    {order.observations || "Sin observaciones registradas."}
                                </p>

                            </div>

                        </div>

                        <div className="bg-panel rounded-2xl shadow-md p-8 text-text-primary">

                            <h3 className="text-center text-2xl font-semibold mb-6">
                                Productos de la orden
                            </h3>

                            {order.dishes.length > 0 ? (

                                <div className="flex flex-col gap-5">

                                    {order.dishes.map((dish, index) => (

                                        <div
                                            key={index}
                                            className="border-b border-border pb-5"
                                        >

                                            <div className="flex justify-between items-center gap-3 mb-3">

                                                <div>
                                                    <p className="font-semibold">
                                                        {dish.productName || `Producto #${dish.productId}`}
                                                    </p>

                                                    <p className="text-sm text-text-muted">
                                                        ID: {dish.productId}
                                                    </p>
                                                </div>

                                                <span className="px-3 py-2 rounded-full bg-warning-soft border border-border font-semibold text-sm">
                                                    x {dish.quantity}
                                                </span>

                                            </div>

                                            <div className="grid grid-cols-2 gap-3 text-sm">

                                                <span className="text-text-secondary">
                                                    Precio unitario:
                                                </span>

                                                <span className="text-right font-medium">
                                                    {dish.unitPrice != null
                                                        ? formatPrice(dish.unitPrice)
                                                        : "No disponible"}
                                                </span>

                                                <span className="text-text-secondary">
                                                    Subtotal:
                                                </span>

                                                <span className="text-right font-semibold">
                                                    {dish.subtotal != null
                                                        ? formatPrice(dish.subtotal)
                                                        : "No disponible"}
                                                </span>

                                            </div>

                                        </div>

                                    ))}

                                    <div className="flex justify-between items-center border-t-2 border-border-strong pt-5 mt-2">

                                        <span className="text-lg font-bold">
                                            TOTAL:
                                        </span>

                                        <span className="text-xl font-bold text-accent">
                                            {order.hasPrices
                                                ? formatPrice(order.total)
                                                : "No disponible"}
                                        </span>

                                    </div>

                                </div>

                            ) : (

                                <p className="text-center text-text-muted">
                                    No hay productos registrados en esta orden.
                                </p>

                            )}

                        </div>

                    </div>

                    <div className="flex justify-center mt-8">

                        <Button
                            size="sm"
                            variant="primary"
                            onClick={() => navigate(`/UpdateOrder/${order.id}`)}
                        >
                            Editar orden
                        </Button>

                    </div>

                </div>

            </div>

        </div>
    );
}
