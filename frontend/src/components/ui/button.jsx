import React from "react";

export const Button = ({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  asChild = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] disabled:opacity-50";
  
  const variantStyles = {
    default: "bg-[var(--color-gold)] text-[var(--color-bg-main)] hover:bg-[var(--color-gold-dark)] border-none shadow-lg",
    outline: "border border-[var(--color-gold)] bg-transparent hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-main)] text-[var(--color-gold)]",
    ghost: "bg-transparent hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-gold)] text-[var(--color-text-main)]",
  };
  
  const sizeStyles = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10",
  };

  const Comp = asChild ? React.Children.only(children).type : "button";
  
  return (
    <Comp
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {asChild ? React.cloneElement(React.Children.only(children), {}) : children}
    </Comp>
  );
};