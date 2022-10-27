import React, { useCallback } from "react";
import { useDrag } from "react-dnd";
import { useStateContext } from "../../context/ContextProvider";
import { isShowInfoModal} from "../../redux/bugsSlices";
import { appDispatch } from "../../redux/Hooks";
import { useGetTeamQuery } from "../../redux/usersApiSlices";
import { userData } from "../../redux/usersSlices";

function BugCard({ bug, type, setSelectedBug }) {


  // react drag and drop hook and api
  const [{ isDragging }, drag] = useDrag({
    item: {
      bug,
    },

    type: type,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const style = { opacity: isDragging ? 0.3 : 1, cursor: "pointer" };
  const dispatch= appDispatch()

 //fetch team
 const {
  data: teamData
}=useGetTeamQuery(undefined)
const team=teamData? Object.values(teamData)[0] as Array<userData>: null
  const assigneeData = team?.filter(
    (member) => member?._id === bug?.assigned
  );
  const handleViewDetails = useCallback(() => {
    dispatch(isShowInfoModal());
    setSelectedBug(bug);
  }, [dispatch, setSelectedBug, bug]);
  return (
    <div
      className="task dark:bg-[#484B52]
     dark:text-slate-100 
     transition ease-in-out 
     delay-100 
     hover:-translate-y-0.5 
     hover:scale-105 
     duration-300"
      id="task"
      ref={drag}
      style={style}
      onClick={handleViewDetails}
    >
      <div className="flex flex-row justify-between flex-wrap">
        <p>{bug?.title}</p>
        {assigneeData?.map((user)=> 
          (
           user?.image?  <img key={user?.userId}
           className="rounded-full h-6 w-6"
           src={user.image}
           alt="user-profile"
         />: ""
          ))}
        <div
          className={
            bug?.priority === "Low"
              ? "bg-blue-200 rounded-lg text-xs w-14 pt-1"
              : bug?.priority === "Medium"
              ? " rounded-lg text-xs  bg-amber-200 w-14 pt-1"
              : "bg-red-500 rounded-lg text-xs w-14 pt-1"
          }
        >
          <p>{bug?.priority}</p>
        </div>
      </div>
    </div>
  );
}

export default BugCard;
