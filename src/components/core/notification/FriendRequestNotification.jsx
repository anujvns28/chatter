import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentChat,
  setNotifactionCount,
  setShowNotification,
} from "../../../slice/chatSlice";
import {
  fetchAllRequestHandler,
  respondToFraindRequestHandler,
} from "../../../service/operation/user";
import { toast } from "react-toastify";
import { GiThreePointedShuriken } from "react-icons/gi";
import { respondToGroupInviteHandler } from "../../../service/operation/group";

const FriendRequestNotification = () => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { showNotifaction } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const [friendRequests, setFriendRequests] = useState(null);
  const { token } = useSelector((state) => state.auth);

  const handleOutSideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      dispatch(setShowNotification(false));
      fetchFraindRequests(true);
    }
  };

  useEffect(() => {
    if (showNotifaction) {
      document.addEventListener("mousedown", handleOutSideClick);
    } else {
      document.removeEventListener("mousedown", handleOutSideClick);
    }
  }, [showNotifaction]);

  const fetchFraindRequests = async (data) => {
    const result = await fetchAllRequestHandler(data, token);

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

      if (requests) {
        setFriendRequests(requests);
        dispatch(setNotifactionCount(requests.length));
      }
    }
  };

  const handleAccept = async (id) => {
    await respondToFraindRequestHandler({
      requestId: id,
      action: "accept",
      token: token,
    });
    fetchFraindRequests(false);
  };

  const handleDecline = async (id) => {
    await respondToFraindRequestHandler({
      requestId: id,
      action: "reject",
      token: token,
    });
    fetchFraindRequests(false);
  };

  // groups
  const handleAcceptGroupInvite = async (id) => {
    console.log("group invteetadkljdfsakljfds");
    await respondToGroupInviteHandler({
      requestId: id,
      action: "accept",
      token: token,
    });
    fetchFraindRequests(false);
  };

  const handleDeclineGroupInvite = async (id) => {
    await respondToGroupInviteHandler({
      requestId: id,
      action: "reject",
      token: token,
    });
    fetchFraindRequests(false);
  };

  // close button
  const handleCloseButton = () => {
    fetchFraindRequests(true);
    dispatch(setShowNotification(false));
  };

  console.log(friendRequests, "is this true");

  useEffect(() => {
    fetchFraindRequests(false);
  }, []); // Initial fetch of requests

  return (
    <div className="fixed inset-0 h-screen bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg w-96 h-[90vh] overflow-y-auto"
      >
        <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Friend Requests
        </h1>

        {friendRequests && friendRequests.length > 0 ? (
          <ul className="space-y-3">
            {friendRequests.map((request) =>
              request.isGroup ? (
                <li
                  key={request._id}
                  className="p-4 border border-gray-300 rounded-lg flex items-center justify-between bg-gray-50"
                >
                  {/* Group Info */}
                  <div className="flex flex-col">
                    <p className="font-bold text-gray-900 text-lg">
                      {request.chatName || "Group"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Invited by @{request.sender.username}
                    </p>
                  </div>

                  {/* Actions: Accept / Decline */}
                  <div className="flex gap-3">
                    {request.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleAcceptGroupInvite(request._id)}
                          className="px-4 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition"
                        >
                          Join Group
                        </button>
                        <button
                          onClick={() => handleDeclineGroupInvite(request._id)}
                          className="px-4 py-1 bg-gray-400 text-white text-sm rounded-lg hover:bg-gray-500 transition"
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <p className="text-green-600 font-semibold text-sm">
                        Group Invitation Accepted
                      </p>
                    )}
                  </div>
                </li>
              ) : (
                // One-to-one invite (existing code block)
                <li
                  key={request._id}
                  className="p-3 border border-gray-200 rounded-md flex items-center justify-between"
                >
                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        request.status == "pending"
                          ? request.sender.profilePic
                          : request.receiver.profilePic || "/placeholder.png"
                      }
                      alt={`${
                        request.status == "pending"
                          ? request.sender.name
                          : request.receiver.name
                      } profile`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {request.status == "pending"
                          ? request.sender.name
                          : request.receiver.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        @
                        {request.status == "pending"
                          ? request.sender.username
                          : request.receiver.username}
                      </p>
                    </div>
                  </div>

                  {/* Actions: Accept / Decline */}
                  <div className="flex gap-2">
                    {request.status === "pending" ? (
                      <div>
                        <button
                          onClick={() => handleAccept(request._id)}
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition duration-200"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDecline(request._id)}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition duration-200"
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <div className="text-sm text-blue-600">
                        <p className="font-semibold">Friend Request Accepted</p>
                      </div>
                    )}
                  </div>
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="text-gray-500 text-center mt-6">
            No new friend requests.
          </p>
        )}

        <button
          onClick={handleCloseButton}
          className="mt-4 w-full py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FriendRequestNotification;
