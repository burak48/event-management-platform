import React from "react";

const buttonVariantClasses = {
    default: "bg-gray-800 text-white shadow hover:bg-gray/90",
    destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
};

const buttonSizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
};

const buttonVariants = {
    variants: buttonVariantClasses,
    size: buttonSizeClasses,
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: keyof typeof buttonVariantClasses;
    size: keyof typeof buttonSizeClasses;
    asChild?: boolean;
}

const Button = ({ className, variant, size, asChild = false, ...props }: ButtonProps) => {
    const Comp = asChild ? "span" : "button";

    const classes = `${className} ${buttonVariantClasses[variant]} ${buttonSizeClasses[size]}`;

    return (
        <Comp className={classes} {...props}>
            {props.children}
        </Comp>
    );
};

Button.displayName = "Button";

export { Button };
