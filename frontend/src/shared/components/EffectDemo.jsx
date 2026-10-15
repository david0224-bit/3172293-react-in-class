// EffectDemo.jsx
// Efecto con array vacio, osea sin dependencias, este efecto se ejecuta una sola vez y esto ocurre cuadno el componente se monta por primera vez


import { useEffect, useState } from "react";

export default function EffectDemo() {
    const [message, setMessage] = useState("Cargando....")

    useEffect(() => {
        
        setTimeout(() => {
            setMessage("Componente cargado")
        }, 2000);

    },[]);

    return <h1>{message}</h1>

}