import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchUserHandler,
  sendFraindRequestHandler,
} from "../../../service/operation/user";

const FriendRequestComponent = ({ allUsers, setAllUser, allFriends }) => {
  const [loadingUserId, setLoadingUserId] = useState(null);
  const { token } = useSelector((state) => state.auth);

  const sendFriendRequestToUser = async (userId) => {
    setLoadingUserId(userId);
    await sendFraindRequestHandler(userId, token);
    setLoadingUserId(null);
    const updatedUser = await searchUserHandler("", token);
    if (updatedUser) {
      const otherUsers = updatedUser.users.filter(
        (u) => !allFriends.includes(u._id)
      );
      setAllUser(otherUsers);
    }
  };

  return (
    <ul className="mt-4 max-h-[70vh] overflow-y-auto hide-scrollbar">
      {allUsers && allUsers.length > 0 ? (
        allUsers.map((user) => (
          <li
            key={user._id}
            className="p-4 border-b border-gray-300 flex items-center justify-between hover:bg-gray-50 transition"
          >
            {/* User Info */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <img
                src={user.profilePic || "/placeholder.png"}
                alt={`${user.name}'s profile`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 truncate max-w-[150px]">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500 truncate max-w-[150px]">
                  @{user.username}
                </p>
              </div>
            </div>

            {/* Friend Request Button */}
            <button
              onClick={() => sendFriendRequestToUser(user._id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap 
                ${
                  loadingUserId === user._id
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : user.request
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              disabled={loadingUserId === user._id || user.request}
            >
              {loadingUserId === user._id
                ? "Sending..."
                : user.request
                ? "Request Sent"
                : "Send Request"}
            </button>
          </li>
        ))
      ) : (
        <li className="text-center text-gray-500 py-4">No users found</li>
      )}
    </ul>
  );
};

export default FriendRequestComponent;
