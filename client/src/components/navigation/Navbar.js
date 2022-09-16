import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { useStateContext } from "../../context/ContextProvider";
import {
  fetchUserProfileAction,
  isShowProfileModal,
} from "../../redux/usersSlices";
import { UserProfile } from "../users/UserProfile";

export const Navbar = () => {
  const { setActiveMenu, screenSize, setScreenSize, currentColor } =
    useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, []);

  //get state from store
  const userState = useSelector((state) => state?.users);
  const { userProfile, showProfileModal } = userState;
  const user = userProfile?.user;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserProfileAction());
  }, []);

  const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl 
            rounded-full p-3
             hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className=" absolute inline-flex first-letter:rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  );
  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          onClick={() => dispatch(isShowProfileModal())}
        >
          <img
            className="rounded-full w-8 h-8"
            src={user?.image}
            alt="user-profile"
          />
          <p>
            <span className="text-gray-900 text-14 dark:text-slate-50">
              Hi,
            </span>{" "}
            <span className="text-gray-900 font-bold ml-1 text-14  dark:text-slate-50">
              {user?.firstName}
            </span>
          </p>
          <MdKeyboardArrowDown className="text-gray-900 text-14" />
        </div>

        {showProfileModal && <UserProfile user={user} />}
      </div>
    </div>
  );
};
