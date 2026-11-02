import * as React from "react";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
}

const SubmitButton = React.forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ text, isLoading = false, className, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm",
          "transition-all duration-200 ease-in-out",
          "hover:bg-green-700 hover:shadow-md",
          "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
          "active:bg-green-800 active:shadow-inner",
          (disabled || isLoading) && "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg
            className="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <Send className="h-5 w-5 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5" />
        )}
        <span className="whitespace-nowrap">{text}</span>
      </button>
    );
  }
);

SubmitButton.displayName = "SubmitButton";

export { SubmitButton };
