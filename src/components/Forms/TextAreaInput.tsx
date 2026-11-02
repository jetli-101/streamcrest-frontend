import React from "react";

interface TextAreaProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  cols?: number;
  name?: string;
  id?: string;
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  value = "",
  onChange,
  placeholder = "",
  className = "",
  disabled = false,
  required = false,
  rows = 4,
  cols = 50,
  name = "",
  id = "",
  error,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id || name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-500" : "focus:ring-green-600"
        } ${disabled ? "cursor-not-allowed bg-gray-100" : ""} ${className}`}
        disabled={disabled}
        required={required}
        rows={rows}
        cols={cols}
        name={name}
        id={id || name}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextArea;
