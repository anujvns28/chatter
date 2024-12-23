import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSearchBox } from "../../../slice/chatSlice";
import { searchUserHandler } from "../../../service/operation/user";
import FraindRequestComponent from "./FraindRequestComponent";

const searchUser = () => {
  const { searchUsers, userLoading } = useSelector((state) => state.chat);
  const { token } = useSelector((state) => state.auth);
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
      const result = await searchUserHandler(username, token);
      if (result) {
        setAllUser(result.users);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [username]);
  // debounce code ended

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
            <FraindRequestComponent
              allUsers={allUsers}
              setAllUser={setAllUser}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default searchUser;
