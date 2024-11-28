import React, { useEffect, useState } from "react";
import { fetchAllChatHandler } from "../../service/operation/chat";
import ChatComponent from "../core/chat/ChatComponent";

const Chats = () => {
  const [chatList, setChatList] = useState(null);

  const fetchAllChats = async () => {
    const data = await fetchAllChatHandler();
    setChatList(data.chats);
  };

  useEffect(() => {
    fetchAllChats();
  }, []);

  console.log("calling", chatList);

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="bg-white px-4 py-1 rounded-lg shadow-md h-full w-full min-w-[220px] overflow-y-auto border border-black">
        <p className="font-bold ">chats</p>
        <div className="space-y-2">
          {chatList ? (
            chatList.map((chat) => <ChatComponent chat={chat} />)
          ) : (
            <p className="text-center text-gray-500">No chats available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
