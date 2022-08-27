import React, { useEffect, useState } from 'react'
import { SiAddthis } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../components/Button'
import AddTeam from '../components/users/AddTeam'
import InviteUser from '../components/users/InviteUser'
import TeamList from '../components/users/TeamList'
import { useStateContext } from '../context/ContextProvider'
import { fetchAllTeamsAction } from '../redux/TeamSlices'

function Team() {
  const { currentColor, showModal, setShowModal, teams, setTeams, setShowCreateTeamModal, showCreateTeamModal, setCurrentEntry, currentEntry} = useStateContext();
 
  const dispatch = useDispatch()
  useEffect(()=> {
  dispatch(fetchAllTeamsAction())
  }, [])

const fetchedTeams= useSelector(state=> state?.team?.teamsFetched?.teams)
useEffect(()=> {
  if (typeof fetchedTeams !== "undefined") setTeams(fetchedTeams)
})
const[selectedTeamId, setSelectedTeamId]=useState()
console.log(selectedTeamId)
  return (
    <div>
      <div className="flex mt-16 mb-3">
        <div className='flex flex-row gap-2 w-11/12 justify-center'>
          <span className="form-row">
          
            <select
              className="rounded-md px-1 py-2 w-11/12"
              id="assigned"
              name="assigned"
              placeholder=''
            onChange={(e)=> setSelectedTeamId(e.target.value)}
            value={selectedTeamId}

            >
              <option value="">{ "Select Team"}</option>
{teams?.map(team=>  <option key={team?.teamId}value={team?._id}>{team?.name ?? "No Team Available"}</option>)}
             
              
            </select>

          </span>
          <button className=' h-10 w-10 bg-black text-white rounded-md shadow-2xl animate-bounce' onClick={()=>setShowCreateTeamModal(true)} >
           
            <SiAddthis size="100% " />
          </button>
        </div>

      </div>
      <Button onClick={() => {setShowModal(true)}} text="Add Member" bgColor={currentColor} borderRadius="10px" />
      <div className='mt-7'>
     
        <TeamList teamId={selectedTeamId} />
      </div>


      {showModal && <InviteUser team={selectedTeamId} />}

      {showCreateTeamModal  && <AddTeam team={selectedTeamId}/>}
    </div>
  )
}

export default Team