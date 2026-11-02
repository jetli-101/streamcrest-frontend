"use client";

import React from "react";

interface TextInputProps {
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  label?: string;
  id?: string;
  type?: string;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  value = "",
  onChange,
  placeholder = "",
  className = "",
  disabled = false,
  required = false,
  name = "",
  label = "",
  id = "",
  type = "text",
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
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-500" : "focus:ring-green-600"
        } ${disabled ? "cursor-not-allowed bg-gray-100" : ""} ${className}`}
        disabled={disabled}
        required={required}
        name={name}
        id={id || name}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput;
