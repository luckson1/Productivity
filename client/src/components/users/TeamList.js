import React from 'react'
import currencyFormatter from '../../utils/currencyFormatter'
import dateFormatter from '../../utils/dateFormatter'
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import { useStateContext } from '../../context/ContextProvider';





function TeamList({ teamId, loading, errors}) {
  const { setIsEdit, setCurrentEntry,  setShowModal, teams} = useStateContext();
const members=teams?.filter(team=>team?._id===teamId)
console.log(members)
  return (
    <div className="table">

      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Name</div>
          <div className="col col-2">Email</div>
          <div className="col col-3">Role</div>
          <div className="col col-4">Approved</div>
          <div className="col col-5">Action</div>
        </li>

        {loading ? (<p>Loading, Please Wait 😀......</p>)
          : errors ? <p className="text-red-500">An Error Occured 😥</p>
            : members?.length === 0 ? (<p>No members, Create some 😀 </p>)
              : members?.map(member=> (<li className="table-row" key={member?.userId} >
                <div className="col col-1" data-label="Name">{member?.firstName??member?.name}</div>
                <div className="col col-2" data-label="Email">{member?.email}</div>
                <div className="col col-3" data-label="Role" >{member?.role??"Not Defined"} </div>
                <div className="col col-4" data-label="Status">{member?.status ?? "Approved"}</div>
                <div className="col col-5 flex justify-between" data-label="Action">
               

                  <MdModeEdit size={"20px"} color={"orange"} cursor={"pointer"} onClick={() => {
                    setShowModal(true);
                    setIsEdit(true);
                    setCurrentEntry(member);
                    window.scrollTo(0, 0)
                  }} /> </div>
            

              </li>))}


      </ul>

    </div>
  )
}

export default TeamList