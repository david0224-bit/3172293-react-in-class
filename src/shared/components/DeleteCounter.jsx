// Componente para entender el useState
import { useState } from "react";

export default function DeleteCounter(){

    // Creamos el estado
    const [count, setCount] = useState(0);

    return(
        <div>
            <p>Contador: {count}</p>
            <button onClick={() => setCount (count + 1)} className="border p-6 rounded-[12px]">Incrementar</button>
        </div>
    )
}