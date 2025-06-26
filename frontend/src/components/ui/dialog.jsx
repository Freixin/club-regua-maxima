import React from "react";

// Versão simplificada do Dialog sem dependências externas
const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/80" 
        onClick={() => onOpenChange(false)}
      />
      <div className="fixed z-50 grid w-full max-w-lg gap-4 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 shadow-lg sm:rounded-lg">
        {children}
      </div>
    </div>
  );
};

const DialogTrigger = ({ children, ...props }) => {
  return React.cloneElement(children, props);
};

const DialogPortal = ({ children }) => children;
const DialogOverlay = () => null;
const DialogClose = ({ children }) => children;

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <Dialog {...props}>
    {children}
  </Dialog>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }) => (
  <div className="flex flex-col space-y-1.5 text-center sm:text-left" {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }) => (
  <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2" {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2 className="text-lg font-semibold leading-none tracking-tight" {...props} ref={ref} />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p className="text-sm text-[var(--color-text-main)]/70" {...props} ref={ref} />
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};