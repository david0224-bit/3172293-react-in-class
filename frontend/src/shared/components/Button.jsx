// Componente Button

export default function Button({
    variant = "primary",
    size = "md",
    type = "button",
    children,
    ...props

}) {

        const variants = {
        primary: `
            bg-brand
            text-text-inverse
            hover:bg-brand-hover
            dark:brightness-110
        `,

        secondary: `
            bg-brand-soft
            text-text-primary
            hover:bg-brand-soft-hover
            dark:brightness-110
        `,

        cancel: `
            border
            border-border
            text-text-secondary
            hover:bg-surface-hover
        `,

        finish: `
            bg-accent
            hover:bg-accent-hover
            text-on-accent
            shadow-md
            dark:brightness-125
        `,

        back: `
            absolute
            top-2
            bg-accent
            text-on-accent
            hover:bg-accent-hover
        `,
    };

    const sizes = {
        sm: `
            h-8
            px-4
            rounded-md
            before:absolute
            before:content-['']
            before:-inset-y-[8px]
            before:-inset-x-[0px]
        `,

        md: `
            h-10
            px-4
            rounded-md
            before:absolute
            before:content-['']
            before:-inset-y-[4px]
            before:-inset-x-[0px]
        `,

        cancel: `
            px-6
            py-2
            rounded-full
            font-semibold
        `,

        finish: `
            px-8
            py-2
            rounded-full
            font-semibold
        `,

        back: `
            px-4
            py-1.5
            rounded-full
            text-xs
            font-semibold
            flex
            items-center
            gap-1
        `,
        backProduct: `
            px-4
            py-1.5
            rounded-full
            text-xs
            font-semibold
            flex
            items-center
            gap-1
            mb-3
        `,
    };

    return (
        <button
            type={type}
            className={`
                relative
                inline-flex
                items-center
                justify-center
                transition-colors
                ${variants[variant]}
                ${sizes[size]}
            `}
            {...props}
        >
            {children}
        </button>
    );
}