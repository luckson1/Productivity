import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/items";
import {BugsData} from "../../redux/bugsSlices";
import { Item } from "./ClosedBug";
import { useUpdateBugMutation } from "../../redux/bugsApiSlices";

function InProgressBugs({ children }) {

  const [updateBug]=useUpdateBugMutation()

  const editBugHandler = (item: Item) => {

    const editedBugValues: BugsData = {
      title: item?.bug.title,
      priority: item?.bug.priority,
      assigned: item?.bug.assigned,
      description: item?.bug.description,
      status: "In Progress",
      _id: item?.bug._id,
      createdAt: item?.bug.createdAt,
      updatedAt: item?.bug.updatedAt,
      bugId: item?.bug.bugId,
      steps: item?.bug?.steps
    };
  
   updateBug(editedBugValues)
  };
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.OPEN],

    drop: (item: Item, monitor) => {
      editBugHandler(item);
    },

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
          ? "bg-gradient-to-r from-indigo-400 via-pink-100 to-purple-400 kanban-block shadow-2xl"
          : "bg-indigo-100 kanban-block shadow-md"
      }
      ref={drop}
    >
      {children}
    </div>
  );
}

export default InProgressBugs;
