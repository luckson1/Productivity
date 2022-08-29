import React, { useEffect } from 'react'
import currencyFormatter from '../../utils/currencyFormatter'
import dateFormatter from '../../utils/dateFormatter'
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import { useStateContext } from '../../context/ContextProvider';
import { useDispatch } from 'react-redux';
import { fetchTeamMembersAction } from '../../redux/usersSlices';





function TeamList({ selectedTeamId, loading, errors}) {
  const {  team} = useStateContext();

  return (
    <div className="table">

      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Name</div>
          <div className="col col-2">Email</div>
          <div className="col col-3">Role</div>
          <div className="col col-4">Status</div>

        </li>

        {loading ? (<p>Loading, Please Wait 😀......</p>)
          : errors ? <p className="text-red-500">An Error Occured 😥</p>
            : team?.length === 0 ? (<p>No Team created 😀 </p>)
              : team?.map(member=> (<li className="table-row" key={member?.userId} >
                <div className="col col-1" data-label="Name">{member?.firstName??member?.name}</div>
                <div className="col col-2" data-label="Email">{member?.email}</div>
                <div className="col col-3" data-label="Role" >{member?.role??"Not Defined"} </div>
                <div className="col col-4" data-label="Status">{member?.status ?? "Approved"}</div>
          
            

              </li>))}


      </ul>

    </div>
  )
}

export default TeamList