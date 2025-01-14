import React, { useContext, useEffect, useState } from "react";
import { fetchAllChatHandler } from "../../service/operation/chat";
import ChatComponent from "../core/chat/ChatComponent";
import { SocketContext } from "../../socketContext";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setNotifactionCount } from "../../slice/chatSlice";

const Chats = () => {
  const [chatList, setChatList] = useState(null);
  const { notificationCaount, currentChat } = useSelector(
    (state) => state.chat
  );
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const socket = useContext(SocketContext);

  const fetchAllChats = async () => {
    const data = await fetchAllChatHandler(token);
    setChatList(data.chats);
  };

  useEffect(() => {
    fetchAllChats();
  }, [notificationCaount]);

  if (socket && !socket.hasListeners("acceptRequest")) {
    socket.on("acceptRequest", () => {
      toast.success("Request Accepted");
      const nom = notificationCaount + 1;
      dispatch(setNotifactionCount(nom));
      fetchAllChats();
    });
  }

  useEffect(() => {
    if (socket) {
      socket.on("updateChat", async (data) => {
        fetchAllChats();
      });
    }

    return () => {
      if (socket) {
        socket.off("updateChat");
      }
    };
  }, [socket]);


  return (
    <div className="flex  h-full flex-col gap-3">
      <div className=" bg-white px-4 py-1 rounded-lg shadow-md h-full w-full min-w-[220px] overflow-y-auto border border-black">
        <p className="font-bold ">chats</p>
        <div className="space-y-2">
          {chatList ? (
            chatList.map((chat) => (
              <ChatComponent
                chat={chat}
                setChatList={setChatList}
                chatList={chatList}
              />
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
