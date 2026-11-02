"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DefaultButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
  text,
  onClick = () => {},
  disabled = false,
  icon,
  type = "button",
  className = "",
}) => {
  const baseClass =
    "rounded bg-green-600 px-3 py-2 text-sm text-white transition-colors duration-200 hover:bg-green-700";
  const disabledClass = disabled ? "cursor-not-allowed opacity-50" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClass, disabledClass, className)}
    >
      <div className="flex items-center justify-center gap-2">
        {icon}
        <span className="whitespace-nowrap">{text}</span>
      </div>
    </button>
  );
};

export default DefaultButton;
