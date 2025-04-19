import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// Default export for Checkbox component
const Checkbox: React.FC<CheckboxProps> = ({ label, error, ...props }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        {...props}
        className={`h-5 w-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none ${error ? 'border-red-500' : ''}`}
        aria-invalid={error ? 'true' : 'false'}
      />
      {label && <label className="text-sm text-text">{label}</label>}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Checkbox;
