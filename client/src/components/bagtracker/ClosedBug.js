import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/items";
import { useDispatch } from "react-redux";
import { editBugsAction } from "../../redux/bugsSlices";
import { useStateContext } from "../../context/ContextProvider";

function ClosedBugs({ children }) {
  const { bugs, setBugs } = useStateContext();
  const dispatch = useDispatch();

  const editBugHandler = (item) => {
    const editedBugValues = {
      title: item?.bug.title,
      priority: item?.bug.priority,
      assigned: item?.bug.assigned,
      description: item?.bug.description,
      status: "Closed",
      _id: item?.bug._id,
      createdAt: item?.bug.createdAt,
      bugId: item?.bug.bugId,
      updatedAt: new Date(),
    };
    let editedBug = [];
    editedBug.push(editedBugValues);
    dispatch(editBugsAction(editedBugValues));
    const newBugs = bugs?.filter((bug) => {
      return bug._id !== item?.bug._id;
    });

    setBugs([...newBugs, ...editedBug]);
  };
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.REVIEW],

    drop: (item, monitor) => editBugHandler(item),

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
