import React, { useEffect, useRef, useState } from "react";
import { FaUser, FaPhoneAlt, FaVideo } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import logo from "../../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSearchBox } from "../../slice/chatSlice";
import {
  fetchChatDetailsHandler,
  fetchMessageHandler,
  sendMessageHandler,
  updateMessageReadStatusHandler,
} from "../../service/operation/chat";
import useSocketConnection from "../../hooks/socket";

const ChatField = () => {
  const { currentChat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const [chatDetails, setChatDetails] = useState(null);
  const [inputField, setInputField] = useState("");
  const [messages, setMessages] = useState(null);
  const dispatch = useDispatch();
  const chatEndRef = useRef();
  const socket = useSocketConnection();

  // fetching curret chat detils
  const fetchCurrentChat = async () => {
    if (currentChat) {
      const result = await fetchChatDetailsHandler(currentChat);
      if (result) setChatDetails(result.chatDetails);
    }
  };

  // fetching current chat messagess
  const handleFetchingMessages = async () => {
    if (currentChat) {
      const result = await fetchMessageHandler(currentChat);
      if (result) {
        setMessages(result.messages);
        // Find unread messages
        const unreadMessages = result.messages.filter(
          (message) => !message.isRead && message.sender._id !== user._id
        );

        // Update unread message status
        if (unreadMessages.length) {
          await updateMessageReadStatusHandler(currentChat);
        }
      }
    }
  };

  useEffect(() => {
    fetchCurrentChat();
    handleFetchingMessages();
  }, [currentChat]);

  // sending message to user
  const handleSendMessage = async () => {
    if (!inputField.trim()) return;

    const data = { content: inputField, chatId: chatDetails._id };
    const newMessage = await sendMessageHandler(data);
    if (newMessage) {
      const response = newMessage.message;
      response.sender = user;

      setMessages((prevMessage) => [...prevMessage, response]);
    }

    setInputField("");
  };

  // get realtime messages
  useEffect(() => {
    if (socket) {
      socket.on("sendMessage", async (data) => {
        console.log(data, "socket data");
        if (data.chat === currentChat) {
          setMessages((prev) => [...prev, data]);
          await updateMessageReadStatusHandler(currentChat);
          console.log("getting in real time");
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("sendMessage");
      }
    };
  }, [socket, currentChat]);

  // update message read status in real time
  useEffect(() => {
    if (socket) {
      socket.on("messageRead", (data) => {
        console.log(data, "thsi is messaeREad");
        setMessages((prevMessages) => {
          // Create a Set for faster lookup of messageIds
          const updatedMessageIds = new Set(data.messageIds);

          // Map over previous messages and update isRead for matching IDs
          const updatedMessages = prevMessages.map((message) =>
            updatedMessageIds.has(message._id)
              ? { ...message, isRead: true }
              : message
          );
          return updatedMessages;
        });
      });
    }

    return () => {
      if (socket) {
        socket.off("messageRead");
      }
    };
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    const scrollAndMarkMessagesAsRead = async () => {
      if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollAndMarkMessagesAsRead();
  }, [messages]);

  return (
    <div className="flex flex-col bg-white h-full w-full p-4 rounded-lg shadow-md border border-black">
      {!currentChat ? (
        <div className="flex flex-col items-center justify-center h-full text-center bg-gray-50">
          <img
            src={logo}
            alt="Chatter Logo"
            className="w-30 h-25 md:w-28 md:h-28 mb-4"
          />
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Welcome to <span className="text-blue-500">Chatter</span>!
          </h1>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Select a chat or start a new conversation.
          </p>
          <button
            onClick={() => dispatch(setOpenSearchBox(true))}
            className="mt-6 px-6 py-2 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600"
          >
            Start a New Chat
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Chat Info */}
          <div className="px-5 border-b pb-2 border-black flex justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full border border-black w-[50px] h-[50px]">
                {chatDetails ? (
                  <img
                    src={chatDetails?.users[0]?.profilePic}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="text-3xl" />
                )}
              </div>
              <div>
                <h1 className="font-bold text-xl">
                  {chatDetails?.users[0]?.name}
                </h1>
                <p className="text-xs">
                  {chatDetails?.users[0]?.username} • Last seen, 02:20pm
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-2xl">
              <FaPhoneAlt />
              <FaVideo />
              <BsThreeDotsVertical />
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-grow overflow-y-auto hide-scrollbar p-4">
            {messages?.length ? (
              messages.map((message, index) => (
                <div key={message._id}>
                  {message.isNotification ? (
                    <div className="flex justify-center mb-4">
                      <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg shadow-md text-center max-w-lg">
                        <p>{message.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`flex ${
                        message.sender._id === user._id
                          ? "justify-end"
                          : "justify-start"
                      } mb-2`}
                    >
                      {message.sender._id !== user._id && message.sender && (
                        <img
                          src={message.sender.profilePic}
                          alt="User"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                      )}
                      <div
                        className={`p-3 rounded-lg max-w-md shadow-md ${
                          message.sender._id === user._id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-black"
                        }`}
                      >
                        <p>{message.content}</p>

                        <div className="flex justify-between items-center">
                          {/* Timestamp */}
                          <span className="text-xs text-gray-400">
                            {new Date(message.createdAt).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>

                          {/* Read Status */}
                          {message.sender._id === user._id && (
                            <span className="text-xs text-gray-400 ml-2">
                              {message.isRead ? "Seen" : "Delivered"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No messages yet...</p>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Field */}
          <div className="flex items-center p-4 bg-gray-100 border-t border-gray-300">
            <input
              type="text"
              className="flex-1 p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Type your message..."
              value={inputField}
              onChange={(e) => setInputField(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white py-3 px-4 rounded-full ml-2"
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
