import React, { useState } from "react";

const UserComponents = ({ allUsers, selectedUser, setSelectedUser }) => {
  const handleSelectUser = (user) => {
    const users = [...selectedUser];
    users.push(user);
    setSelectedUser(users);
  };
  return (
    <ul className="mt-4 max-h-[70vh] h-full overflow-y-auto hide-scrollbar border ">
      {allUsers && allUsers.length > 0 ? (
        allUsers.map((user) => (
          <li
            onClick={() => handleSelectUser(user)}
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
          </li>
        ))
      ) : (
        <li className="text-center text-gray-500 py-4">No users found</li>
      )}
    </ul>
  );
};

export default UserComponents;
