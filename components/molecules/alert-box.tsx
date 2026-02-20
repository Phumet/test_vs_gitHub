import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Text } from "../atoms";

const alertVariants = cva(
  "rounded-lg border p-4",
  {
    variants: {
      variant: {
        default: "bg-gray-50 border-gray-200 text-gray-900",
        danger: "bg-red-50 border-red-200 text-danger",
        warning: "bg-yellow-50 border-yellow-200 text-warning",
        success: "bg-green-50 border-green-200 text-green-700",
        info: "bg-blue-50 border-blue-200 text-blue-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertBoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
}

const AlertBox = React.forwardRef<HTMLDivElement, AlertBoxProps>(
  ({ className, variant, title, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {title && (
          <Text weight="semibold" size="sm" className="mb-1">
            {title}
          </Text>
        )}
        <Text size="sm">{children}</Text>
      </div>
    );
  }
);
AlertBox.displayName = "AlertBox";

export { AlertBox, alertVariants };
