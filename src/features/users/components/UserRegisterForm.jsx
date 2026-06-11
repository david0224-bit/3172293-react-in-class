// UserRegisterForm componente para registrar un usuario

import { useState, useEffect } from "react";
import { 
    Input,
    Select,
    Checkbox,
    Buttoon } from "react";
import { getDocumentTypes } from "@/services/selectServices";

export default function UserRegisterForm (){
    // Estado del formulario
    const [FormData, setFormData] = useState({
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

        const result = userSchema.safeParse(FormData);

        // Si la validacion falla
        if (!result.success) {
            const fieldErrors = {};

            result.error.issues.forEach((issue) => {
                fieldErrors[issue[0]] = issue.message;
            });

            // Actualizamos el estado de errores para mostralos en la UI
            setErrors(fieldErrors);

            return;
        }
    // Si la validacion pasa, limpiamos errores previos
    setErrors({});
        
    }
    return (
        <div>
            <Input
                label = "Nombre"
                type="text" 
                placeholder= "Escribe tu nombre"
                htmlFor = "user-name"
            />

            <Input
                label = "Correo"
                type="email" 
                placeholder= "Escribe tu correo"
                htmlFor = "user-email"
            />

            <Input
                label = "Telefono"
                type="tel" 
                placeholder= "Escribe tu numero de telefono"
                htmlFor = "user-phone"
            />

                <Input
                label = "Documentos"
                type="text" 
                htmlFor = "user-document-number"
                placeholder= "Escribe tu numero de documento"
            />


            {/* Checkbox */}

            <Checkbox
                id="isSuperUser"
                name="isSuperUser"
                label="Es super usuario"
                checked={FormData.isSuperUser}
                onChange={handleChange}
            />

            <Checkbox
                id="isStaff"
                name="isStaff"
                label="Es super usuario"
                hecked={FormData.isStaff}
                onChange={handleChange}
            />

            <Checkbox
                id="isSuperActive"
                name="isSuperUser"
                label="Es super usuario"
                checked={FormData.isStaff}
                onChange={handleChange}
            />
        </div>
    )
}