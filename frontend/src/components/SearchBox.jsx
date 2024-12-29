// components/SearchBox.jsx
import React, { useState } from "react";
import Modal from "./SearchModal";
import { useNavigate } from "react-router-dom";
import { people } from "../util/mockData";
import Avatar from "./Avatar";
import { IoSearchOutline } from "react-icons/io5";

const SearchBox = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredUsers = people.filter((user) =>
    `${user.firstname} ${user.lastname}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mb-6">
      {/* Search Button */}
      <button
        className="text-white text-opacity-80 p-3 rounded-full flex items-center shadow-lg w-full border border-zinc-700"
        onClick={() => setModalOpen(true)}
      >
        <IoSearchOutline className="mr-3"/> Pay your friends and family by name
      </button>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-white text-lg font-bold mb-4">Pay anyone on Paytm</h2>
        <div className="relative mb-4">
          <IoSearchOutline className="mr-3 absolute left-4 top-3 text-gray-400 "/> 
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full bg-gray-800 text-white pl-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primarySolid"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* User List */}
        <ul className="space-y-4 max-h-60 h-100 overflow-y-auto scrollbar-thin">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center cursor-pointer p-2 rounded hover:bg-gray-700"
              onClick={() => {
                setModalOpen(false);
                navigate(`/user/${user.id}`);
              }}
            >
              {/* Avatar */}
              <Avatar firstname={user.firstname} lastname={user.lastname} image={user.image} dir="row"/>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default SearchBox;
