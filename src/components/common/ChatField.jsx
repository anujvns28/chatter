import React, { useContext, useEffect, useRef, useState } from "react";
import { FaUser, FaPhoneAlt, FaVideo } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import logo from "../../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat, setOpenSearchBox } from "../../slice/chatSlice";
import {
  fetchChatDetailsHandler,
  fetchMessageHandler,
  sendMessageHandler,
  updateMessageReadStatusHandler,
} from "../../service/operation/chat";
import { SocketContext, SocketProvider } from "../../socketContext";
import { current } from "@reduxjs/toolkit";
import { IoArrowBack } from "react-icons/io5";

const ChatField = () => {
  const { currentChat } = useSelector((state) => state.chat);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const [chatDetails, setChatDetails] = useState(null);
  const [inputField, setInputField] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [msgFroScrolling, setMsgForScrolling] = useState([]);
  const dispatch = useDispatch();
  const chatEndRef = useRef();
  const socket = useContext(SocketContext);
  const chatContainerRef = useRef();
  let messageContainerHeight =
    chatContainerRef.current && chatContainerRef.current.scrollHeight;

  // fetching current chat details
  const fetchCurrentChat = async () => {
    if (!currentChat) return;
    const result = await fetchChatDetailsHandler(currentChat, token);
    if (result) {
      // if current chat is not group then seting other user details as chat details
      if (!result.chatDetails.isGroupChat) {
        const otherUser = result.chatDetails?.users.find(
          (u) => u._id != user._id
        );
        result.chatDetails.chatImg = otherUser.profilePic;
        result.chatDetails.chatName = otherUser.name;
        result.chatDetails.otherUser = otherUser;
      }
      setChatDetails(result.chatDetails);
    }
  };

  // fetching messagess
  const handleFetchingMessages = async (pageCount) => {
    if (!currentChat || loading) return;
    setLoading(true);
    //fetching messagess
    const result = await fetchMessageHandler(currentChat, token, pageCount);
    if (result) {
      console.log(result.messages);
      setMessages((prevMessage) => [...result.messages, ...prevMessage]);

      let currHeight = chatContainerRef.current.scrollHeight;
      console.log(currHeight, "currn heg");
      console.log(messageContainerHeight, "contanrer height");
      console.log(currHeight - messageContainerHeight, "scroll bar");
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: currHeight - messageContainerHeight,
          behavior: "smooth",
        });
      }

      setHasMore(result.messages.length > 0);
      if (pageCount == 1)
        setMsgForScrolling((prev) => [...result.messages, ...prev]);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  };

  // Handle scrolling and fetch messages when user reaches the top
  const handleScroll = async (e) => {
    if (e.target.scrollTop === 0 && !loading && hasMore) {
      let pageno = page;
      pageno++;
      console.log(pageno, "page no");
      await handleFetchingMessages(pageno);
      setPage(pageno);
    }
  };

  useEffect(() => {
    const fetchChatAndMessages = async () => {
      setPage(1);
      await fetchCurrentChat();
      await handleFetchingMessages(1);
    };
    fetchChatAndMessages();
  }, [currentChat]);

  const handleSendMessage = async () => {
    if (!inputField.trim()) return;

    const data = { content: inputField, chatId: chatDetails._id, token: token };
    const newMessage = await sendMessageHandler(data);
    if (newMessage) {
      const response = newMessage.message;
      response.sender = user;
      setMessages((prevMessage) => [...prevMessage, response]);
      setMsgForScrolling((prev) => [...prev, response]);
    }
    setInputField("");
  };

  // gettting messsages in real time
  useEffect(() => {
    if (socket) {
      socket.on("sendMessage", async (data) => {
        if (data.chat === currentChat) {
          setMessages((prev) => [...prev, data]);
          // update message status seen
          await updateMessageReadStatusHandler(currentChat, token, "updating");
        }
      });
    }
    return () => {
      if (socket) {
        socket.off("sendMessage");
      }
    };
  }, [socket, currentChat]);

  // for updating messae status
  useEffect(() => {
    if (socket) {
      socket.on("messageRead", (data) => {
        const unreadSet = new Set(data.messageIds);
        setMessages((prev) =>
          prev.map((m) => {
            return unreadSet.has(m._id)
              ? { ...m, readBy: [...m.readBy, m._id] }
              : m;
          })
        );
      });
    }

    return () => {
      if (socket) {
        socket.off("messageRead");
      }
    };
  }, []);

  // user open or switch chat then update chat all messagess
  useEffect(() => {
    const updateMessageStatus = async () => {
      if (currentChat) {
        await updateMessageReadStatusHandler(currentChat, token, "updating");
      }
    };

    updateMessageStatus();
  }, [currentChat, token]);

  // ** for user status online or lastseen
  useEffect(() => {
    socket.on("status-update", fetchCurrentChat);
    return () => {
      socket.off("status-update", fetchCurrentChat);
    };
  }, [socket, currentChat]);

  useEffect(() => {
    setMessages([]);
  }, [currentChat]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [msgFroScrolling]);

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
          <div className=" border-b pb-2 border-black flex justify-between">
            <div className="flex flex-row gap-2 ">
              {/* back button for small screens  */}
              <div
                onClick={() => dispatch(setCurrentChat(null))}
                className="flex sm:hidden items-center justify-between   cursor-pointer text-3xl font-bold"
              >
                <IoArrowBack />
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-black w-[50px] h-[50px]">
                  {chatDetails ? (
                    <img
                      src={chatDetails?.chatImg}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-3xl" />
                  )}
                </div>
                {chatDetails && (
                  <div>
                    <h1 className="font-bold text-xl">
                      {chatDetails?.chatName}
                    </h1>
                    {!chatDetails.isGroupChat && (
                      <p className="text-xs">
                        {chatDetails?.otherUser?.username} •{" "}
                        {chatDetails?.otherUser?.status === "online"
                          ? "online"
                          : `Last Seen ${
                              chatDetails?.otherUser?.lastSeen
                                ? new Date(
                                    chatDetails?.otherUser?.lastSeen
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : ""
                            }`}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 text-2xl">
              <BsThreeDotsVertical />
            </div>
          </div>

          <div
            onScroll={handleScroll}
            ref={chatContainerRef}
            className="flex-grow overflow-y-auto  p-4 chat-container"
          >
            {messages?.length > 0 ? (
              messages.map((message) => (
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
                        className={`p-2 rounded-lg max-w-md shadow-md ${
                          message.sender._id === user._id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-black"
                        }`}
                      >
                        <p>{message.content}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">
                            {new Date(message.createdAt).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                          {message.sender._id === user._id && (
                            <span className="text-xs text-gray-400 ml-2">
                              {message.readBy.length ===
                              chatDetails.users.length
                                ? "Seen"
                                : "Delivered"}
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

          <div className="flex items-center sm:p-4 p-1 bg-gray-100 border-t border-gray-300">
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
