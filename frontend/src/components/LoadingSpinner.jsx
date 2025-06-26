import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Carregando...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizeClasses[size]} spinner`}></div>
      {text && (
        <p className="text-[var(--color-text-main)] text-sm animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;