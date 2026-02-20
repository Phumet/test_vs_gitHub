# GitHub Copilot Instructions - Seminar Registration System

## Project Overview

This is a **Next.js 14 seminar registration system** using **TypeScript**, **Prisma ORM**, **Tailwind CSS**, and following **Atomic Design pattern** for component architecture.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Form Validation**: React Hook Form + Zod
- **Email**: Nodemailer
- **UI Pattern**: Atomic Design
- **Component Variants**: class-variance-authority (CVA)

## Project Structure

```
├── app/                        # Next.js App Router
│   ├── page.tsx               # Main registration page
│   ├── check/                 # Check registration status
│   ├── admin/                 # Admin dashboard
│   └── api/                   # API routes
│
├── components/                # Atomic Design Structure
│   ├── atoms/                 # Basic UI elements (Button, Input, Text, etc.)
│   ├── molecules/             # Simple combinations (FormField, AlertBox, etc.)
│   ├── organisms/             # Complex components (RegistrationForm, etc.)
│   └── templates/             # Page layouts
│
├── lib/                       # Utilities and configurations
│   ├── db.ts                  # Prisma client singleton
│   ├── config.ts              # App configuration
│   ├── email.ts               # Email service
│   ├── utils.ts               # Utility functions
│   └── validations.ts         # Zod schemas
│
└── prisma/                    # Database
    ├── schema.prisma          # Database schema
    └── migrations/            # Database migrations
```

## Atomic Design Pattern

**CRITICAL**: This project strictly follows Atomic Design methodology.

### Component Hierarchy

1. **Atoms** (`components/atoms/`)
   - Most basic UI elements that cannot be broken down further
   - Examples: Button, Input, Label, Text, Spinner, Icon
   - **Rules**:
     - Use `React.forwardRef` for ref support
     - Accept `className` prop for customization
     - Use CVA for variants when applicable
     - No business logic, only presentation

2. **Molecules** (`components/molecules/`)
   - Simple combinations of atoms
   - Examples: FormField (Label + Input + Error), AlertBox, ProgressBar
   - **Rules**:
     - Compose atoms together
     - Single, focused purpose
     - Minimal state management
     - Reusable across different contexts

3. **Organisms** (`components/organisms/`)
   - Complex UI components combining molecules and atoms
   - Examples: RegistrationForm, CapacityIndicator
   - **Rules**:
     - Can have complex state and logic
     - May fetch data or handle business logic
     - Use molecules and atoms, not raw HTML

4. **Templates** (`components/templates/`)
   - Page-level layouts
   - Examples: RegistrationTemplate
   - **Rules**:
     - Define page structure
     - Compose organisms, molecules, and atoms
     - Props should be data, not children

## Coding Standards

### TypeScript

```typescript
// ✅ DO: Use explicit types for props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

// ✅ DO: Use React.forwardRef for all base components
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return <button ref={ref} className={cn(buttonVariants({ variant }))} {...props} />;
  }
);
Button.displayName = "Button";

// ❌ DON'T: Use 'any' type
// ❌ DON'T: Skip type definitions for props
```

### Component Creation

```typescript
// ✅ DO: Place components in correct atomic level
// components/atoms/icon.tsx - Basic icon wrapper
// components/molecules/form-field.tsx - Label + Input + Error
// components/organisms/registration-form.tsx - Full form with validation

// ✅ DO: Export from index files
// components/atoms/index.ts
export { Button } from "./button";
export type { ButtonProps } from "./button";

// ✅ DO: Use composition over duplication
import { FormField } from "@/components/molecules";
<FormField label="Email" type="email" required error={errors.email?.message} />

// ❌ DON'T: Repeat Label + Input + Error markup
```

### Import Conventions

```typescript
// ✅ DO: Import from atomic level directories
import { Button, Input, Text } from "@/components/atoms";
import { FormField, AlertBox } from "@/components/molecules";
import { RegistrationForm } from "@/components/organisms";

// ✅ DO: Import from central index when convenient
import { Button, FormField, RegistrationForm } from "@/components";

// ❌ DON'T: Import from old ui directory (deprecated)
// import { Button } from "@/components/ui/button"; // ❌ WRONG
```

### Styling with Tailwind

```typescript
// ✅ DO: Use CVA for component variants
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "bg-primary text-white",
      outline: "border border-gray-300",
    },
  },
});

// ✅ DO: Use cn() utility to merge classes
import { cn } from "@/lib/utils";
className={cn("base-class", conditionalClass && "extra-class", className)}

// ✅ DO: Allow className override
<Component className={cn(defaultClasses, className)} />

// ❌ DON'T: Hardcode colors, use Tailwind config tokens
// ❌ DON'T: Use inline styles unless absolutely necessary
```

### Form Handling

