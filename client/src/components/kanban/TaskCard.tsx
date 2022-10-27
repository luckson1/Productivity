import React, { useCallback } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { isShowInfoModal } from "../../redux/taskSlices";
import { useGetTeamQuery } from "../../redux/usersApiSlices";
import { userData } from "../../redux/usersSlices";
import dateFormatter from "../../utils/dateFormatter";

function TaskCard( {task, type,setSelectedTask}) {


  //react DnD API
  const [{ isDragging }, drag] = useDrag({
    item: { task },

    type: type,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const style = { opacity: isDragging ? 0.3 : 1, cursor: "pointer" };
  const dispatch = useDispatch();
 //fetch team
 const {
  data: teamData
}=useGetTeamQuery(undefined)
const team=teamData? Object.values(teamData)[0] as Array<userData>: null
  const assigneeData = team?.filter(
    (member) => member?._id === task?.assigned
  );

  // handle event listener to view task details

  const handleViewDetails = useCallback(
    (task) => {
      dispatch(isShowInfoModal());
      setSelectedTask(task);
    },
    [setSelectedTask, dispatch]
  );
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
      onClick={() => handleViewDetails(task)}
    >
      <div className="flex flex-row justify-between flex-wrap">
        <p>{task?.title}</p>
        {assigneeData?.map((user)=> 
          (
           user?.image?  <img key={user?.userId}
           className="rounded-full h-6 w-6"
           src={user.image}
           alt="user-profile"
         />: ""
          ))}
        {<p>{task?.end && dateFormatter(task?.end)}</p>}
      </div>
    </div>
  );
}

export default TaskCard;
