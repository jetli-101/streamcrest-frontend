"use client";

import React from "react";
import { Calendar } from "lucide-react";

interface DateInputProps {
  value?: string | null;
  onChange?: (date: string | null) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  label?: string;
  id?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  error?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  className = "",
  disabled = false,
  required = false,
  name = "",
  label = "",
  id = "",
  placeholder = "",
  min,
  max,
  error,
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={id || name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          value={value || ""}
          onChange={(e) => onChange?.(e.target.value || null)}
          className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 ${
            disabled ? "cursor-not-allowed bg-gray-100" : ""
          } ${className}`}
          disabled={disabled}
          required={required}
          name={name}
          id={id || name}
          placeholder={placeholder}
          min={min}
          max={max}
        />
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <Calendar className="h-5 w-5 text-green-600" />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default DateInput;
