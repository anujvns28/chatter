import React from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DropDown = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logout");
  };
  return (
    <div className=" text-sm font-semibold w-32 bg-white rounded-md shadow-lg border border-gray-200 ">
      <div className="flex items-center  gap-2 px-4 py-2 text-gray-700 hover:bg-gray-300 rounded-t-md">
        <p className="font-bold text-xl">
          <CgProfile />
        </p>
        <p>Profile</p>
      </div>
      <div
        onClick={handleLogout}
        className="flex items-center  gap-2 px-4 py-2 text-gray-700 hover:bg-gray-300 rounded-b-md"
      >
        <p className="font-bold text-xl">
          <BiLogOut />
        </p>
        <p>Logout</p>
      </div>
    </div>
  );
};

export default DropDown;
