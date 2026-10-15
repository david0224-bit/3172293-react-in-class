export default function Checkbox({
    id,                   //Identificador unico (necesario para accesisibilidad)
    name,                 //Nombre del campo (util para formulario)
    label,                //Texto visible asociado al checkbox
    checked = false,      //Estado controlado del checkbox
    onChange,             //Funcion que maneja el cambio de estado
    disabled = false,     //Indica si el checkbox esta habilitado
    className = "",       //Clases adicionales para personalización
}) {

    return (
        <label
            htmlFor={id}
            className={`
                    flex items-center gap-2
                    text-sm
                    cursor-printer
                    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                    ${className}

            `}
        >

            {/* Input del checkbox*/}
            <input
                id={id}
                name={name}
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={onChange}
                className="w-5 h-5"
            />

            {/*texto del checkbox*/}
            <span>{label}</span>
        </label>
    )
}