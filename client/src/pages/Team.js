import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../components/Button'
import InviteUser from '../components/users/InviteUser'
import TeamList from '../components/users/TeamList'
import { useStateContext } from '../context/ContextProvider'
import { fetchTeamMembersAction, isShowModal } from '../redux/usersSlices'

function Team() {
  const { currentColor, setTeam} = useStateContext();

  const dispatch = useDispatch()
  useEffect(()=> {
  dispatch(fetchTeamMembersAction())
  }, [])

const teamData= useSelector(state=> state?.users)
const {teamProfile, showModal}=teamData
const teamMembers=teamProfile?.teamMembers
useEffect(()=> {
  if (typeof teamMembers !== "undefined") setTeam(teamMembers)
}, [teamMembers])


  return (
    <div>
  
      <Button onClick={() => {dispatch(isShowModal())}} text="Add Member" bgColor={currentColor} borderRadius="10px" animationType="bounce"/>
      <div className='mt-7'>
     
        <TeamList />
      </div>


      {showModal && <InviteUser />}

    </div>
  )
}

export default Team