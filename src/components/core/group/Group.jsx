import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowGroupCreationModal } from "../../../slice/chatSlice";
import { searchUserHandler } from "../../../service/operation/user";
import UserComponents from "./UserComponents";
import { RxCross2 } from "react-icons/rx";
import { FaCircleUser } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { createGroupChatHandler } from "../../../service/operation/group";

const Group = () => {
  const { showGroupCreationModal } = useSelector((state) => state.chat);
  const { token } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [allUsers, setAllUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [stepTwo, setStepTwo] = useState(false);
  const modalRef = useRef();
  const dispatch = useDispatch();
  const [groupImg, setGroupImg] = useState();
  const [imgPrev, setImgPrev] = useState();
  const [groupName, setGroupName] = useState();

  const handleClickOutSide = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      dispatch(setShowGroupCreationModal(false));
    }
  };

  // outside clicking
  useEffect(() => {
    if (showGroupCreationModal) {
      document.addEventListener("mousedown", handleClickOutSide);
    } else {
      document.removeEventListener("mousedown", handleClickOutSide);
    }
  }, [showGroupCreationModal]);

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

  const handleUnSelectUser = (userId) => {
    const tempUser = selectedUser;
    const updatedUser = tempUser.filter((u) => u._id !== userId);

    setSelectedUser(updatedUser);
  };

  useEffect(() => {
    const selectedUserIds = selectedUser.map((u) => u._id);
    const tempUser = allUsers.filter((u) => !selectedUserIds.includes(u._id));
    setAllUser(tempUser);
  }, [selectedUser]);

  const handleChange = (e) => {
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    setImgPrev(imgUrl);
    setGroupImg(e.target.files[0]);
  };

  // create group
  const handleCreteGroup = async (e) => {
    e.preventDefault();
    const userIds = selectedUser.map((u) => u._id);
    const data = {
      members: userIds,
      groupName: groupName,
      groupImg: groupImg,
      token: token,
    };

    console.log(data);

    await createGroupChatHandler(data, token);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center relative">
      {/* Modal */}
      {showGroupCreationModal && (
        <div className="fixed inset-0 h-screen bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white relative p-6 rounded-lg shadow-lg w-96 h-[90vh]"
          >
            <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
              New Group
            </h1>

            {!stepTwo ? (
              <div>
                {/* Selected User Div */}
                {selectedUser && (
                  <div className="flex flex-row gap-2 flex-wrap my-3">
                    {selectedUser.map((user) => (
                      <div
                        key={user._id}
                        className="flex flex-row gap-2 items-center justify-center"
                      >
                        <div className="flex flex-row gap-1">
                          <img
                            width={25}
                            className="rounded-full"
                            src={user.profilePic}
                            alt={`${user.username}'s profile`}
                          />
                          <p>@{user.username}</p>
                        </div>
                        <div>
                          <p
                            onClick={() => handleUnSelectUser(user._id)}
                            className="cursor-pointer hover:bg-slate-300 rounded-full"
                          >
                            <RxCross2 />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search for users..."
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setUsername(e.target.value)}
                />
                {/* User List */}
                <UserComponents
                  allUsers={allUsers}
                  setAllUser={setAllUser}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
                {selectedUser.length > 0 && (
                  <div
                    onClick={() => setStepTwo(true)}
                    className="absolute cursor-pointer rounded-md py-1 w-[88%] h-16 bg-blue-500 bottom-2"
                  >
                    <div className="flex items-center justify-center h-full">
                      <p className="text-2xl">
                        <FaArrowRight />
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {/* Step Two Content */}
                <form
                  onSubmit={handleCreteGroup}
                  className="flex flex-col gap-4"
                >
                  {/* Group Image */}
                  <div className="flex flex-col items-center">
                    <label className="cursor-pointer">
                      {!imgPrev ? (
                        <p className="text-9xl">
                          <FaCircleUser />
                        </p>
                      ) : (
                        <img
                          src={imgPrev}
                          className="w-[160px] h-[160px] object-cover border border-black rounded-full"
                        />
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        Upload Group Image
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>

                  {/* Group Name */}
                  <div>
                    <label
                      htmlFor="groupName"
                      className="text-gray-700 font-medium"
                    >
                      Group Name
                    </label>
                    <input
                      type="text"
                      id="groupName"
                      placeholder="Enter group name"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setGroupName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Finalize Group */}
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    Create Group
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Group;
