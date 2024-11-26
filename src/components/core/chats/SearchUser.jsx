import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSearchBox } from "../../../slice/chatSlice";
import { searchUserHandler } from "../../../service/operation/user";

const searchUser = () => {
  const { searchUsers } = useSelector((state) => state.chat);
  const searchMoadalRef = useRef();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [allUsers, setAllUser] = useState(null);

  // clicked out sied code started
  const handleClickOutside = (event) => {
    if (
      searchMoadalRef.current &&
      !searchMoadalRef.current.contains(event.target)
    ) {
      dispatch(setOpenSearchBox(false));
    }
  };

  useEffect(() => {
    if (searchUsers) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [searchUsers]);
  // clicked out sied code ended

  // debouce code started
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const result = await searchUserHandler(username);
      if (result) {
        setAllUser(result.users);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [username]);

  return (
    <div className="bg-gray-100 min-h-screen  flex flex-col items-center justify-center relative">
      {/* Modal */}
      {searchUsers && (
        <div className="fixed  inset-0 h-screen  bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={searchMoadalRef}
            className="bg-white p-6 rounded-lg shadow-lg w-96 h-[90vh]"
          >
            <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
              Search Users
            </h1>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search for users..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* User List */}
            <ul className="mt-4 max-h-[70vh] hide-scrollbar overflow-y-auto">
              {allUsers ? (
                allUsers.map((user, index) => (
                  <li
                    key={index}
                    className="p-2 border-b border-gray-200 hover:bg-gray-100 flex items-center justify-between"
                  >
                    {/* User Info Section */}
                    <div className="flex items-center gap-3">
                      {/* User Image */}
                      <img
                        src={user.profilePic} // Placeholder image
                        alt={`${user.name} profile`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-700">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500">{user.username}</p>
                      </div>
                    </div>

                    {/* Send Request Button */}
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition duration-200">
                      Send Request
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-500 mt-4">
                  No users found
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default searchUser;
