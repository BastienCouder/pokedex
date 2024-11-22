import { cn } from "../../lib/utils";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Loader, HelpCircle } from "../../lib/icons";
import { Tooltip } from "../../components/ui/tooltip";

const inputStyles = tv({
  base: "w-full max-w-96 rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    variant: {
      default:
        "bg-background hover:bg-input-background-hover focus:bg-input-background-active text-input-foreground border border-input-border",
      primary:
        "bg-primary hover:bg-primary-hover focus:bg-primary-active text-primary-foreground border border-primary-border",
      secondary:
        "bg-secondary hover:bg-secondary-hover focus:bg-secondary-active text-secondary-foreground border border-secondary-border",
      outline:
        "bg-transparent border border-input-border hover:bg-input-background-hover focus:bg-input-background-active text-input-foreground",
      quiet: "bg-transparent text-input-foreground",
    },
    inputSize: {
      sm: "h-8 text-sm px-2",
      md: "h-10 text-base px-4",
      lg: "h-12 text-lg px-4",
    },
    shape: {
      rectangle: "rounded-md",
      square: "rounded-none",
      circle: "rounded-full",
    },
    invalid: {
      true: "border-destructive bg-background text-destructive-foreground focus-visible:ring-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
    inputSize: "md",
    shape: "rectangle",
  },
});

type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "children" | "prefix" | "suffix"
> &
  VariantProps<typeof inputStyles> & {
    label?: string;
    description?: string;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    isInvalid?: boolean;
    errorMessage?: string;
    isLoading?: boolean;
    loaderPosition?: "prefix" | "suffix";
    placeholder?: string;
    contextualHelp?: React.ReactNode;
    inputSize?: "sm" | "md" | "lg";
  };

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      description,
      className,
      type = "text",
      prefix,
      suffix,
      isInvalid,
      errorMessage,
      contextualHelp,
      inputSize,
      shape,
      isLoading,
      loaderPosition = "prefix",
      ...props
    },
    ref,
  ) => {
    const renderPrefix =
      isLoading && loaderPosition === "prefix" ? (
        <Loader className="mr-2 animate-rotate" />
      ) : (
        prefix
      );

    const renderSuffix =
      isLoading && loaderPosition === "suffix" ? (
        <Loader className="ml-2" />
      ) : (
        suffix
      );

    return (
      <div className={cn("w-full max-w-96", className)}>
        {label ||
          (contextualHelp && (
            <label className="text-sm font-medium flex items-center gap-1 mb-1">
              {label}
              {contextualHelp && (
                <Tooltip content={contextualHelp} offset={5}>
                  <HelpCircle className="h-4 w-4" />
                </Tooltip>
              )}
            </label>
          ))}
        <div className="relative flex items-center gap-x-2">
          {renderPrefix && (
            <span className="absolute left-3 inset-y-0 flex items-center z-40 text-gray-400 w-5">
              {renderPrefix}
            </span>
          )}
          <input
            type={type}
            className={cn(
              inputStyles({ invalid: isInvalid, inputSize, shape }),
              className,
              {
                "pl-11": renderPrefix,
                "pr-10": renderSuffix,
              },
            )}
            ref={ref}
            {...props}
          />
          {renderSuffix && (
            <span className="absolute right-3 inset-y-0 flex z-20 items-center text-gray-400 w-5">
              {renderSuffix}
            </span>
          )}
        </div>
        {isInvalid && errorMessage && (
          <p className="text-xs text-destructive mt-1">{errorMessage}</p>
        )}
        {!isInvalid && description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";

export type { TextFieldProps };
export { TextField };
