import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../../../slice/chatSlice";
import useFormattedTimestamp from "../../../hooks/timestamp";

const ChatComponent = ({ chat }) => {
  const dispatch = useDispatch();
  const { currentChat } = useSelector((state) => state.chat);

  const handleChatClick = () => {
    dispatch(setCurrentChat(chat._id));
  };

  return (
    <div
      onClick={handleChatClick}
      key={chat._id}
      className={`${
        currentChat == chat._id && "bg-gray-400  "
      } flex cursor-pointer items-center p-3 bg-gray-200 rounded-lg hover:bg-gray-300`}
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
        <p className="text-sm text-gray-500  truncate">
          {chat.latestMessage?.content || "No messages yet"}
        </p>
      </div>

      {/* Time and Notification Section */}
      <div className="flex flex-col items-end space-y-1">
        {/* Last Message Time */}
        <span className="text-xs text-gray-400">
          {useFormattedTimestamp(chat.latestMessage?.createdAt) || ""}
        </span>

        {/* Notification Badge */}
        {false && (
          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-red-500 text-white text-xs font-bold">
            5
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
