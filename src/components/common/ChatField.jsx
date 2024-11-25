import React from "react";
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatField = () => {
  return (
    <div className="flex flex-col bg-white h-full w-full p-4 rounded-lg shadow-md border border-black">
      {/* chat info */}
      <div className="px-5  ">
        <div className="flex flex-row justify-between border-b pb-2 border-black ">
          <div className="flex flex-row gap-2">
            <div className="rounded-full text-white  flex justify-center items-center  border border-black w-[40px] h-[40px] md:w-[50px] md:h-[50px]">
              {false ? (
                <img
                  className="w-full h-full rounded-full  object-center"
                  src={user.profilePic}
                  alt="Profile"
                />
              ) : (
                <FaUser className="md:text-3xl text-2xl" />
              )}
            </div>
            <div className="flex flex-col gap-[2px]">
              <h1 className="font-bold text-xl">Anuj Yadav</h1>
              <div className="flex flex-row gap-1 text-xs">
                <p>Online - </p>
                <p>last seen,02:20pm</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 text-2xl font-semibold  items-center justify-center">
            <p>
              <FaPhoneAlt />
            </p>
            <p>
              <FaVideo />
            </p>
            <p>
              <BsThreeDotsVertical />
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto m-4">
        {/* Example messages */}
        <div className="flex justify-start mb-4">
          <div className="bg-gray-100 p-3 rounded-lg max-w-md">
            <p>Hey! How’s it going?</p>
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <div className="bg-blue-500 text-white p-3 rounded-lg max-w-md">
            <p>I'm doing great! What about you?</p>
          </div>
        </div>
      </div>

      {/* Input field */}
      <div className="flex items-center space-x-3">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Type your message..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatField;
