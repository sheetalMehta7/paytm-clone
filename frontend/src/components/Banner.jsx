import React from "react";
import leftImage from "../assets/transfer.svg";
import rightImage from "../assets/coin.svg"

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-r from-primarySolid to-primaryGradient-end text-white p-10 rounded-lg shadow-lg flex justify-center items-center">
      <img
        src={leftImage}
        alt="Coin"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 max-w-xl"
      />
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold leading-tight">Your Payments Made Easy!</h1>
        <p className="text-lg">
          Easily send money to your friends, family, or anyone with just a few clicks.
        </p>
        <button className="bg-secondary1 text-black px-6 py-3 mt-4 rounded-lg shadow hover:bg-purple-950 hover:text-gray-300 transition">
          Get Started →
        </button>
      </div>
      <img
        src={rightImage}
        alt="Referral"
        className="absolute right-5 top-1/2 transform -translate-y-1/2 max-w-72"
      />
    </div>
  );
};
export default Banner;
