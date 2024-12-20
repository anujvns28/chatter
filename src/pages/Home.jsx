import React, { useEffect } from "react";
import Sidebar from "../components/common/Sidebar";
import Chats from "../components/common/Chats";
import ChatField from "../components/common/ChatField";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchUser from "../components/core/users/SearchUser";
import FriendRequestNotification from "../components/core/notification/FriendRequestNotification";
import { useDispatch, useSelector } from "react-redux";
import useSocketConnection from "../hooks/socket";
import {
  fetchAllRequestHandler,
  updateUserStatusHandler,
} from "../service/operation/user";
import { setNotifactionCount } from "../slice/chatSlice";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const { showNotifaction, notificationCaount, searchUsers, currentChat } =
    useSelector((state) => state.chat);
  const { token } = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // Check if the screen size is small (mobile)
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });

  // socket connection
  const socket = useSocketConnection();

  // set notification count
  const notifactionCountHandler = async () => {
    const result = await fetchAllRequestHandler(false, token);
    if (result) {
      const requests = result.requests
        .map((request) => {
          if (
            request.status == "accepted" &&
            request.sender._id === user._id &&
            !request.isRead
          ) {
            return request;
          } else if (
            request.status == "pending" &&
            request.receiver._id == user._id
          ) {
            return request;
          } else {
            return null;
          }
        })
        .filter((request) => request != null);

      dispatch(setNotifactionCount(requests.length));
    }
  };

  useEffect(() => {
    notifactionCountHandler();
  }, []);

  // gettting real time fraind request
  useEffect(() => {
    const handleRequestMessage = () => {
      toast.success("New Fraind Request");
      const nom = notificationCaount + 1;
      dispatch(setNotifactionCount(nom));
    };

    socket.on("fraindRequest", handleRequestMessage);

    return () => {
      socket.off("fraindRequest", handleRequestMessage);
    };
  }, [socket]);

  /// update user Status to ONline
  const updateUserStatus = async () => {
    await updateUserStatusHandler(user._id, token);
  };
  useEffect(() => {
    updateUserStatus();
  }, []);

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
      </div>

      <div className="flex h-full  md:flex-row flex-col-reverse w-full md:gap-6 gap-2 pt-1">
        {/* sidebar */}
        <Sidebar />

        <div className="flex h-full flex-row md:gap-6 sm:gap-6 gap-3 w-full">
          {/* chats */}
          {!isSmallScreen && (
            <div className=" w-[40%]">
              <Chats socket={socket} />
            </div>
          )}

          {isSmallScreen && (
            <div className="w-full h-full border border-blue-800">
              {currentChat ? <ChatField /> : <Chats socket={socket} />}
            </div>
          )}

          {/* chat field */}
          <div className="w-full sm:flex hidden">
            <ChatField />
          </div>
        </div>

        {searchUsers && <SearchUser />}
        {showNotifaction && <FriendRequestNotification />}
      </div>
    </div>
  );
};

export default Home;
