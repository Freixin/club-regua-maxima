import React from "react";

export const Badge = ({ variant = "default", className = "", ...props }) => {
  const variantStyles = {
    default: "bg-green-500/10 text-green-400 border-green-500/20",
    secondary: "bg-slate-800 text-gray-300 border-gray-700",
    outline: "bg-transparent border border-gray-700 text-gray-300",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
};