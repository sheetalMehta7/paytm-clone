import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="text-center">
        {/* Animated Banner Section */}
        <h1 className="text-6xl font-extrabold text-blue-500 animate-pulse mb-4 max-w-5xl">
          India&apos;s Most-loved Payments App{" "}
          <span className="text-yellow-300">Paytm</span>
        </h1>
        <p className="text-lg text-gray-400 mb-12 mx-auto">
          Recharge & pay bills, book flights & movie tickets, invest in stocks &
          mutual funds, and do a lot more.
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-4 justify-center">
          <Link to="/login">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-6 py-3 bg-gray-700 text-white font-medium text-lg rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
