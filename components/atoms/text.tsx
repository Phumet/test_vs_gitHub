import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-gray-900",
      muted: "text-gray-500",
      danger: "text-danger",
      warning: "text-warning",
      secondary: "text-secondary",
      primary: "text-primary",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
    weight: "normal",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, size, weight, as: Component = "p", ...props }, ref) => {
    return (
      <Component
        className={cn(textVariants({ variant, size, weight, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Text, textVariants };
