export default function Input({
    label,
    htmlFor,
    type = "text",
    ...props
}){


    return(
        <div className="w-80">

                {/* Label */}
            <label 
                htmlFor={htmlFor}
                className="
                    block
                    text-caption
                    mb-1
                    text-secondary
                "
                >
                {label}
            </label>

                {/* Contenedor del input */}
            <div
                className="
                    relative
                    h-12
                    flex
                    items-center
                "
            >   
                {/* Área interactiva invisible (48px) */}
            <div
                className="
                    absolute
                    inset-0
                "
                onMouseDown={(e) => {
                    e.preventDefault();

                    // Mueve el foco al siguiene nodo hermano en el DOM
                    // nextSibling puede ser texto; si no es elemento válido,
                    // focus() falla
                    e.currentTarget.nextSibling.focus();
                }}
            />

            </div>

                {/* Input visual */}
            <input
                type={type}
                className="
                    relative
                    w-full
                    h-10
                    rounded-md
                    border border-border
                    px4
                    text-body

                    focus:outline-none
                    focus:ring-2
                    focus:ring-ring
                    focus:ring-brand
                "
            {...props}
            />    

        </div>
        
    )
}