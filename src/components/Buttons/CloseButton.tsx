import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface CloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
}

const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ className, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "p-1",
      md: "p-2",
      lg: "p-3",
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "rounded-full text-gray-500 transition-colors duration-200",
          "hover:bg-gray-200 hover:text-gray-700",
          "focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
          "active:bg-gray-300",
          sizeClasses[size],
          className
        )}
        aria-label="Close"
        {...props}
      >
        <X
          className={cn(
            "h-4 w-4",
            size === "sm" && "h-3 w-3",
            size === "lg" && "h-5 w-5"
          )}
        />
      </button>
    );
  }
);

CloseButton.displayName = "CloseButton";

export { CloseButton };
