import React from "react";
import { cn } from "@/lib/utils";
import { XCircle } from "lucide-react";

interface CancelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: "default" | "subtle";
}

const CancelButton = React.forwardRef<HTMLButtonElement, CancelButtonProps>(
  ({ text = "Cancel", variant = "default", className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow-sm",
          "transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:shadow-inner",
          variant === "default"
            ? "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 active:bg-gray-300"
            : "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-700 focus:ring-gray-400 active:bg-gray-100",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        disabled={disabled}
        {...props}
      >
        <XCircle className="h-4 w-4" />
        <span className="whitespace-nowrap">{text}</span>
      </button>
    );
  }
);

CancelButton.displayName = "CancelButton";

export default CancelButton;
