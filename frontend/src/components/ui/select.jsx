import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

// Versão simplificada do Select sem dependências externas
const Select = ({ children, value, onValueChange, defaultValue }) => {
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || "");
  const [open, setOpen] = useState(false);
  
  const handleSelect = (value) => {
    setSelectedValue(value);
    if (onValueChange) onValueChange(value);
    setOpen(false);
  };
  
  return (
    <div className="relative">
      {React.Children.map(children, child => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, { 
            onClick: () => setOpen(!open),
            selectedValue
          });
        }
        if (child.type === SelectContent) {
          return open ? React.cloneElement(child, { 
            onSelect: handleSelect,
            selectedValue
          }) : null;
        }
        return child;
      })}
    </div>
  );
};

const SelectGroup = ({ children }) => <div>{children}</div>;

const SelectValue = ({ children }) => <span>{children}</span>;

const SelectTrigger = React.forwardRef(({ className, children, selectedValue, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm",
      className
    )}
    {...props}
  >
    {selectedValue || children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </button>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = React.forwardRef(({ className, children, onSelect, selectedValue, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-main)] shadow-md",
      className
    )}
    {...props}
  >
    <div className="p-1">
      {React.Children.map(children, child => {
        if (child.type === SelectItem) {
          return React.cloneElement(child, { 
            onSelect,
            selected: child.props.value === selectedValue
          });
        }
        return child;
      })}
    </div>
  </div>
));
SelectContent.displayName = "SelectContent";

const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

const SelectItem = React.forwardRef(({ className, children, value, onSelect, selected, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-gold)]",
      selected && "bg-[var(--color-gold)]/10 text-[var(--color-gold)]",
      className
    )}
    onClick={() => onSelect && onSelect(value)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {selected && <Check className="h-4 w-4" />}
    </span>
    {children}
  </div>
));
SelectItem.displayName = "SelectItem";

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-[var(--color-border)]", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};