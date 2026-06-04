// Ejemplo de uncontador sin usar estados


export default function DeleteCounter2(){


    let count = 0;

    const increment = () => {
        count = count + 1
        console.log("Nuevo valor es:  ", count);
    }

    return(
        <div>
            <p>Contador: {count}</p>
            <button onClick={increment} className="border p-6 rounded-[12px] bg-yellow-600">Incrementar</button>
        </div>
    )
}