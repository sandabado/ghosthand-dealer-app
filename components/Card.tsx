import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const cardVariants = cva("ui-card", {
  variants: {
    surface: { dark: "ui-card-dark", light: "ui-card-light", data: "ui-card-data" },
    padding: { none: "ui-card-none", sm: "ui-card-sm", md: "ui-card-md", lg: "ui-card-lg" },
  },
  defaultVariants: { surface: "light", padding: "md" },
});

export function Card({ className, surface, padding, ...props }: HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>) {
  return <div className={cn(cardVariants({ surface, padding }), className)} {...props} />;
}
