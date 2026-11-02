import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-white hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-white hover:bg-secondary/80",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-500/80",
        outline:
          "border-border text-black hover:bg-accent hover:text-accent-foreground",
        info: "border-border bg-sky-500 text-white hover:bg-sky-500/80",
        subtle:
          "border-border bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100",
        ghost: "border-border bg-transparent text-foreground hover:bg-accent",
        inverse:
          "border-border bg-foreground text-background hover:bg-foreground/90",
        success:
          "border-transparent bg-green-600 text-white hover:bg-green-600/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }: any) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
