import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/items";
import { useStateContext } from "../../context/ContextProvider";
import { BugsData } from "../../redux/bugsSlices";
import { useUpdateBugMutation } from "../../redux/bugsApiSlices";
export interface Item {
  bug: {
    title?: string;
    priority?: "Low" | "Medium" | "High";
    assigned?: string;
    description?: string;
    status: "Open" | "In Progress"| "In Review" |"Closed" | "Complete";
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
    bugId?: string;
    steps?: string;

  }
}

function ClosedBugs({ children }) {

 
  const [updateBug]=useUpdateBugMutation()
  const editBugHandler = (item: Item) => {
    const editedBugValues: BugsData = {
      title: item?.bug.title,
      priority: item?.bug.priority,
      assigned: item?.bug.assigned,
      steps: item?.bug.steps,
      description: item?.bug.description,
      status: "Closed",
      _id: item?.bug._id,
      createdAt: item?.bug.createdAt,
      updatedAt: item?.bug.updatedAt,
      bugId: item?.bug.bugId,
  
    };
    updateBug(editedBugValues)
 
  };
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.REVIEW],

    drop: (item: Item, monitor) => editBugHandler(item),

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      didDrop: !!monitor.didDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  return (
    <div
      className={
        isActive
          ? "bg-gradient-to-r from-green-400 via-emerald-100 to-teal-300 kanban-block shadow-2xl"
          : "bg-indigo-100 kanban-block shadow-md"
      }
      id="done"
      ref={drop}
    >
      {children}
    </div>
  );
}

export default ClosedBugs;
