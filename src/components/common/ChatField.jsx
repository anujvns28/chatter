import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import logo from "../../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSearchBox } from "../../slice/chatSlice";
import {
  fetchChatDetailsHandler,
  fetchMessageHandler,
  sendMessageHandler,
} from "../../service/operation/chat";

const ChatField = () => {
  const { currentChat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const [chatDetails, setChatDetails] = useState(null);
  const [inputField, setInputField] = useState("");
  const [messages, setMessages] = useState(null);

  const dispatch = useDispatch();

  const fetchCurrentChat = async () => {
    if (currentChat) {
      const result = await fetchChatDetailsHandler(currentChat);
      if (result) {
        setChatDetails(result.chatDetails);
      }
    }
  };

  const handleSendMessage = async () => {
    const data = {
      content: inputField,
      chatId: chatDetails._id,
    };

    await sendMessageHandler(data);
    setInputField("");
  };

  // fetching messagess
  const handleFetchingMessages = async () => {
    const result = await fetchMessageHandler(currentChat);

    if (result) {
      setMessages(result.messages);
    }
  };

  useEffect(() => {
    fetchCurrentChat();
    handleFetchingMessages();
  }, [currentChat]);

  return (
    <div className="flex flex-col bg-white h-full w-full p-4 rounded-lg shadow-md border border-black">
      {!currentChat ? (
        <div className="flex flex-col items-center justify-center h-full text-center bg-gray-50">
          {/* App Logo */}
          <div className="mb-4">
            <img
              src={logo}
              alt="Chatter Logo"
              className="w-30 h-25 md:w-28 md:h-28"
            />
          </div>

          {/* Welcome Message */}
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Welcome to <span className="text-blue-500">Chatter</span>!
          </h1>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Select a chat or start a new conversation to get started.
          </p>

          {/* Call to Action */}
          <button
            onClick={() => dispatch(setOpenSearchBox(true))}
            className="mt-6 px-6 py-2 bg-blue-500 text-white font-medium text-sm md:text-base rounded-full hover:bg-blue-600 transition"
          >
            Start a New Chat
          </button>
        </div>
      ) : (
        <div>
          {/* chat info */}
          <div className="px-5  ">
            <div className="flex flex-row justify-between border-b pb-2 border-black ">
              <div className="flex flex-row gap-2">
                <div className="rounded-full text-white  flex justify-center items-center  border border-black w-[40px] h-[40px] md:w-[50px] md:h-[50px]">
                  {chatDetails ? (
                    <img
                      className="w-full h-full rounded-full  object-center"
                      src={chatDetails?.users[0]?.profilePic}
                      alt="Profile"
                    />
                  ) : (
                    <FaUser className="md:text-3xl text-2xl" />
                  )}
                </div>
                <div className="flex flex-col gap-[2px]">
                  <h1 className="font-bold text-xl">
                    {chatDetails?.users[0]?.name}
                  </h1>
                  <div className="flex flex-row gap-1 text-xs">
                    <p>{chatDetails?.users[0]?.username}</p>
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
          <div>
            {!messages ? (
              <div></div>
            ) : (
              <div className="flex-grow overflow-y-auto m-4">
                {messages.map((message, index) => (
                  <div
                    key={message._id}
                    className={`flex ${
                      message.sender._id === user
                        ? "justify-end"
                        : "justify-start"
                    } mb-4`}
                  >
                    {/* Profile Picture */}
                    {message.sender._id !== user && (
                      <img
                        src={message.sender.profilePic} // Sender's profile pic
                        alt="User"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    )}

                    {/* Message Content and Timestamp */}
                    <div
                      className={`flex items-start ${
                        message.sender._id === user._id
                          ? "bg-blue-500 text-white ml-auto"
                          : "bg-gray-100 text-black"
                      } p-4 rounded-lg max-w-md mb-2 shadow-md hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="flex flex-col">
                        <p className="text-lg">{message.content}</p>
                        <span className="text-xs text-gray-400 mt-1">
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* If the current user is sending the message, show their profile pic on the right */}
                    {message.sender._id === user && (
                      <img
                        src={message.sender.profilePic} // Current user's profile pic
                        alt="You"
                        className="w-10 h-10 rounded-full ml-3"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input field */}
          <div className="flex items-center space-x-3">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Type your message..."
              value={inputField}
              onChange={(e) => setInputField(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatField;
