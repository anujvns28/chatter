import React from 'react'
import Sidebar from "../components/common/Sidebar";
import Chats from "../components/common/Chats";
import ChatField from "../components/common/ChatField";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

const Home = () => {
  return (
    <div className="h-screen w-screen md:py-3 py-1 md:px-6 px-3 overflow-hidden flex flex-col">
      {/* Search box only for phones */}
      <div className="bg-blue-600 p-4 rounded-b-lg shadow-md w-full block md:hidden">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <p className="text-white text-2xl font-bold">Chatter</p>

          {/* Hamburger Menu Icon */}
          <p className="text-white text-2xl cursor-pointer">
            <GiHamburgerMenu />
          </p>
        </div>

        {/* Search Box for Small Screens */}
        <div className="w-full block md:hidden mt-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <IoSearch className="text-gray-500" />
            </span>
          </div>
        </div>
      </div>

      <div className="flex h-full  md:flex-row flex-col-reverse w-full md:gap-6 gap-2 pt-1">
        {/* sidebar */}
        <Sidebar />

        <div className="flex h-full flex-row md:gap-6 sm:gap-6 gap-3 w-full">
          {/* chats */}
          <div className="sm:w-[40%] w-full">
            <Chats />
          </div>

          {/* chat field */}
          <div className="w-full sm:flex hidden">
            <ChatField />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home
