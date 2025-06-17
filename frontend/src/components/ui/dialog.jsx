import React, { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export const Dialog = ({ children, ...props }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      <div {...props}>
        {children}
      </div>
    </DialogContext.Provider>
  );
};

export const DialogTrigger = ({ children, asChild, ...props }) => {
  const { setOpen } = useContext(DialogContext);
  
  const handleClick = () => {
    setOpen(true);
  };

  if (asChild) {
    return React.cloneElement(children, {
      onClick: handleClick,
      ...props
    });
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

export const DialogContent = ({ children, className = "", ...props }) => {
  const { open, setOpen } = useContext(DialogContext);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={() => setOpen(false)}
      />
      
      {/* Dialog content */}
      <div 
        className={`relative bg-slate-900 border border-gray-700 rounded-lg shadow-lg max-w-lg w-full m-4 p-6 ${className}`}
        {...props}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export const DialogHeader = ({ children, ...props }) => {
  return (
    <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4" {...props}>
      {children}
    </div>
  );
};

export const DialogTitle = ({ children, className = "", ...props }) => {
  return (
    <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
      {children}
    </h2>
  );
};

export const DialogDescription = ({ children, className = "", ...props }) => {
  return (
    <p className={`text-sm text-gray-400 ${className}`} {...props}>
      {children}
    </p>
  );
};