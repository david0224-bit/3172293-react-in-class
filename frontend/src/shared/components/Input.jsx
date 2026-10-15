export default function Input({
    label,
    error,
    htmlFor,
    type = "text",
    variant= "primary",
    size= "sm",
    ...props
}){
    const variants = {
        // Estos valroes deben ser cin variables
        primary: `
            border-brand
            bg-gray-100
        `,
        secondary: `
            border-red-950
            bg-gray-300
        `,
        tertiary: `
            border-green-950
        `,
    };

    const sizes = {
        sm: `
            h-8
        `,
        md: `
            h-10
        `,
        lg: `
            h-12
        `,
    };

    return(
        <div className="w-80">

            {/*Label*/}
            <label 
                // htmlFor con kebab-case
                htmlFor={htmlFor}
                className={`
                    block
                    text-caption
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

                {/* Contenedor de input */}
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

                    //Mueve el foco al siguiente modo hermando en el dom
                    //nextsiblings puede ser texto; si no es elemento valido,
                    // focus() falla
                    e.currentTarget.nextSibling.focus();
                }}
            />

            {/* Input visual */}
            <input
                id={htmlFor}
                type={type}
                className={`
                    relative
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

            {/*feedback*/}
            {error && (
                <p className="text-caption text-red-800 place-self-start">{error}</p>
            )}
        </div>
    )
}