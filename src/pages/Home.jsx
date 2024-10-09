import React from 'react'
import Sidebar from "../components/common/Sidebar";
import Chats from "../components/common/Chats";
import ChatField from "../components/common/ChatField";

const Home = () => {
  return (
    <div className="flex md:flex-row flex-col h-screen w-screen md:py-3 py:1 md:px-6 px-3 md:gap-6 gap-2 overflow-hidden">
      {/* sidebar */}
      <Sidebar />

      <div className="flex flex-row md:gap-6  sm:gap-6 gap-3 w-full">
        {/* chats */}
        <div className="w-full sm:flex hidden">
          <Chats />
        </div>

        {/* chat field */}
        <ChatField />
      </div>
    </div>
  );
};

export default Home
