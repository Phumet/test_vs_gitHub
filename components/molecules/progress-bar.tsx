import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: "default" | "danger" | "warning" | "success";
  showLabel?: boolean;
}

const variantColors = {
  default: "bg-secondary",
  danger: "bg-danger",
  warning: "bg-warning",
  success: "bg-green-500",
};

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, max = 100, variant = "default", showLabel = false, ...props }, ref) => {
    const percentage = Math.min((value / max) * 100, 100);

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <progress
          className="w-full h-0 opacity-0 absolute"
          value={value}
          max={max}
          aria-label="Progress"
        >
          {percentage}%
        </progress>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              variantColors[variant]
            )}
            style={{ width: `${percentage}%` }}
            aria-hidden="true"
          />
        </div>
        {showLabel && (
          <div className="mt-1 text-xs text-gray-600 text-right">
            {value} / {max}
          </div>
        )}
      </div>
    );
  }
);
ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
