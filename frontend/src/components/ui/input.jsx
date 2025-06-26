import React from "react";

export const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border-2 border-[var(--color-text-main)]/30 bg-[var(--color-bg-secondary)] px-3 py-2 text-base font-medium text-[var(--color-text-main)] placeholder:text-[var(--color-text-main)]/70 outline-none focus:outline-none focus-visible:outline-none focus:border-[var(--color-gold)]/50 focus:ring-1 focus:ring-[var(--color-gold)]/50 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});