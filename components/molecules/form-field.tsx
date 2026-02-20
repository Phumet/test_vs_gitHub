import * as React from "react";
import { Input, Label, Text } from "../atoms";
import type { InputProps } from "../atoms";

export interface FormFieldProps extends InputProps {
  label: string;
  error?: string;
  required?: boolean;
  helperText?: string;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, required, helperText, id, className, ...props }, ref) => {
    const inputId = id || `field-${label.toLowerCase().replaceAll(/\s+/g, "-")}`;
    
    const getAriaDescribedBy = () => {
      if (error) return `${inputId}-error`;
      if (helperText) return `${inputId}-helper`;
      return undefined;
    };

    return (
      <div className="space-y-2">
        <Label htmlFor={inputId}>
          {label} {required && <span className="text-danger">*</span>}
        </Label>
        <Input
          id={inputId}
          ref={ref}
          className={className}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={getAriaDescribedBy()}
          {...props}
        />
        {error && (
          <Text
            id={`${inputId}-error`}
            variant="danger"
            size="sm"
            role="alert"
          >
            {error}
          </Text>
        )}
        {helperText && !error && (
          <Text
            id={`${inputId}-helper`}
            variant="muted"
            size="xs"
          >
            {helperText}
          </Text>
        )}
      </div>
    );
  }
);
FormField.displayName = "FormField";

export { FormField };
