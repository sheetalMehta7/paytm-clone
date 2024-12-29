// components/Avatar.jsx
import React from "react";

const Avatar = ({ firstname, lastname, image, dir = "col" }) => {
  const getInitials = (firstname, lastname) =>
    `${firstname[0]}${lastname[0]}`;

  return (
    <div
      className={`flex items-center ${
        dir === "col" ? "flex-col gap-2" : "flex-row gap-3"
      }`}
    >
      {image ? (
        <img
          src={image}
          alt={`${firstname} ${lastname}`}
          className="w-16 h-16 rounded-full shadow-lg object-cover"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-secondary1 flex items-center justify-center text-black font-bold text-xl shadow-lg">
          {getInitials(firstname, lastname)}
        </div>
      )}
      <p className="text-gray-300 text-sm">{`${firstname} ${lastname}`}</p>
    </div>
  );
};

export default Avatar;
