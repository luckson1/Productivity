import React from "react";
import { useDrag } from "react-dnd";
import { useStateContext } from "../../context/ContextProvider";

function BugCard({ bug, type }) {
  const { setCurrentEntry, setShowInfoModal, team } = useStateContext();
  const [{ isDragging }, drag] = useDrag({
    item: {
      bug,
    },

    type: type,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const assigneeData = team?.filter((member) => member?._id === bug?.assigned);
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
        setShowInfoModal(true);
        setCurrentEntry(bug);
      }}
    >
      <div className="flex flex-row justify-between">
        <p>{bug?.title}</p>
        <img
          className="rounded-full h-6 w-6"
          src={assigneeData[0]?.image}
          alt="user-profile"
        />
        <div
          className={
            bug?.priority === "Low"
              ? "bg-blue-200 rounded mt-1 text-xs p-1"
              : bug?.priority === "Medium"
              ? " rounded mt-1 text-xs p-1 bg-amber-200"
              : "bg-red-500 rounded mt-1 text-xs p-1"
          }
        >
          <p>{bug?.priority}</p>
        </div>
      </div>
    </div>
  );
}

export default BugCard;
