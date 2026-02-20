import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  ({ icon: IconComponent, size = "md", className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("inline-flex", className)} {...props}>
        <IconComponent className={sizeMap[size]} />
      </div>
    );
  }
);
Icon.displayName = "Icon";

export { Icon };
