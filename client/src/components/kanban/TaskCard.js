import React from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { useStateContext } from "../../context/ContextProvider";
import { isShowInfoModal } from "../../redux/taskSlices";

function TaskCard({ task, type }) {
  const { setSelectedTask, team } = useStateContext();

  //react DnD API
  const [{ isDragging }, drag] = useDrag({
    item: { task },

    type: type,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });


  const dispatch=useDispatch()
  const assigneeData = team?.filter((member) => member?._id === task?.assigned);
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
      style={{ opacity: isDragging ? 0.3 : 1, cursor: "pointer" }}
      onClick={() => {
        dispatch(isShowInfoModal())
        setSelectedTask(task);
      }}
    >
      <div className="flex flex-row justify-between">
        <p>{task?.title}</p>
       { assigneeData[0]?.image!==undefined && <img
          className="rounded-full h-6 w-6"
          src={assigneeData[0]?.image}
          alt="user-profile"
        />}
      </div>
    </div>
  );
}

export default TaskCard;
