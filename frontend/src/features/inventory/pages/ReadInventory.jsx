
import { useEffect, useState } from "react";
import { Button, DetailItem, StatusSwitch } from "@/shared";
import { useNavigate, useParams } from "react-router-dom";
import { getAllInventory } from "../services/inventoryServices.js";

export default function ReadInventory() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [inventory, setInventory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadInventory = async () => {
            try {
                setLoading(true);

                const inventoryList = await getAllInventory();

                const inventoryData = inventoryList.find(
                    (item) => Number(item.id) === Number(id)
                );

                if (inventoryData) {
                    setInventory({
                        id: inventoryData.id,
                        productName: inventoryData.product_name,
                        productId: inventoryData.product_id,
                        productQuantity: inventoryData.product_quantity,
                        supplierName: inventoryData.product_supplier_names,
                        supplierNit: inventoryData.product_supplier_nit,
                        productDescription: inventoryData.product_description,
                        productPrice: inventoryData.product_price,
                        entryDate: inventoryData.product_entry_date,
                        productImage: inventoryData.product_image,
                        status: inventoryData.is_active,
                    });
                } else {
                    setInventory(null);
                }

            } catch (error) {
                console.error("Error al cargar el inventario:", error);
                setInventory(null);
            } finally {
                setLoading(false);
            }
        };

        loadInventory();

    }, [id]);

    const formatPrice = (price) => {
        if (price === null || price === undefined) return "No registrado";

        return Number(price).toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
        });
    };

    const formatDate = (date) => {
        if (!date) return "Sin fecha";

        const parsedDate = new Date(date);

        if (isNaN(parsedDate.getTime())) return "Sin fecha";

        return parsedDate.toLocaleDateString("es-CO", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "UTC",
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-black">
                Cargando información del inventario...
            </div>
        );
    }

    if (!inventory) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-4 text-black">
                <p>No se encontró el registro de inventario con ID {id}.</p>

                <Button
                    size="sm"
                    variant="primary"
                    onClick={() => navigate("/dashboard/inventoryList")}
                >
                    ← Atrás
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col font-sans bg-white/80 backdrop-blur-md shadow-lg">

            <div className="flex-1 p-6 flex justify-center items-center border">

                <div className="w-full max-w-6xl bg-primary rounded-3xl shadow-lg p-8 relative text-black border-2 border-gray-400">

                    <Button
                        size="sm"
                        variant="primary"
                        onClick={() => navigate("/dashboard/inventoryList")}
                    >
                        ← Atrás
                    </Button>

                    <div className="flex items-center gap-3 mb-8 mt-8 border-b border-black pb-3">

                        <div className="text-4xl">
                            📦
                        </div>

                        <h2 className="text-2xl font-bold uppercase text-black">
                            Información del inventario
                        </h2>

                    </div>

                    <div className="grid md:grid-cols-2 gap-10">

                        <div className="flex flex-col items-center">

                            <div className="w-64 h-72 rounded-xl overflow-hidden border-4 border-white shadow-md flex items-center justify-center bg-gray-200">

                                {inventory.productImage &&
                                typeof inventory.productImage === "string" &&
                                (inventory.productImage.startsWith("http") ||
                                inventory.productImage.startsWith("data:image")) ? (
                                    <img
                                        src={inventory.productImage}
                                        alt={inventory.productName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-7xl font-bold text-gray-700 uppercase">
                                        {inventory.productName?.trim().slice(0, 2) || "IN"}
                                    </span>
                                )}

                            </div>

                            <h3 className="mt-5 text-xl font-bold text-black">
                                {inventory.productName}
                            </h3>

                            <div className="w-full border-b border-black my-5" />

                            <div className="flex items-center gap-3">

                                <span className="font-semibold text-black">
                                    Estado
                                </span>

                                <StatusSwitch
                                    checked={inventory.status}
                                    onChange={() => {}}
                                />

                            </div>

                            <div className="flex justify-center mt-8">

                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => navigate(`/UpdateInventory/${id}`)}
                                >
                                    Editar
                                </Button>

                            </div>

                        </div>

                        <div className="flex flex-col gap-6">

                            <div className="bg-white rounded-2xl shadow-md p-8 text-black">

                                <h3 className="text-center text-2xl font-medium mb-6">
                                    Información del producto
                                </h3>

                                <DetailItem
                                    label="ID del registro"
                                    value={inventory.id}
                                />

                                <DetailItem
                                    label="ID del producto asociado"
                                    value={inventory.productId}
                                />

                                <DetailItem
                                    label="Nombre del producto"
                                    value={inventory.productName}
                                />

                                <DetailItem
                                    label="Cantidad en inventario"
                                    value={inventory.productQuantity}
                                />

                                <DetailItem
                                    label="Precio"
                                    value={formatPrice(inventory.productPrice)}
                                />

                                <DetailItem
                                    label="Fecha de entrada"
                                    value={formatDate(inventory.entryDate)}
                                />

                                <DetailItem
                                    label="Descripción"
                                    value={inventory.productDescription || "Sin descripción"}
                                />

                            </div>

                            <div className="bg-white rounded-2xl shadow-md p-6 text-black">

                                <h3 className="text-center text-2xl font-medium mb-6">
                                    Información del proveedor
                                </h3>

                                <DetailItem
                                    label="Nombre del proveedor"
                                    value={inventory.supplierName || "No registrado"}
                                />

                                <DetailItem
                                    label="NIT del proveedor"
                                    value={inventory.supplierNit || "No registrado"}
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
