import React from "react";
import { FaUser } from "react-icons/fa6";
import { IoRadioButtonOn } from "react-icons/io5";
import { MdOutlineNotifications } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { MdWbSunny } from "react-icons/md";
import { IoHome, IoMoonSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSearchBox } from "../../slice/chatSlice";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(user, "user infromaation");

  return (
    <div className="flex md:flex-col flex-row-reverse justify-between py-4 border md:h-full h-[50px] min-w-[80px] rounded-xl border-black md:w-[8%] w-full bg-blue-600 ">
      <div className="flex items-center justify-center  md:pt-3 w-[30%] md:w-full">
        <div className="rounded-full text-white  flex justify-center items-center  border border-black w-[40px] h-[40px] md:w-[50px] md:h-[50px]">
          {user ? (
            <img
              className="w-full h-full rounded-full  object-center"
              src={user.profilePic}
              alt="Profile"
            />
          ) : (
            <FaUser className="md:text-3xl text-2xl" />
          )}
        </div>
      </div>

      <div className="w-full cursor-pointer  flex md:-translate-y-16 md:flex-col flex-row  items-center   md:justify-center justify-around   gap-7 text-3xl text-white">
        <p>
          <IoHome />
        </p>
        <p>
          <IoRadioButtonOn />
        </p>
        <p
          className="hidden md:flex"
          onClick={() => dispatch(setOpenSearchBox(true))}
        >
          <IoSearch />
        </p>
        <p>
          <MdOutlineNotifications />
        </p>
        <p className="hidden md:flex">
          <IoMdSettings />
        </p>
      </div>

      <div className=" items-center justify-center hidden md:flex   ">
        <div className="border border-black rounded-full w-[50px] h-[50px] bg-black flex items-center justify-center p-1">
          <p className="text-white text-3xl ">
            {true ? <IoMoonSharp /> : <MdWbSunny />}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
