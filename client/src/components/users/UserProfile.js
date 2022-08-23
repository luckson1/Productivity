import React, { useCallback, useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { useStateContext } from '../../context/ContextProvider';

import { Button } from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import {  logout } from '../../redux/usersSlices';
import { FaEdit } from 'react-icons/fa';
import UserProfileEdit from './UserProfileEdit';

export const UserProfile = () => {
  const { currentColor,  setShowProfileModal } = useStateContext();
  const [isEditPic, setIsEditPic]=useState(false)
  const [showProfileEditModal, setShowProfileEditModal ]=useState(false)
  const removeProfileEditModal=useCallback(()=> {
    setShowProfileEditModal(false)
  }, [ setShowProfileEditModal])
  const dispatch = useDispatch()


  const loginUserInfo = useSelector(state => state?.users?.userAuth?.user) 
const editedProfile=useSelector(state => state?.users?.editedProfile) 
  const [user, setUser]=useState(loginUserInfo)
   useEffect(()=> {
    if(editedProfile){
      setUser(editedProfile?.user)
    }
   }, [editedProfile])
 




  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-50">User Profile</p>

        <MdOutlineCancel size="30px" color='red' cursor={"pointer"} onClick={() => setShowProfileModal(false)} />

      </div>
      <div className="flex flex-col gap-7 items-center mt-6 border-color border-b-1 pb-6">
        <div className="flex flex-row gap-1">
          <img
            className="rounded-full h-24 w-24"
            src={user?.image}
            alt="user-profile"
          />
          <button onClick={()=> {setShowProfileEditModal (true); setIsEditPic(true)}}><FaEdit /></button>
        </div>

        <div>
          <p className="font-semibold text-xl dark:text-gray-50"> {user?.firstName} {user?.lastName}</p>

          <p className="text-gray-900 text-sm font-semibold dark:text-gray-50"> {user?.email}</p>
          <button onClick={()=> {setShowProfileEditModal (true)}}><FaEdit /></button>
          
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
          onClick={() => { dispatch(logout()) }}
        />
      </div>
    { showProfileEditModal&& <UserProfileEdit user={user} isEditPic={isEditPic} removeProfileEditModal={removeProfileEditModal}/>}
    </div>

  );
};
