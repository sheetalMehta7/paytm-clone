// components/RightSidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAccountBalance } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { MdModeEdit } from "react-icons/md";

const RightSidebar = ({ firstname = "Arjun", lastname = "Singh", image = null }) => {
  const navigate = useNavigate();

  const getInitials = (firstname, lastname) => `${firstname[0]}${lastname[0]}`;

  const handleEditProfilePhoto = () => {
    alert("Edit profile photo functionality goes here");
  };

  const handleLogout = () => {
    alert("Logout functionality goes here");
  };

  const options = [
    {
      label: "See Transaction History",
      icon: LuHistory,
      onClick: () => navigate("/transaction-history"),
    },
    {
      label: "Check Account Balance",
      icon: MdOutlineAccountBalance,
      onClick: () => navigate("/account-balance"),
    },
    {
      label: "Settings",
      icon: IoSettingsOutline,
      onClick: () => navigate("/settings"),
    },
  ];

  return (
    <div className="w-64 bg-black1 text-white py-6 space-y-6 h-screen flex flex-col justify-between">
      <div>
        <div className="text-center">
          <div className="relative inline-block">
            {image ? (
              <img
                src={image}
                alt={`${firstname} ${lastname}`}
                className="w-20 h-20 rounded-full shadow-lg object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-secondary1 flex items-center justify-center text-black font-bold text-xl shadow-lg">
                {getInitials(firstname, lastname)}
              </div>
            )}
            {/* Edit Button */}
            <button
              onClick={handleEditProfilePhoto}
              className="absolute flex items-center justify-center bottom-0 right-1 w-6 h-6 bg-purple-500 text-white rounded-full shadow hover:bg-primarySolid transition"
            >
              <MdModeEdit/>
            </button>
          </div>
          <h3 className="text-lg font-bold mt-4">{`${firstname} ${lastname}`}</h3>
          <p className="text-sm text-gray-400">+91-9876543210</p>
        </div>

        <div className="w-full border-t border-gray-500 mt-6"></div>

        <div className="px-4 mt-6">
          <h4 className="text-lg font-semibold mb-4">Manage Your Money</h4>
          <div className="flex flex-col gap-4">
            {options.map(({ label, icon: Icon, onClick }) => (
              <button
                key={label}
                onClick={onClick}
                className="flex items-center gap-3 text-gray-300 hover:text-purple-500 p-2 rounded transition"
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Logout */}
      <div className="px-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-600 hover:text-red-500 p-2 rounded transition"
        >
          <IoIosLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
