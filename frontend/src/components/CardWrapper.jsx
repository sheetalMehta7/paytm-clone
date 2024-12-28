import React from 'react';

const CardWrapper = ({ children }) => {
  return (
    <div className="max-w-md w-full bg-gray-800 shadow-lg rounded-lg p-6">
      {children}
    </div>
  );
};

export default CardWrapper;
