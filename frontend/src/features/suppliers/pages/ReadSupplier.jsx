
import { useEffect, useState } from "react";
import { Button, DetailItem, StatusSwitch } from "@/shared";
import { useNavigate, useParams } from "react-router-dom";
import { getAllSuppliers } from "../services/supplierServices.js";

export default function ReadSupplier() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [supplier, setSupplier] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadSupplier = async () => {
            try {
                setLoading(true);

                const suppliers = await getAllSuppliers();

                // Buscamos el proveedor correspondiente al ID de la URL
                const supplierData = suppliers.find(
                    (supplier) => Number(supplier.id) === Number(id)
                );

                if (supplierData) {
                    setSupplier({
                        id: supplierData.id,
                        companyName: supplierData.supplier_name,
                        documentType: supplierData.supplier_document_type,
                        documentNumber: supplierData.supplier_document_number,
                        supplierEmail: supplierData.supplier_email,
                        supplierPhone: supplierData.supplier_phone,
                        supplierAddress: supplierData.supplier_address,
                        productTypes: Array.isArray(supplierData.supplied_products)
                            ? supplierData.supplied_products
                            : [],
                        status: supplierData.is_active,
                    });
                } else {
                    setSupplier(null);
                }

            } catch (error) {
                console.error("Error al cargar el proveedor:", error);
                setSupplier(null);
            } finally {
                setLoading(false);
            }
        };

        loadSupplier();

    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-black">
                Cargando información del proveedor...
            </div>
        );
    }

    if (!supplier) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-4 text-black">
                <p>No se encontró el proveedor con ID {id}.</p>

                <Button
                    size="sm"
                    variant="primary"
                    onClick={() => navigate("/dashboard/supplierList")}
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
                        onClick={() => navigate("/dashboard/supplierList")}
                    >
                        ← Atrás
                    </Button>

                    <div className="flex items-center gap-3 mb-8 mt-8 border-b border-black pb-3">

                        <div className="text-4xl">
                            🏢
                        </div>

                        <h2 className="text-2xl font-bold uppercase text-black">
                            Perfil de Proveedor
                        </h2>

                    </div>

                    <div className="grid md:grid-cols-2 gap-10">

                        <div className="flex flex-col items-center">

                            <div className="w-64 h-72 rounded-xl overflow-hidden border-4 border-white shadow-md flex items-center justify-center bg-gray-200">

                                <span className="text-7xl font-bold text-gray-700 uppercase">
                                    {supplier.companyName?.trim().slice(0, 2)}
                                </span>

                            </div>

                            <h3 className="mt-5 text-xl font-bold text-black">
                                {supplier.companyName}
                            </h3>

                            <div className="w-full border-b border-black my-5" />

                            <div className="flex items-center gap-3">

                                <span className="font-semibold text-black">
                                    Estado
                                </span>

                                <StatusSwitch
                                    checked={supplier.status}
                                    onChange={() => {}}
                                />

                            </div>

                            <div className="flex justify-center mt-8">

                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => navigate(`/UpdateSupplier/${supplier.id}`)}
                                >
                                    Editar
                                </Button>

                            </div>

                        </div>

                        <div className="flex flex-col gap-6">

                            <div className="bg-white rounded-2xl shadow-md p-8 text-black">

                                <DetailItem
                                    label="Tipo de documento"
                                    value={supplier.documentType}
                                />

                                <DetailItem
                                    label="Número de documento"
                                    value={supplier.documentNumber}
                                />

                                <DetailItem
                                    label="Nombre de la compañía"
                                    value={supplier.companyName}
                                />

                                <DetailItem
                                    label="Dirección"
                                    value={supplier.supplierAddress}
                                />

                                <DetailItem
                                    label="Teléfono"
                                    value={supplier.supplierPhone}
                                />

                                <DetailItem
                                    label="Correo electrónico"
                                    value={supplier.supplierEmail}
                                />

                            </div>

                            <div className="bg-white rounded-2xl shadow-md p-6 text-black">

                                <h3 className="text-center text-2xl font-medium mb-6">
                                    Productos que suministra
                                </h3>

                                <div className="flex justify-center gap-6 flex-wrap">

                                    {supplier.productTypes.length > 0 ? (
                                        supplier.productTypes.map((product, index) => (
                                            <span
                                                key={index}
                                                className="px-6 py-2 rounded-full bg-yellow-100 border border-gray-600 text-sm font-medium"
                                            >
                                                {typeof product === "string"
                                                    ? product
                                                    : product.productName || product.product_name || product.name || "Producto"}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500">
                                            No hay productos registrados.
                                        </span>
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
