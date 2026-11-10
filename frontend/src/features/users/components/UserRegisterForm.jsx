// UserRegisterForm  componente para registrar un usuario

import { useState, useEffect } from "react"
import { Input, Select, Checkbox, Button, FileInput } from "@/shared";
import { getDocumentTypes } from "@/services/selectService";
// import { useNavigate } from "react-router-dom";
import { userSchema } from "../schemas/userSchema";
// import { User, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserRegisterForm (){

    const navigate = useNavigate();

    // const navigate = useNavigate();

    //Estado
    

    //Estado del error
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        userPhone: "",
        userDocumentTypes: "",
        userDocumentNumber: "",
        userPassword: "",
        userImage: [],

        //Flags booleanos
        isStaff: false,
        isActive: true,
        isSuperUser: false,
    });

    //Estado para los tipos de documento
    const [documentTypes, setDocumentTypes] = useState([])

    //Uso del estado useEffect
     useEffect(() => {
        getDocumentTypes().then(setDocumentTypes);
      },[])

    //================================================
    //         handleGenerico
    //===============================================


    //Función que se ejecutra cada vez que cambia el valor de un input del formulario

    const handleChange = (e) => {
        // Se obtiene el nombre del campo y su valor
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            //Se copian todos los valores anteriores del estado
            ...prev,

            //Se actualiza unicamente lo que cambio
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    //============handle submit======================//

    const handleSubmit = async (e) => {
    //Evita que el formulario recargue la página
    e.preventDefault();

    //Validamos los datos del formulario contra el esquema Zod
    //safeParse No lanza excepción, retorna un objeto controlado
    const result = userSchema. safeParse(formData);

    //Verificar en consola si el esquema esta funcionando correctamente
    //console.log(result)

    //Si la validación falla
    if(!result.sucess) {
        //Objeto donde almacenaremos los errores por campo
        const fieldErrors = {};

        //Recorremos cada error generado por Zod
        result.error.issues.forEach((issue) => {
            //issue.path[0] corresponde al nombre del campo
            //issue.message contiene el mensaje de error definido en el schema
            fieldErrors[issue.path[0]] = issue.message;
        });

        //Actualiza,ps el estado de errores para mostrarlos en la UI
        setErrors(fieldErrors);

        //Cortamos la ejecución: NO se envia nada al backend

        return;
    }

    //Si la validación pasa, limpiamos errores previos
    setErrors({});
    
    //Activamos estado de envio (útil para deshabilitar el botón)
    // setIsSubmitting(true);

    try {
        //Lamamos al servicio fronted que consume la API
        //result.data contiene los datos ya validados por Zod
        // const response = await createUser(result.data);

        //Log informativo para desarrollo
        // console.log("Usuario creado:", response);

        //Feedback basico al usuario
        alert("Usuario creado correctamente");

        //Navegamos a la vista anterior
        //Navigate(-1) equivale a "volver atras"
        // navigate(-1);
    }   catch(error) {
        //Capturamos errores de red o errores lanzados por el service
        console.error("Error:", error.message);

        //Mostramos el mensaje de error al usuario
        alert(error.message);
    }   finally {
        //Pase lo que pase, desactivamos el estado de envio
        // setIsSubmitting(false);
    }
};

    //================================================
    //         Handle NameChange
    //===============================================

    // const handleNameChange = (e) => {
    //     const value = e.target.value.trim();

    //     if (value ==="") {
    //         console.log("El nombre no puede estar vació");
    //     }
    // };

    return(
        <div className="grid items-center justify-center">
            <h1 className="mx-auto my-12 text-title font-bold">Registro de Usuarios</h1>
            {/*formulario*/}
            <form 
            action=""
            onSubmit={handleSubmit}
            >

            <Input
            label="Nombre"
            name="userName"
            type="text"
            value={formData.userName}
            placeholder="Ingresa su nombre"
            htmlFor= "user-name"
            onChange={handleChange}
            error={errors.userName}


            />
            <Input
            label="Correo"
            name="userEmail"
            type="email"
            value={formData.userEmail}
            placeholder="Escribe tu correo electronico"
            htmlFor= "user-email"
            onChange={handleChange}
            error={errors.userEmail}


            />
            <Input
            label="Teléfono"
            name="userPhone"
            type="tel"
            value={formData.userPhone}
            placeholder="Escribe tu número de teléfono"
            htmlFor= "user-phone"
            onChange={handleChange}
            error={errors.userPhone}


            />
            <Select
            label= "Tipos de documento"
            name="userDocumentTypes"
            value={formData.userDocumentTypes}
            htmlFor="userDocumentTypes"
            onChange={handleChange}
            options={documentTypes}
            error={errors.userDocumentTypes}


            />
            <Input
            label="Documento"
            name="userDocumentNumber"
            type="text"
            value={formData.userDocumentNumber}
            placeholder="Escribe tu número de documento"
            htmlFor= "user-document-number"
            onChange={handleChange}
            error={errors.userDocumentNumber}


            />
            <Input
            label="Contraseña"
            name="userPassword"
            type="password"
            value={formData.userPassword}
            placeholder="Escribe tu contraseña"
            htmlFor= "user-password"
            onChange={handleChange}
            error={errors.userPassword}
            />

            <div className="grid gap-4 my-8">
                {/* checkbox */}
            <Checkbox
                id="isSuperUser"
                name="isSuperUser"
                label="Es super usuario"
                checked={formData.isSuperUser}
                onChange={handleChange}
            />
            <Checkbox
                id="isStaff"
                name="isStaff"
                label="Es staff"
                checked={formData.isStaff}
                onChange={handleChange}
            />
            <Checkbox
                id="isActive"
                name="isActive"
                label="Esta activo"
                checked={formData.isActive}
                onChange={handleChange}
            />

            <div>
            <h2>Cantidad maxima de archivos: 12</h2>
            <h3>Peso maximo: 10MB </h3>
            </div>

            <FileInput
                    value={formData.userImage}
                    onChange={(files) =>
                        setFormData((prev) => ({ ...prev, userImage: files }))
                    }
                    multiple={true}
                />
                {errors.userImage && (
                    <span className="text-red-500 text-sm">{errors.userImage}</span>
                )}

            </div>
            
                {/*Actions*/}
                <div className="flex gap-6 items-center" >

                <Button
                    variant= "secondary"
                    size= "sm"
                    type= "button"
                    onClick={() => navigate(-1)}
                    
                
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

                {/* Icons */}
               {/* <User/>
               <Pencil/> */}

            </form>
        </div>
    )
}