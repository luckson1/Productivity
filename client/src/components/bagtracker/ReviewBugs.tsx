import * as React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/items";
import { editBugsAction, Payload } from "../../redux/bugsSlices";
import { useStateContext } from "../../context/ContextProvider";
import { Item } from "./ClosedBug";
import { dispatch } from "../../redux/hooks";

function ReviewBugs({ children }) {
  const { bugs, setBugs } = useStateContext();


  const editBugHandler = (item: Item) => {
    const editedBugValues: Payload = {
      title: item?.bug.title,
      priority: item?.bug.priority,
      assigned: item?.bug.assigned,
      description: item?.bug.description,
      status: "In Review",
      _id: item?.bug._id,
      createdAt: item?.bug.createdAt,
      bugId: item?.bug.bugId,
    };

    dispatch(editBugsAction(editedBugValues));
    const newBugs = bugs?.filter((bug) => {
      return bug._id !== item.bug._id;
    });

    setBugs([...newBugs, editedBugValues]);
  };
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.PROGRESS],

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
          ? "bg-gradient-to-r from-orange-400 via-amber-100 to-yellow-300 kanban-block shadow-2xl"
          : "bg-indigo-100 kanban-block shadow-md"
      }
      ref={drop}
    >
      {children}
    </div>
  );
}

export default ReviewBugs;
