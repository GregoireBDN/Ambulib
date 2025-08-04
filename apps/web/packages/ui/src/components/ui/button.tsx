import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm",
        success: "bg-green-600 hover:bg-green-700 text-white shadow-sm",
        warning: "bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-sm",
        purple: "bg-purple-600 hover:bg-purple-700 text-white shadow-sm",
        "outline-primary":
          "border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent",
        "outline-success":
          "border-green-600 text-green-600 hover:bg-green-50 bg-transparent",
        "outline-warning":
          "border-yellow-400 text-yellow-600 hover:bg-yellow-50 bg-transparent",
        "outline-purple":
          "border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent",
        "action-primary":
          "bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl",
        "action-success":
          "bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl",
        "action-purple":
          "bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg hover:shadow-xl",
        "cta-primary":
          "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 text-lg shadow-lg",
        "cta-secondary":
          "bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 border-2 border-white shadow-lg",
        "cta-warning":
          "bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-4 text-lg shadow-lg",
        "cta-white":
          "bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-lg",
        "cta-outline-white":
          "border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg bg-transparent",
        social:
          "border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white text-gray-700 font-semibold shadow-sm hover:shadow-md transition-all duration-200",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-9 w-9",
        action: "h-12 px-6 py-3 text-base font-semibold",
        cta: "h-14 px-10 py-4 text-lg font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