```typescript
// ✅ DO: Use React Hook Form + Zod validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mySchema } from "@/lib/validations";

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(mySchema),
});

// ✅ DO: Use FormField molecule for form inputs
<FormField
  label="Email"
  type="email"
  required
  error={errors.email?.message}
  {...register("email")}
/>

// ❌ DON'T: Create custom validation logic when Zod can handle it
```

### API Routes

```typescript
// ✅ DO: Use Next.js 14 App Router API conventions
// app/api/register/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  // Handle request
  return Response.json({ data });
}

// ✅ DO: Validate input with Zod schemas
const validatedData = mySchema.parse(body);

// ✅ DO: Handle errors properly
try {
  // ... logic
} catch (error) {
  if (error instanceof z.ZodError) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }
  return Response.json({ error: "Server error" }, { status: 500 });
}

// ❌ DON'T: Trust user input without validation
```

### Database with Prisma

```typescript
// ✅ DO: Use Prisma client singleton
import { prisma } from "@/lib/db";

// ✅ DO: Use try-catch for database operations
try {
  const result = await prisma.registration.create({ data });
} catch (error) {
  // Handle error
}

// ✅ DO: Use transactions for multiple operations
await prisma.$transaction([
  prisma.registration.create({ data }),
  prisma.seminar.update({ data }),
]);

// ❌ DON'T: Create new Prisma clients repeatedly
```

### Naming Conventions

```typescript
// ✅ Files: kebab-case
// registration-form.tsx
// capacity-indicator.tsx
// form-field.tsx

// ✅ Components: PascalCase
export function RegistrationForm() {}
export const Button = React.forwardRef()

// ✅ Functions: camelCase
function handleSubmit() {}
const formatDate = () => {}

// ✅ Types/Interfaces: PascalCase
interface ButtonProps {}
type Variant = "default" | "outline";

// ✅ Constants: UPPER_SNAKE_CASE or camelCase for config
const MAX_CAPACITY = 100;
export const config = { seminar: { capacity: 100 } };
```

### Accessibility

```typescript
// ✅ DO: Use semantic HTML
<button>, <input>, <label>, <form>

// ✅ DO: Include ARIA attributes when needed
<div role="alert" aria-live="polite">
<input aria-invalid={!!error} aria-describedby={errorId} />

// ✅ DO: Associate labels with inputs
<Label htmlFor="email">Email</Label>
<Input id="email" />

// ✅ DO: Use proper heading hierarchy
<h1>, <h2>, <h3> in order

// ❌ DON'T: Use divs when semantic elements exist
```

## Common Patterns

### Creating a New Form

```typescript
// 1. Define schema in lib/validations.ts
export const mySchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

// 2. Create organism component
import { FormField } from "@/components/molecules";

export function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(mySchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Name" {...register("name")} error={errors.name?.message} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Creating a New Atom

```typescript
// components/atoms/badge.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs", {
  variants: {
    variant: {
      default: "bg-primary text-white",
      secondary: "bg-gray-100 text-gray-800",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

// Add to components/atoms/index.ts
export { Badge } from "./badge";
export type { BadgeProps } from "./badge";
```

### Error Handling Pattern

```typescript
// ✅ DO: User-friendly error messages
try {
  // operation
} catch (error) {
  if (error instanceof z.ZodError) {
    setError("กรุณาตรวจสอบข้อมูลที่กรอก");
  } else {
    setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
  }
}

// ✅ DO: Use AlertBox for displaying errors
{error && <AlertBox variant="danger">{error}</AlertBox>}
```

## Environment Variables

```bash
# Required environment variables
DATABASE_URL="postgresql://..."
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
ADMIN_PASSWORD="your-admin-password"
```

## Development Workflow

1. **Add new component**: Determine atomic level first
2. **Follow naming**: kebab-case for files, PascalCase for components
3. **Export properly**: Add to index.ts of atomic level
4. **Type everything**: No implicit any types
5. **Use composition**: Reuse existing atoms and molecules
6. **Test accessibility**: Check keyboard navigation and screen readers

## Performance Guidelines

```typescript
// ✅ DO: Use "use client" only when needed
"use client"; // Only for components with hooks, event handlers

// ✅ DO: Keep server components by default
// app/page.tsx - Server component by default

// ✅ DO: Use dynamic imports for heavy components
const HeavyComponent = dynamic(() => import("./heavy"), { ssr: false });

// ✅ DO: Optimize images
import Image from "next/image";
<Image src="/path" alt="desc" width={500} height={300} />
```

## Testing Considerations

When suggesting test code:
- Use React Testing Library
- Test user behavior, not implementation
- Test accessibility attributes
- Mock Prisma client for database tests

## Language

- **UI/UX**: Thai language (ไทย)
- **Code**: English (comments, variables, functions)
- **Documentation**: Thai or English as appropriate

## When in Doubt

1. Check existing similar components
2. Follow Atomic Design hierarchy strictly
3. Prioritize TypeScript type safety
4. Keep components small and focused
5. Use composition over complexity
