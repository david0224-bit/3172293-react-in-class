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
                    text-text-secondary
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
                    border-border
                    px-4
                    bg-accent

                    hover:border-1
                    hover:bg-brand-soft-hover
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