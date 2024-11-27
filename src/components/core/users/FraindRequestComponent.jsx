import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendFraindRequestHandler } from "../../../service/operation/user";

const FraindRequestComponent = ({ allUsers }) => {
  const [loadingUserId, setLoadingUserId] = useState(null);
  const dispatch = useDispatch();

  const sendFraindRequstToUser = async (userId) => {
    setLoadingUserId(userId);
    await sendFraindRequestHandler(userId, dispatch);
    setLoadingUserId(null);
  };

  return (
    <ul className="mt-4 max-h-[70vh] hide-scrollbar overflow-y-auto">
      {allUsers ? (
        allUsers.map((user) => (
          <li
            key={user._id}
            className="p-2 border-b border-gray-200 hover:bg-gray-100 flex items-center justify-between"
          >
            {/* User Info Section */}
            <div className="flex items-center gap-3">
              <img
                src={user.profilePic || "/placeholder.png"}
                alt={`${user.name} profile`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-700">{user.name}</p>
                <p className="text-sm text-gray-500">{user.username}</p>
              </div>
            </div>

            {/* Send Request Button */}
            <button
              onClick={() => sendFraindRequstToUser(user._id)}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition duration-200"
              disabled={loadingUserId === user._id} // Disable button if loading
            >
              {loadingUserId === user._id ? "Loading..." : "Send Request"}
            </button>
          </li>
        ))
      ) : (
        <li className="text-center text-gray-500 mt-4">No users found</li>
      )}
    </ul>
  );
};

export default FraindRequestComponent;
