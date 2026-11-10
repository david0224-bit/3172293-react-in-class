
import { useEffect, useState } from "react";
import { Button, DetailItem, StatusSwitch } from "@/shared";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsers } from "../services/userServices.js";

export default function ReadUser() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadUser = async () => {
            try {
                setLoading(true);

                const users = await getAllUsers();

                // Buscamos el usuario correspondiente al ID de la URL
                const userData = users.find(
                    (user) => Number(user.id) === Number(id)
                );

                if (userData) {
                    setUser({
                        id: userData.id,
                        userName: userData.user_name,
                        userImage: userData.user_image,
                        documentType: userData.user_document_types,
                        documentNumber: userData.user_document_number,
                        userType: userData.is_superuser
                            ? "Administrador"
                            : userData.is_staff
                                ? "Empleado"
                                : "Usuario",
                        userEmail: userData.user_email,
                        userPhone: userData.user_phone,
                        address: userData.user_address,
                        startDate: userData.created_at
                            ? new Date(userData.created_at).toLocaleDateString("es-CO")
                            : "Sin definir",
                        status: userData.is_active,
                    });
                } else {
                    setUser(null);
                }

            } catch (error) {
                console.error("Error al cargar el usuario:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();

    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-black">
                Cargando información del usuario...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-4 text-black">
                <p>No se encontró el usuario con ID {id}.</p>

                <Button
                    size="sm"
                    variant="primary"
                    onClick={() => navigate("/dashboard/userList")}
                >
                    ← Atrás
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col font-sans bg-white/80
          backdrop-blur-md
          shadow-lg">

            <div className="flex-1 p-6 flex justify-center items-center border">

                <div className="w-full max-w-6xl bg-primary rounded-3xl shadow-lg p-8 relative text-black border-2 border-gray-400">

                    <Button
                        size="sm"
                        variant="primary"
                        onClick={() => navigate("/dashboard/userList")}
                    >
                        ← Atrás
                    </Button>

                    <div className="flex items-center gap-3 mb-8 mt-8 border-b border-black pb-3">

                        <div className="text-4xl">
                            👤
                        </div>

                        <h2 className="text-2xl font-bold uppercase text-black">
                            Perfil de Usuario
                        </h2>

                    </div>

                    <div className="grid md:grid-cols-2 gap-10">

                        <div className="flex flex-col items-center">

                            <div className="w-64 h-72 rounded-xl overflow-hidden border-4 border-white shadow-md flex items-center justify-center bg-gray-200">

                                <span className="text-7xl font-bold text-gray-700 uppercase">
                                    {user.userName?.trim().slice(0, 2)}
                                </span>

                            </div>

                            <h3 className="mt-5 text-xl font-bold text-black">
                                {user.userName}
                            </h3>

                            <div className="w-full border-b border-black my-5" />

                            <div className="flex items-center gap-3">

                                <span className="font-semibold text-black">
                                    Estado
                                </span>

                                <StatusSwitch
                                    checked={user.status}
                                    onChange={() => {}}
                                />

                            </div>

                            <div className="flex justify-center mt-8">

                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => navigate(`/UpdateUser/${id}`)}
                                >
                                    Editar
                                </Button>

                            </div>

                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-8 text-black">

                            <DetailItem
                                label="Tipo de documento"
                                value={user.documentType}
                            />

                            <DetailItem
                                label="Número de documento"
                                value={user.documentNumber}
                            />

                            <DetailItem
                                label="Tipo de usuario"
                                value={user.userType}
                            />

                            <DetailItem
                                label="Correo electrónico"
                                value={user.userEmail}
                            />

                            <DetailItem
                                label="Número telefónico"
                                value={user.userPhone}
                            />

                            <DetailItem
                                label="Fecha de registro"
                                value={user.startDate}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
