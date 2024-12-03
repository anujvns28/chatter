import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotifactionCount,
  setShowNotification,
} from "../../../slice/chatSlice";
import {
  fetchAllRequestHandler,
  respondToFraindRequestHandler,
} from "../../../service/operation/user";
import useSocketConnection from "../../../hooks/socket";
import { toast } from "react-toastify";

const FriendRequestNotification = () => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { showNotifaction } = useSelector((state) => state.chat);
  const [friendRequests, setFriendRequests] = useState(null);

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
    const result = await fetchAllRequestHandler(data);

    if (result) {
      setFriendRequests(result.requests);
      dispatch(setNotifactionCount(result.requests.length));
    }
  };

  const handleAccept = async (id) => {
    await respondToFraindRequestHandler({ requestId: id, action: "accept" });
    fetchFraindRequests(false);
    toast.success("Friend request accepted!");
  };

  const handleDecline = async (id) => {
    await respondToFraindRequestHandler({ requestId: id, action: "reject" });
    fetchFraindRequests(false);
    toast.error("Friend request rejected.");
  };

  const handleCloseButton = () => {
    fetchFraindRequests(true);
    dispatch(setShowNotification(false));
  };

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
            {friendRequests.map((request) => (
              <li
                key={request._id}
                className="p-3 border border-gray-200 rounded-md flex items-center justify-between"
              >
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={request.sender.profilePic || "/placeholder.png"}
                    alt={`${request.sender.name} profile`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {request.sender.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      @{request.sender.username}
                    </p>
                  </div>
                </div>

                {/* Actions: Accept / Decline */}
                <div className="flex gap-2">
                  {request.status === "pending" ? (
                    <>
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
                    </>
                  ) : request.status === "accepted" && !request.isRead ? (
                    // Show "New Friend Request" for accepted but unread requests
                    <div className="text-sm text-blue-600">
                      <p className="font-semibold">New Friend Request</p>
                      <button
                        onClick={() => handleAccept(request._id)}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition duration-200"
                      >
                        Open Chat
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Request Accepted</p>
                  )}
                </div>
              </li>
            ))}
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
