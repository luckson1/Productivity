import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../components/Button'
import InviteUser from '../components/users/InviteUser'
import TeamList from '../components/users/TeamList'
import { useStateContext } from '../context/ContextProvider'

function Team() {
  const {currentColor, showModal, setShowModal, team} = useStateContext();


  

  return (
    <div>

      <h1 style={{marginTop: "20px", fontSize: "30px"}} className="mb-7">Team Members</h1>
  
  <Button onClick={() => setShowModal(true)} text="Add Member" bgColor={currentColor} borderRadius="10px"/>
    <div className='mt-7'>
    <TeamList members={team}/>
    </div>
     
   
     
      {showModal && <InviteUser setShowModal={setShowModal} />}
    </div>
  )
}

export default Team