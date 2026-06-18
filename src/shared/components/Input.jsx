export default function Input({
    label,
    error,
    htmlFor,
    type = "text",
    variant = "primary",
    size = "md",
    ...props
}){
    const variants = {
        // Estos valores deben ser con variables
        primary: `
            border-brand 
            bg-background
        `,
        secondary: `
            border-red-950
            bg-gray-300
        `,
        tertiary: `
            border-green-950
        `
    }

        const sizes = {
       
        sm: `
            h-8
        `,
        md: `
            h-10
        `,
        lg: `
            h-12
        `
    }

    return(
        <div className="w-80">

                {/* Label */}
            <label 
                htmlFor={htmlFor}
                className={`
                    block
                    text-caption
                    mb-1
                    text-secondary
                    ${
                        size === "sm"
                            ? "-mb-2"
                            : size === "md"
                                ? "mb-0"
                                : "mb-1"
                    }
                    ${error ? "border-red-800" : "text-caption"}
                `}
            >
                {label}
            </label>

                {/* Contenedor del input */}
            <div
                className="
                    relative
                    h-10
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
                {/* Input visual */}
            <input
            id = {htmlFor}
            type = {type}
            className ={`
                w-full
                rounded-md
                border 
                px-4
                text-body
            
                focus:outline-none
                focus:ring-2
                focus:ring-ring
                focus:ring-brand
                ${variants[variant]}
                ${sizes[size]}
                ${error ? "border-red-800" : "border border-border"}
            `}
            {...props}
            />    
            </div>
            {/* Feedback */}
            {error && (
                <p className="text-caption text-red-800 place-self-start">{error}</p>
            )}

        </div>
        
    )
}