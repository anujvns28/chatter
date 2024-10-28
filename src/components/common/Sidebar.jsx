import React from "react";
import { FaUser } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa6";
import { MdOutlineNotifications } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { MdWbSunny } from "react-icons/md";
import { IoHome, IoMoonSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between py-4 border md:h-full h-[50px] min-w-[80px] rounded-xl border-black md:w-[8%] w-full bg-blue-600 ">
      <div className="flex items-center justify-center pt-3 ">
        <div className="rounded-full text-white  bg-slate-600 flex justify-center items-center p-1 border border-black w-[50px] h-[50px]">
          <p className="text-3xl">
            <FaUser />
          </p>
        </div>
      </div>

      <div className="flex -translate-y-16 flex-col items-center justify-center  gap-7 text-3xl text-white">
        <p>
          <IoHome />
        </p>
        <p>
          <FaRegCircle />
        </p>
        <p>
          <IoSearch />
        </p>
        <p>
          <MdOutlineNotifications />
        </p>
        <p>
          <IoMdSettings />
        </p>
      </div>

      <div className="flex items-center justify-center ">
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
