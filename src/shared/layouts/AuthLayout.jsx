import {useState, useEffect} from "react";

import { Outlet } from "react-router-dom";
import authBg from "@/assets/images/bg-1.png";
import {
    Input,
    Button,
    Select,
    Checkbox } from "@/shared";

import { getDocumentTypes } from "../../services/selectServices";



export default function AuthLayout() {

    //Estado para los tipos de documento
    const [documentTypes, setDocumentTypes] = useState ([])

    // Uso del estado useEffect
    useEffect (() => {
        getDocumentTypes().then(setDocumentTypes);
    },[])

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
                <main className="mx-auto ml-12">
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
                        label = "Tipo de documento"
                        type="text" 
                        placeholder= "Ingrese su numero de documento"
                        htmlFor = "user"
                    />

                    <Input
                        label = "Documento"
                        type= "text" 
                        placeholder= "Escribe tu numero de documento"
                        htmlFor = "user-document-number"
                    />

                        {/* Actions */}
                    <div className= "flex gap-6 items-center mt-2">
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
                            // onClick={() => console.log("Se oprimio el boton guardar")}
                        >
                        Guardar
                        </Button>
                    </div> {/* Actions */}

                    

                    <Select
                        label="Tipos de documento"
                        name="userDocumentTypes"
                        htmlFor="userDocumentTypes"
                        options={documentTypes}
                    />

                    <Outlet/>
                </main>
                </div>
        </>
    );
}