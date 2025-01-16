import React, { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import Chats from "../components/common/Chats";
import ChatField from "../components/common/ChatField";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchUser from "../components/core/users/SearchUser";
import FriendRequestNotification from "../components/core/notification/FriendRequestNotification";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../socketContext";
import {
  fetchAllRequestHandler,
  sendNotificationHandler,
  updateFCMTokneHandler,
  updateUserStatusHandler,
} from "../service/operation/user";
import { setNotifactionCount } from "../slice/chatSlice";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import Group from "../components/core/group/Group";
import DropDown from "../components/core/dropdown/DropDown";

import { messaging } from "../firebase/firebase";
import { getToken, onMessage } from "firebase/messaging";
// import requestNotificationPermission from "../hooks/notification";

const Home = () => {
  const {
    showNotifaction,
    notificationCaount,
    searchUsers,
    currentChat,
    showGroupCreationModal,
  } = useSelector((state) => state.chat);
  const { token } = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // Check if the screen size is small (mobile)
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });
  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef();

  // socket connection
  const socket = useContext(SocketContext);

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
      console.log("getting real time requeist");
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

  // drop down outside click
  const handleOutSideClickOfDropDown = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    if (showDropDown) {
      window.addEventListener("mousedown", handleOutSideClickOfDropDown);
    } else {
      window.removeEventListener("mousedown", handleOutSideClickOfDropDown);
    }
  }, [showDropDown]);

  // getting premision for shoing notification

  const requestNotificationPermission = async () => {
    try {
      const fcm_token = await getToken(messaging, {
        vapidKey:
          "BJdcNZhHVwg2kkPF4Cunh9PSLxPBYHuK-33ySsjkfnVYzTL6vkj7AYsh6m-4HMNFYGMCGWfdx_rKEq51QHvLNyI",
      });
      if (token) {
        console.log("Token:", fcm_token);
        if (user.FCM_token !== fcm_token) {
          const data = {
            fcm_tokne: fcm_token,
            token: token,
          };
          await updateFCMTokneHandler(data, dispatch);
        }
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    } catch (error) {
      console.error("Error getting token:", error);
    }
  };

  useEffect(() => {
    requestNotificationPermission();

    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      // Show notification or update UI here
    });
  }, []);

  return (
    <div className="h-screen  w-screen md:py-3 py-1 md:px-6 px-3 overflow-hidden flex flex-col">
      {/* Search box only for phones */}
      <div className="bg-blue-600 z-10 p-4 rounded-b-lg shadow-md w-full block md:hidden">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <p className="text-white text-2xl font-bold">Chatter</p>

          {/* Hamburger Menu Icon */}
          <div
            ref={dropDownRef}
            className="text-white relative text-2xl cursor-pointer"
          >
            <div onClick={() => setShowDropDown((prev) => !prev)}>
              <GiHamburgerMenu />
            </div>
            <div className="absolute -translate-x-28  ">
              {showDropDown && <DropDown />}
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full  md:flex-row flex-col-reverse w-full md:gap-6 gap-2 pt-1">
        {/* sidebar */}
        <Sidebar />

        <div className="flex h-full w-full relative">
          {/* Chats */}
          <div
            className={`${isSmallScreen ? "hidden" : "block"} w-[40%] h-full `}
          >
            <Chats socket={socket} />
          </div>

          {/* Chats for small screens */}
          <div
            className={`${isSmallScreen ? "block" : "hidden"} w-full  h-full  `}
          >
            {currentChat ? <ChatField /> : <Chats socket={socket} />}
          </div>

          {/* ChatField */}
          <div className="w-full sm:flex hidden">
            <ChatField />
          </div>
        </div>

        {searchUsers && <SearchUser />}
        {showNotifaction && <FriendRequestNotification />}
        {showGroupCreationModal && <Group />}
      </div>
    </div>
  );
};

export default Home;
