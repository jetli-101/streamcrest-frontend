import React, { ChangeEventHandler } from "react";

interface NumberInputProps {
  value?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number;
  name?: string;
  label?: string;
  id?: string;
  error?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange = () => {},
  placeholder = "",
  label = "",
  className = "",
  disabled = false,
  required = false,
  min,
  max,
  step = 1,
  name = "",
  id = "",
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
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 ${
          disabled ? "cursor-not-allowed bg-gray-100" : ""
        } ${className}`}
        disabled={disabled}
        required={required}
        min={min}
        max={max}
        step={step}
        name={name}
        id={id || name}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default NumberInput;
