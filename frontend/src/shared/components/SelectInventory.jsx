// Componente select del inventario

export default function SelectInventory({

    label,
    error,
    htmlFor,
    name,
    onChange,
    value,
    options = [],
}){
    return (
        <div>
            {/*Label solo se muestra su es truthy es uno lógico */}
            {label && (
                <label 
                 htmlFor={htmlFor}
                 className="
                    block
                    text-caption
                    text-secondary
                    "
                >
                 {label}
                </label>
            )}

            {/* Select */}
            <select
                name={name}
                value={value}
                onChange={onChange}
                id="htmlFor"
                className="
                    w-80
                    h-10
                    rounded-md
                    border-1
                    border-[var(--gary-500)]
                    px-4
                    bg-[var(--color-primary-950)]

                    hover:border-1
                    hover:bg-[var(--color-primary-300)]
                    "
            >

                <option value="">Seleccione una opción</option>

                {options.map((opt) => (
                    <option key ={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                ))}
            </select>
            {/*feedback*/}
            {error && (
                <p className="text-caption text-red-800 place-self-start mt-1">{error}</p>
            )}
        </div>
    )
}