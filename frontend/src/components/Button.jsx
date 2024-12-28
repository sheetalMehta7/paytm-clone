import React from 'react';

const Button = ({ children, onClick, type = 'button', className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-2 px-4 rounded-md transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
