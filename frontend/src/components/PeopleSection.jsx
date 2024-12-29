// components/PeopleSection.jsx
import React, { useState } from "react";
import Avatar from "./Avatar";
import { people } from "../util/mockData";

const PeopleSection = () => {
  const [showAll, setShowAll] = useState(false);

  const visiblePeople = showAll ? people : people.slice(0, 9);

  return (
    <div className="bg-black1 p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-white text-xl font-bold mb-4">People</h2>

      <div className="grid grid-cols-5 gap-6">
        {visiblePeople.map((person) => (
          <Avatar
            key={person.id}
            firstname={person.firstname}
            lastname={person.lastname}
            image={person.image}
          />
        ))}

        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-white text-3xl">
              {showAll ? "↑" : "↓"} 
            </span>
          </div>
          <p className="text-gray-300 mt-2 text-sm">
            {showAll ? "Show Less" : "Show More"} 
          </p>
        </div>
      </div>
    </div>
  );
};

export default PeopleSection;
