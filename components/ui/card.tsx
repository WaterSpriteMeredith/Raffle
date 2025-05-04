import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// Default export for Card component
const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-black text-white shadow-xl rounded-lg overflow-hidden border-4 border-gold ${className}`}>
      {children}
    </div>
  );
};

export default Card;
