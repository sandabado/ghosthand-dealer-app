import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva("ui-button", {
  variants: {
    variant: { primary: "ui-button-primary", secondary: "ui-button-secondary", ghost: "ui-button-ghost", intelligence: "ui-button-intelligence" },
    size: { sm: "ui-button-sm", md: "ui-button-md", lg: "ui-button-lg" },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

export function Button({ className, variant, size, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
