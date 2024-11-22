import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, tv } from "tailwind-variants";
import { Loader } from "../../lib/icons";
import { cn } from "../..//lib/utils";

const buttonStyles = tv(
  {
    base: "inline-flex gap-2 cursor-pointer items-center justify-center whitespace-nowrap rounded-md leading-normal text-sm shrink-0 font-medium ring-offset-background transition-colors disabled:cursor-default disabled:opacity-50",
    variants: {
      variant: {
        default:
          "bg-neutral hover:bg-neutral active:bg-neutral text-neutral-foreground",
        primary:
          "bg-primary hover:bg-primary active:bg-primary text-primary-foreground",
        secondary:
          "bg-secondary hover:bg-secondary active:bg-secondary text-secondary-foreground",
        quiet:
          "bg-transparent hover:bg-neutral/10 active:bg-neutral/20 text-foreground",
        link: "bg-transparent hover:transparent underline active:underline text-foreground",
        outline:
          "border border-border bg-transparent hover:bg-neutral/10 active:bg-neutral/20 text-foreground",
        success:
          "bg-success hover:bg-success active:bg-success text-success-foreground",
        warning:
          "bg-warning hover:bg-warning active:bg-warning text-warning-foreground",
        danger:
          "bg-destructive hover:bg-destructive  active:bg-destructive text-destructive-foreground",
      },
      size: {
        sm: "h-8 px-3 [&_svg]:w-4 [&_svg]:h-4",
        md: "h-9 px-4 [&_svg]:w-4 [&_svg]:h-4",
        lg: "h-10 px-5 [&_svg]:w-5 [&_svg]:h-5",
        icon: "h-10 w-10",
      },
      shape: {
        rectangle: "",
        square: "",
        circle: "rounded-full",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        shape: ["square", "circle"],
        className: "w-8 px-0",
      },
      {
        size: "md",
        shape: ["square", "circle"],
        className: "w-9 px-0",
      },
      {
        size: "lg",
        shape: ["square", "circle"],
        className: "w-10 px-0",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "rectangle",
    },
  },
  {
    responsiveVariants: ["sm", "lg"],
  },
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "prefix">,
    VariantProps<typeof buttonStyles> {
  asChild?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  children?: React.ReactNode;
  suffix?: React.ReactNode;
  href?: string;
  target?: string;
  prefix?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      isLoading,
      isDisabled,
      children,
      prefix,
      suffix,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const Element: React.ElementType = props.href ? "a" : Comp;

    return (
      <Element
        className={cn(buttonStyles({ variant, size, shape }), className)}
        ref={ref}
        disabled={isDisabled || isLoading}
        {...props}
      >
        {isLoading && <Loader aria-label="loading" className="animate-spin" />}
        {prefix}
        {children}
        {suffix}
      </Element>
    );
  },
);
Button.displayName = "Button";

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonStyles };
