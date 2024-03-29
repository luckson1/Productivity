import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";

import { useStateContext } from "../../context/ContextProvider";
import { getState } from "../../redux/Hooks";
import { AppDispatch } from "../../redux/Store";
import { useGetProfileQuery } from "../../redux/usersApiSlices";
import {
  isShowProfileModal,
  userData,
} from "../../redux/usersSlices";
import { UserProfile } from "../users/UserProfile";

export const Navbar = () => {
  const { setActiveMenu, screenSize, setScreenSize, currentColor } =
    useStateContext();
const appDispatch: () => AppDispatch = useDispatch 
const dispatch=appDispatch()
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
  const userState = getState((state) => state?.users);
  const { showProfileModal } = userState;

const {data: userData, isLoading, isError, error}=useGetProfileQuery(undefined)
const user = userData
? (Object.values(userData)[0] as userData)
: null;



  const NavButton = ({ title, customFunc, icon, color}) => (
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl 
            rounded-full p-3
             hover:bg-light-gray"
    >
      <span
     
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
      { user?.image &&   <img
            className="rounded-full w-8 h-8"
            src={user?.image}
            alt="user-profile"
          />}
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

        {showProfileModal && <UserProfile user={user} isLoading={isLoading} isError={isError} error={error}/>}
      </div>
    </div>
  );
};
