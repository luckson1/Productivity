import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { useStateContext } from '../../context/ContextProvider';

import { Button } from '../Button';
import { useDispatch} from 'react-redux';
import {  logout } from '../../redux/usersSlices';

export const UserProfile = () => {
  const { currentColor, user,  setShowProfileModal } = useStateContext();
const dispatch=useDispatch()


 
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
 
          <MdOutlineCancel size="30px" color='red' cursor={"pointer"} onClick={()=> setShowProfileModal(false)}/>
       
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={user?.image}
          alt="user-profile"
        />
        <div>
        <p className="font-semibold text-xl dark:text-gray-200"> {user?.firstName} {user?.lastName}</p>
          
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {user?.email}</p>
        </div>
      </div>
      <div>
      
      </div>
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
          onClick={()=> {dispatch(logout())}}
        />
      </div>
    </div>

  );
};
