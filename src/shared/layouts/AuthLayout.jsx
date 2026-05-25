import { Outlet } from "react-router-dom";
import authBg from "@/assets/images/bg-1.png";
import { Input } from "@/shared";

export default function AuthLayout() {
    return (
        <>
            <div
                className="min-h-screen w-full"
                style={{
                    backgroundImage: `url(${authBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <main className="mx-auto">
                    <Input
                        label = "Nombre"
                        type="text" 
                        placeholder= "Escribe tu nombre"
                        htmlFor = "Campo de nombre"
                    />
                    <h1>Hola que tal</h1>
                    <Outlet />
            </main>
            </div>
        </>
    );
}