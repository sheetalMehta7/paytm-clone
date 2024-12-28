import React from 'react';

const Banner = ({ image, onProfileClick }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-blue-600 rounded-lg text-white">
      <div>
        <img src={image} alt="Banner Animation" className="h-16 w-16" />
      </div>
      <div>
        <input
          type="text"
          placeholder="Search users..."
          className="px-4 py-2 rounded-md text-gray-900"
        />
      </div>
      <button onClick={onProfileClick} className="rounded-full bg-gray-800 p-2">
        <img src="/profile-icon.png" alt="Profile" className="h-8 w-8 rounded-full" />
      </button>
    </div>
  );
};

export default Banner;
