import React, { useEffect, useState } from "react";
import { fetchAllChatHandler } from "../../service/operation/chat";

const Chats = () => {
  const [chatList, setChatList] = useState(null);

  const fetchAllChats = async () => {
    console.log("calling");
    const data = await fetchAllChatHandler();
    setChatList(data.chats);
  };

  useEffect(() => {
    fetchAllChats();
  }, []);

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="bg-white px-4 py-1 rounded-lg shadow-md h-full w-full min-w-[220px] overflow-y-auto border border-black">
        <p className="font-bold ">chats</p>
        <div className="space-y-2">
          {chatList ? (
            chatList.map((chat) => (
              <div
                key={chat._id}
                className="flex cursor-pointer items-center p-3 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                {/* Chat Image */}
                <img
                  src={chat.chatImage}
                  alt={chat.chatName}
                  className="h-12 w-12 rounded-full object-cover border border-gray-300"
                />

                {/* Chat Details */}
                <div className="ml-4 flex-1">
                  <h4 className="text-lg font-semibold">{chat.chatName}</h4>
                  <p className="text-sm text-gray-500 truncate">
                    {chat.latestMessage?.content || "No messages yet"}
                  </p>
                </div>

                {/* Time and Notification Section */}
                <div className="flex flex-col items-end space-y-1">
                  {/* Last Message Time */}
                  <span className="text-xs text-gray-400">12:05</span>

                  {/* Notification Badge */}
                  {true && (
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-red-500 text-white text-xs font-bold">
                      5
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No chats available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
