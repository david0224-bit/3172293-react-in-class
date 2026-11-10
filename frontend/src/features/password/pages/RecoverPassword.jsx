import restaurantBg from "@/assets/images/restaurant.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecoverPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
        alert("Ingresa tu correo electrónico");
        return;
    }

    alert("Enlace de recuperación enviado correctamente");
    navigate("/verify-code");
};

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
            style={{
                backgroundImage: `url(${restaurantBg})`,
            }}
        >
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative w-full max-w-md rounded-2xl border border-[var(--color-primary-800)] bg-black/70 p-8 shadow-2xl">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-white">
                        Recuperar Contraseña
                    </h1>

                    <p className="mt-2 text-sm text-gray-200">
                        Ingresa tu correo registrado para recibir el enlace de
                        recuperación
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-white"
                        >
                            Correo electrónico
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ingresa tu correo"
                            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[var(--color-primary-800)] focus:ring-2 focus:ring-[var(--color-primary-700)]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-yellow-400 px-4 py-2.5 font-semibold text-gray-900 transition hover:bg-yellow-300"
                    >
                        Enviar enlace de recuperación
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/auth")}
                        className="w-full text-sm font-medium text-white hover:text-yellow-400"
                    >
                        Volver al inicio de sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RecoverPassword;