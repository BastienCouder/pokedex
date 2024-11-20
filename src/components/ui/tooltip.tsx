import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../lib/utils";
import { tv } from "tailwind-variants";

const tooltipVariants = tv({
    base: "overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground",
            outline: "border bg-background text-foreground",
            secondary: "bg-secondary text-secondary-foreground",
        },
    },
    defaultVariants: {
        variant: "secondary",
    },
});

const TooltipProvider = TooltipPrimitive.Provider;

interface TooltipProps {
    children: React.ReactNode | string;
    content?: React.ReactNode;
    variant?: "default" | "outline" | "secondary";
    placement?: "top" | "right" | "bottom" | "left";
    offset?: number;
    delay?: number;
    shouldFlip?: boolean;
    arrow?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
    children,
    content,
    variant,
    placement = "top",
    offset = 10,
    delay = 0,
    shouldFlip = true,
    arrow = false,
    ...props
}) => {
    const wrappedChildren =
        typeof children === "string" || typeof children === "number" ? (
            <>{children}</>
        ) : (
            children
        );

    return (
        <TooltipProvider>
            <TooltipPrimitive.Root delayDuration={delay} {...props}>
                {content ? (
                    <>
                        <TooltipTrigger asChild>{wrappedChildren}</TooltipTrigger>
                        <TooltipContent
                            variant={variant}
                            placement={placement}
                            offset={offset}
                            shouldFlip={shouldFlip}
                            arrow={arrow}
                        >
                            {content}
                        </TooltipContent>
                    </>
                ) : (
                    wrappedChildren
                )}
            </TooltipPrimitive.Root>
        </TooltipProvider>
    );
};

const TooltipTrigger = TooltipPrimitive.Trigger;

interface TooltipContentProps
    extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
    placement?: "top" | "right" | "bottom" | "left";
    offset?: number;
    shouldFlip?: boolean;
    arrow?: boolean;
    variant?: "default" | "outline" | "secondary";
}

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    TooltipContentProps
>(
    (
        {
            className,
            variant,
            placement = "top",
            offset = 2,
            shouldFlip = true,
            arrow = false,
            ...props
        },
        ref,
    ) => (
        <TooltipPrimitive.Content
            ref={ref}
            side={placement}
            sideOffset={offset}
            avoidCollisions={shouldFlip}
            className={cn(tooltipVariants({ variant, className }))}
            {...props}
        >
            {props.children}
            {arrow && (
                <TooltipPrimitive.Arrow className="fill-current text-popover" />
            )}
        </TooltipPrimitive.Content>
    ),
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const TooltipArrow = TooltipPrimitive.TooltipArrow;

const TooltipRoot: React.FC<{ children: React.ReactNode; delay?: number }> = ({
    children,
    delay,
}) => {
    return (
        <TooltipProvider>
            <TooltipPrimitive.Root delayDuration={delay}>
                {children}
            </TooltipPrimitive.Root>
        </TooltipProvider>
    );
};

export {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
    TooltipRoot,
    TooltipArrow,
};
