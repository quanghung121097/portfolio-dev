import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /* Primary CTA — 10 % accent rule: only for the most important action */
        default:
          "bg-accent text-white hover:bg-accent/85 active:scale-[0.98] shadow-[0_0_24px_rgba(255,69,0,0.20)] hover:shadow-[0_0_32px_rgba(255,69,0,0.30)]",
        /* Secondary — 30 % surface tone, no accent fill */
        outline:
          "border border-white/10 bg-card text-foreground hover:bg-white/5 hover:border-white/20",
        ghost:
          "hover:bg-white/5 text-muted-foreground hover:text-foreground",
        secondary:
          "bg-card text-foreground border border-white/8 hover:border-white/15 hover:bg-muted",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm:      "h-9 px-4 text-xs",
        lg:      "h-12 px-8 text-base",
        icon:    "h-10 w-10",
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
