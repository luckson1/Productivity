import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";

import { links } from "../../assets/data";
import { useStateContext } from "../../context/ContextProvider";
export const SideBar = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const activeLink = `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2`;
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-md text-gray-900 dark:text-gray-100 dark:hover:text-black hover:bg-gray-200 m-2";
  return (
    <div
      className="ml-3 h-screen
        md:overflow-hidden 
        overflow-auto 
        md:hover:overflow-auto 
        pb-10"
    >
      {activeMenu && (
        <>
          <div className="flex justify-between items-center mt-8">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center
                 gap-3 ml-3 mt-4 flex text-xl font-bold
                 tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Techivity</span>
            </Link>

            <button
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden bg-red-400 "
              onClick={handleCloseSideBar}
            >
              <MdOutlineCancel />
            </button>
          </div>

          <div className="mt-10  min-h-full ">
            {links?.map((item, index) => (
              <div key={index} className="flex flex-col  min-h-full  ">
                {item?.links?.map((link) => (
                  <NavLink
                    key={link?.id.toString()}
                    to={`/${link?.name}`}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <p className="">{link?.icon}</p>
                    <span className="capitalize">
                      <p className=" text-gray-900  dark:text-slate-50">
                        {" "}
                        {link?.name}
                      </p>
                    </span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
