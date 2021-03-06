import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import { MdKeyboardArrowDown } from 'react-icons/md';




import { useStateContext } from '../../context/ContextProvider';
import { UserProfile } from '../users/UserProfile';

export const Navbar = () => {
    const { setActiveMenu, 
        screenSize, setScreenSize, currentColor, showProfileModal, setShowProfileModal, user } = useStateContext();

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (screenSize <= 900) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }
    }, [])

 

    const NavButton = ({ title, customFunc, icon, color, dotColor }) => (

        <button type="button" onClick={customFunc} style={{ color }} className="relative text-xl 
            rounded-full p-3
             hover:bg-light-gray">
            <span style={{ background: dotColor }}
                className=" absolute inline-flex first-letter:rounded-full h-2 w-2 right-2 top-2" />
            {icon}

        </button>

    )
    return (
        <div className="flex justify-between p-2 md:mx-6 relative">
            <NavButton title="Menu" customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color={currentColor} icon={<AiOutlineMenu />} />
            <div className="flex">


                <div
                    className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                    onClick={() => setShowProfileModal(true)}
                >
                    <img
                        className="rounded-full w-8 h-8"
                        src={user?.image}
                        alt="user-profile"
                    />
                    <p>
                        <span className="text-gray-900 text-14">Hi,</span>{' '}
                        <span className="text-gray-900 font-bold ml-1 text-14">
                           {user?.firstName}
                        </span>
                    </p>
                    <MdKeyboardArrowDown className="text-gray-900 text-14" />
                </div>

            
                {showProfileModal && <UserProfile />}
            </div>
        </div>

    );
};