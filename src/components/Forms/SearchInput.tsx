"use client";

import { Search } from "lucide-react";

interface SearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  className?: string;
}

export default function SearchInput({
  placeholder = "Search something...",
  value = "",
  onChange,
  onSubmit,
  className = "",
}: SearchProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 p-2.5 pr-8 text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button
        onClick={onSubmit}
        className="absolute right-1 top-1/2 -translate-y-1/2 transform rounded-full p-2 text-gray-500 transition hover:bg-gray-200"
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
}
