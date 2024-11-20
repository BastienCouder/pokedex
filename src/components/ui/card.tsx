import * as React from "react";
import { cn } from "../../lib/utils";
import { tv, VariantProps } from "tailwind-variants";

const cardStyles = tv({
    base: "rounded-lg border shadow-sm p-2 md:px-4 md:py-2",
    variants: {
        variant: {
            default:
                "bg-neutral/70 hover:bg-neutral active:bg-neutral text-neutral-foreground",
            outline:
                "border border-border bg-transparent hover:bg-neutral/10 active:bg-neutral/20 text-foreground disabled:opacity-50",
            success:
                "bg-success hover:bg-success active:bg-success text-success-foreground",
            warning:
                "bg-warning hover:bg-warning active:bg-warning text-warning-foreground",
            danger:
                "bg-destructive hover:bg-destructive active:bg-destructive text-destructive-foreground",
        },
        shape: {
            rectangle: "",
            square: "rounded-sm",
            circle: "rounded-full",
        },
    },
    defaultVariants: {
        variant: "outline",
        shape: "rectangle",
    },
});

type CardVariants = VariantProps<typeof cardStyles>;

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & CardVariants
>(({ className, variant, shape, ...props }, ref) => {
    const cardClassName = cn(cardStyles({ variant, shape }), className);
    return <div ref={ref} className={cardClassName} {...props} />;
});

Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & CardVariants
>(({ className, ...props }, ref) => {
    const headerClassName = cn("flex flex-col space-y-1.5 p-4", className);
    return <div ref={ref} className={headerClassName} {...props} />;
});

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLDivElement> & CardVariants
>(({ className, ...props }, ref) => {
    const titleClassName = cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className,
    );
    return <h3 ref={ref} className={titleClassName} {...props} />;
});

CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement> & CardVariants
>(({ className, ...props }, ref) => {
    const descriptionClassName = cn("text-sm text-muted-foreground", className);
    return <p ref={ref} className={descriptionClassName} {...props} />;
});

CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & CardVariants
>(({ className, ...props }, ref) => {
    const contentClassName = cn("p-4 pt-0", className);
    return <div ref={ref} className={contentClassName} {...props} />;
});

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & CardVariants
>(({ className, ...props }, ref) => {
    const footerClassName = cn("flex items-center p-4 pt-0", className);
    return <div ref={ref} className={footerClassName} {...props} />;
});

CardFooter.displayName = "CardFooter";

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
};
