import restaurantBg from "@/assets/images/restaurant.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            alert("Completa todos los campos");
            return;
        }

        if (password.length < 8) {
            alert("La contraseña debe tener mínimo 8 caracteres");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        alert("Contraseña restablecida correctamente");
        navigate("/auth");
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
                        Restablecer Contraseña
                    </h1>

                    <p className="mt-2 text-sm text-gray-200">
                        Ingresa tu nueva contraseña para recuperar el acceso a
                        tu cuenta
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-white"
                        >
                            Nueva contraseña
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa tu nueva contraseña"
                            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[var(--color-primary-800)] focus:ring-2 focus:ring-[var(--color-primary-700)]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-medium text-white"
                        >
                            Confirmar contraseña
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="Confirma tu nueva contraseña"
                            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[var(--color-primary-800)] focus:ring-2 focus:ring-[var(--color-primary-700)]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-yellow-400 px-4 py-2.5 font-semibold text-gray-900 transition hover:bg-yellow-300"
                    >
                        Restablecer contraseña
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;