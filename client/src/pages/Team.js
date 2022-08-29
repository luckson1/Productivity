import React, { useEffect, useState } from 'react'
import { SiAddthis } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../components/Button'
import AddTeam from '../components/users/AddTeam'
import InviteUser from '../components/users/InviteUser'
import TeamList from '../components/users/TeamList'
import { useStateContext } from '../context/ContextProvider'
import { fetchAllTeamsAction } from '../redux/TeamSlices'
import { fetchTeamMembersAction } from '../redux/usersSlices'

function Team() {
  const { currentColor, showModal, setShowModal, setTeam, showCreateTeamModal} = useStateContext();
 
  const dispatch = useDispatch()
  useEffect(()=> {
  dispatch(fetchTeamMembersAction())
  }, [])

const teamMembers= useSelector(state=> state?.users?.teamProfile?.teamMembers)
useEffect(()=> {
  if (typeof teamMembers !== "undefined") setTeam(teamMembers)
}, [teamMembers])


  return (
    <div>
  
      <Button onClick={() => {setShowModal(true)}} text="Add Member" bgColor={currentColor} borderRadius="10px" />
      <div className='mt-7'>
     
        <TeamList />
      </div>


      {showModal && <InviteUser />}

      {showCreateTeamModal  && <AddTeam />}
    </div>
  )
}

export default Team