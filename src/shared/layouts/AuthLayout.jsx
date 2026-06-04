import { Outlet } from "react-router-dom";
import authBg from "@/assets/images/bg-1.png";
import { Input } from "@/shared";
import { Button } from "@/shared";
import DeleteCounter2 from "../components/DeleteCounter2";


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
                        htmlFor = "user-name"
                        variant = "secondary"
                        marginsize = "md"
                    />

                    <Input
                        label = "Correo"
                        type= "email" 
                        placeholder= "Escribe tu correo"
                        htmlFor = "user-email"
                    />

                    <Input
                        label = "Telefono"
                        type= "tel" 
                        placeholder= "Escribe tu numero de telefono"
                        htmlFor = "user-phone"
                    />

                    <Input
                        label = "Borrar tipo de documento"
                        type="text" 
                        placeholder= "Escribe tu nombre"
                        htmlFor = "user"
                    />

                    <Input
                        label = "Documento"
                        type= "text" 
                        placeholder= "Escribe tu numero de documento"
                        htmlFor = "user-document-number"
                    />

                        {/* Actions */}
                    <div className= "flex gap-6 items-center">
                        <Button
                            variant = "secondary"
                            size = "sm"
                            type = "button"
                            onClick={() => console.log("Se oprimio el boton cancelar")}
                        >
                        Cancelar
                        </Button>

                        <Button
                            variant = "primary"
                            size = "md"
                            type = "submit"
                            onClick={() => console.log("Se oprimio el boton guardar")}
                        >
                        Guardar
                        </Button>
                    </div> {/* Actions */}

                    {/* Implementacion del estado useState */}

                    <div className="mt-10">

                    <DeleteCounter2 />
                    </div>
                    
                    <h1>Ome que mas</h1>
                    <Outlet />
                </main>
                </div>
        </>
    );
}