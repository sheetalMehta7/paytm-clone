import React from 'react';

const Header = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-blue-500">{title}</h2>
      {subtitle && <p className="text-sm text-gray-400 mt-2">{subtitle}</p>}
    </div>
  );
};

export default Header;
