import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/items";
import { Task } from "../../redux/taskSlices";
import { v4 as uuidv4 } from "uuid";
import { appDispatch } from "../../redux/Hooks";
import { useUpdateTaskMutation } from "../../redux/tasksApiSlices";

function DoneTasks({ children }) {
  const [updateTask]=useUpdateTaskMutation()
  const dispatch=appDispatch()
  const editTaskHandler = (item) => {
    const editedTaskValues: Task = {
      title: item?.task.title,
      summary: item?.task.summary,
      status: "Done",
      _id: item.task._id,
      taskId: item?.task.taskId ?? uuidv4(),
      assigned: item?.task?.assigned,
      start: item.task.start,
      end: item.task.end,
      user: item.task.user
    };

updateTask(editedTaskValues)
  };
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.PROGRESS, ItemTypes.DO],

    drop: (item, monitor) => {
      editTaskHandler(item);
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
          ? "bg-gradient-to-r from-green-400 via-emerald-50 to-teal-400 kanban-block shadow-2xl"
          : "bg-gradient-to-r from-green-200 via-emerald-50 to-teal-200 kanban-block shadow-md"
      }
      id="done"
      ref={drop}
    >
      {children}
    </div>
  );
}

export default DoneTasks;
