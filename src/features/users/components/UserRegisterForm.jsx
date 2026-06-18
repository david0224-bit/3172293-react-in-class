// UserRegisterForm componente para registrar un usuario

import { useState, useEffect } from "react";
import { 
    Input,
    Select,
    Checkbox,
    Button,
    IconButton } from "@/shared";
import { getDocumentTypes } from "@/services/selectServices";
// import { useNavigate } from "react-router-dom";
import { userSchema } from "../schemas/userSchema";

export default function UserRegisterForm (){

    // Estado
    // const [setIsSubmitting]

    // NAvegacion
    // const navigate = useNavigate

    //Estado del error
    const [errors, setErrors] = useState({})

    // Estado del formulario
    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        userPhone: "",
        userDocumentType: "",
        userDocumentNumber: "",
        userPassword: "",

        // Flags booleanos
        isStaff: false,
        isActive: true,
        isSuperUser: false,
    });

    //=====================================
    //           Handle Generico
    //=====================================

    /**
     * Funcion que se ejecuta cada vez que cambia el valor de un input del formulario
     */
    const handleChange = (e) => {
        // Se obtiene el nomnre del campo y su valor
        const { name, value, type, checked } = e.target;

        setFormData ((prev) => ({
            // Se copia todos los valores anteriores del estado
            ...prev,

            // Se actualiza unicamente lo que cambio
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Estado para los tipos de documento
    const [documentTypes, setDocumentTypes] = useState([])

    // Uso del estado useEffect
    useEffect (() => {
        getDocumentTypes().then(setDocumentTypes)

    })

    //=====================================
    //           Handle submit
    //=====================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const result = userSchema.safeParse(formData);

        // Si la validacion falla
        if (!result.success) {
            const fieldErrors = {};

            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0]] = issue.message;
            });

            // Actualizamos el estado de errores para mostralos en la UI
            setErrors(fieldErrors);

            return;
        }
    // Si la validacion pasa, limpiamos errores previos
    setErrors({});

    // Activamos el estado de envio (util para deshabilitar el boton)
    // setIsSubmitting(true);

    try {
        // Llamamos al servicio frontend que consume la API
        // result.data contiene los datos ya validados por ZOD
        // const response = await createStaticRouter(result.data);

        // Navegamos a la vista del interior
        // navigate(-1) equivale a "volver atras"
        // navigate(-1)
    } catch (error) {
        // Capturamos errores de RED o errores lanzados por el service
        console.log("Error:", error.message);

        // Mostramos el mensaje de error al usuario
        alert(error.message);

    } finally {
        // Pase lo que pase, desactivamos el eatadop del envio
        // setIsSubmitting(false);
    }
        
    }

    //=====================================
    //           Handle NameChange
    //=====================================
    // const handleNameChange = (e) => {
    //     const value = e.target.value.trim();

    //     if (value === ""){
    //         console.log("El nombre no puede estar vacío");
            
    //     }
    // };

    

    return (
        <div className="grid items-center justify-center">
            <h1 className="mx-auto my-12 text-title font-bold">Registro de usuario
            </h1>
        <form
            action=""
            onSubmit={handleSubmit}
        >
            <Input
                label = "Nombre"
                name = "userName"
                type="text"
                value = {formData.userName}
                placeholder= "Escribe tu nombre"
                htmlFor = "user-name"
                onChange = {handleChange}
                error = {errors.userName}
            />

            <Input
                label = "Correo"
                name = "userEmail"
                type= "email"
                value = {formData.userEmail} 
                placeholder= "Escribe tu correo"
                htmlFor = "user-email"
                onChange = {handleChange}
                error = {errors.userEmail}
            />

            <Input
                label = "Telefono"
                name = "userPhone"
                type="tel"
                value = {formData.userPhone}
                placeholder= "Escribe tu numero de telefono"
                htmlFor = "user-phone"
                onChange = {handleChange}
                error = {errors.userPhone}
            />

            {/* Select */}
            <Select
                label = "Tipos de documento"
                name = "userDocumentTypes"
                value = {formData.userDocumentTypes}
                htmlFor = "userDocumentTypes"
                onChange = {handleChange}
                options = {documentTypes}
                error = {errors.userDocumentTypes}
            />

            <Input
                label = "Documento"
                name = "userDocumentNumber"
                type = "password"
                value = {formData.userDocumentNumber}
                htmlFor = "user-document-number"
                placeholder= "Ingrese su numero de documento"
                onChange = {handleChange}
                error = {errors.userDocumentNumber}
            />

            <Input
                label = "Contraseña"
                name = "userPassword"
                type = "password"
                value = {formData.userPassword}
                htmlFor = "user-password"
                placeholder= "Ingrese su contraseña"
                onChange = {handleChange}
                error = {errors.userPassword}
            />

            {/* Checkbox */}
            <div className="grid gap-4 my-2">
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
                    id="isSuperActive"
                    name="isSuperUser"
                    label="Esta activo"
                    checked={formData.isActive}
                    onChange={handleChange}
                />
            </div>

            {/* Button */}
            <div className="flex gap-6 items-center">
                <Button
                    variant= "secondary"
                    size= "md"
                    type= "submit"
                    onClick= {() => console.log("Se oprimio el boton")}
                >
                    Cancelar
                </Button>

                <Button
                    variant= "primary"
                    size= "md"
                    type= "submit"
                    onClick= {() => console.log("Se oprimio el boton")}
                >
                    Guardar
                </Button>                

            </div>
        </form>
        </div>
    )
}