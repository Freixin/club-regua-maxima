import React from "react";

export const Button = ({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  asChild = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 disabled:opacity-50";
  
  const variantStyles = {
    default: "bg-green-500 text-white hover:bg-green-600",
    outline: "border border-gray-600 bg-transparent hover:bg-slate-800",
    ghost: "bg-transparent hover:bg-slate-800",
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