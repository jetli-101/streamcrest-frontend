"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SelectContext = React.createContext<any>({});

const Select = ({ children, value, onChange }: any) => {
  const [placeholder, setPlaceholder] = React.useState<any>(null);

  return (
    <SelectContext.Provider value={{ value, onChange, placeholder, setPlaceholder }}>
      {children}
    </SelectContext.Provider>
  );
};

const SelectTrigger = React.forwardRef<any, any>(
  ({ className, children }: any, ref: any) => {
    const { value, onChange, placeholder } = React.useContext(SelectContext);

    return (
      <div className="relative w-full">
        <select
          ref={ref}
          value={value}
          onChange={onChange}
          className={cn(
            "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full appearance-none items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          {placeholder && !value && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown className="h-4 w-4 opacity-50" />
        </div>
      </div>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = ({ children }: any) => <>{children}</>;

const SelectItem = ({ value, children }: any) => (
  <option value={value}>{children}</option>
);

const SelectGroup = ({ children }: any) => <optgroup>{children}</optgroup>;

const SelectLabel = ({ children }: any) => <option disabled>{children}</option>;

const SelectSeparator = () => <option disabled>──────────</option>;

const SelectValue = ({ placeholder }: any) => {
  const ctx = React.useContext(SelectContext);
  React.useEffect(() => {
    if (placeholder) {
      ctx?.setPlaceholder?.(placeholder);
    }
  }, [placeholder]);

  return null;
};

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
