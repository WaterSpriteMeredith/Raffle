import React from 'react';

// Define the custom Input props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-text mb-1">{label}</label>}
      <input
        {...props}
        className={`w-full px-4 py-2 rounded-md bg-white border-2 border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none text-text placeholder-gray-400 shadow-sm transition-all duration-300 ${
          error ? 'border-red-500' : ''
        }`}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
