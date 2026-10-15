import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import authBg from "@/assets/images/bg-1.png";
import { Input, 
         Button, 
         Select, 
         Checkbox } from "@/shared";
import { getDocumentTypes } from "../../services/selectService";

export default function AuthLayout() {

  //Estado para los tipos de documentis
  const [documentTypes, setDocumentTypes] = useState ([])

  useEffect(() => {
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
        <main className="mx-auto">
          <Input
            label="Nombre"
            type="text"
            placeholder="Escribe tu nombre"
            htmlFor= "user-name"
            variant ="primary"
            size ="lg"
            />
          <Input
            label="Correo"
            type="email"
            placeholder="Escribe tu correo"
            htmlFor= "user-email"
            />
          <Input
            label="Telefono"
            type="tel"
            placeholder="Escribe tu número de telefono"
            htmlFor= "user-phone"
            />
          <Input
            label="Borrar tipo de documento"
            type="text"
            placeholder="Escribe tu nombre"
            htmlFor= "name"
            />
          <Input
            label="Documento"
            type="text"
            placeholder="Escribe tu número de documento"
            htmlFor= "user-document-number"
            />
           <Select
              label= "Tipos de documento"
              name="userDocumentTypes"
              htmlFor="userDocumentTypes"
              options={documentTypes}
            />
            
          <Checkbox/>

            <div className="flex gap-6 items-center" >

               <Button
                variant= "secondary"
                size= "sm"
                type= "button"
                onClick={() => console.log("Se oprimio el cancelar")}
              
              >Cancelar
              </Button>

              <Button
                variant= "primary"
                size= "md"
                type= "sumbit"
                onClick={() => console.log("Se oprimio el submit")}
              
              >Guardar
              </Button>
            </div>

            Implementacion del estado useState

          <Outlet />
        </main>
      </div>
    </>
  );
}