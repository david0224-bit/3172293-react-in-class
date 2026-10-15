// Componente select

export default function Select({

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
                    h-12
                    rounded-md
                    border
                    px-4

                    hover:border
                    hover:border-2
                    hover:border-focus-border
                    "
            >

                <option value="">Seleccione una opcion</option>

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