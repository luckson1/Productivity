import React from "react";
import { useStateContext } from "../../context/ContextProvider";
import { useGetTeamQuery } from "../../redux/usersApiSlices";
import { userData } from "../../redux/usersSlices";
const placeholderImage= require( "../../assets/ProfilePic.jpg")

function TeamList() {
 //fetch team
 const {
  data: teamData
}=useGetTeamQuery(undefined)
const team=teamData? Object.values(teamData)[0] as Array<userData>: null

  return (
    <div className="table">
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Avatar</div>
          <div className="col col-1">Name</div>
          <div className="col col-2">Email</div>
          <div className="col col-3">Role</div>
          <div className="col col-4">Status</div>
        </li>

        {team?.map((member) => (
          <li className="table-row" key={member?.userId}>
            <div className="col col-1" data-label="Avatar">
              <img
                alt="profile iimage"
                src={member?.image ?? placeholderImage}
                className="rounded-full h-6 w-6 ml-5"
              />
            </div>
            <div className="col col-1" data-label="Name">
              {member?.firstName}
            </div>
            <div className="col col-2" data-label="Email">
              {member?.email}
            </div>
            <div className="col col-3" data-label="Role">
              {member?.role ?? "Not Defined"}
            </div>
            <div className="col col-4" data-label="Status">
              {member?.status ?? "Approved"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamList;
