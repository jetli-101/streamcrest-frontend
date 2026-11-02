"use client";

interface CheckboxProps {
  id?: string;
  name?: string;
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export default function Checkbox({
  id = "",
  name = "",
  label = "",
  checked = false,
  onChange = () => {},
  disabled = false,
}: CheckboxProps) {
  return (
    <label
      className={`inline-flex items-center space-x-2 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        className="peer hidden"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <div className="flex h-4 w-4 items-center justify-center rounded-md border-2 border-gray-400 peer-checked:border-green-600 peer-checked:bg-green-600">
        {checked && (
          <svg
            className="h-3 w-3 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M20.707 5.293a1 1 0 00-1.414 0L9 15.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l11-11a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <span>{label}</span>
    </label>
  );
}
