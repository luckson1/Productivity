import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/items";
import {  Task } from "../../redux/taskSlices";
import { v4 as uuidv4 } from "uuid";
import { useUpdateTaskMutation } from "../../redux/tasksApiSlices";

function InProgressTasks({ children }) {
  const [updateTask]=useUpdateTaskMutation()
  const editTaskHandler = (item) => {
    const editedTaskValues: Task = {
      title: item?.task.title,
      summary: item?.task.summary,
      status: "In Progress",
      _id: item.task._id,
      taskId: item?.task.taskId ?? uuidv4(),
      start: item?.start ?? undefined,
      end: item?.end ?? undefined,
      assigned: item?.assigned,
      user:  item?.user
    };
updateTask(editedTaskValues)
  };
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.DO],
    drop: (item, monitor) => editTaskHandler(item),

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  const isActive = isOver && canDrop;

  return (
    <div
      className={
        isActive
          ? "bg-gradient-to-r from-orange-400 via-amber-50 to-yellow-400 kanban-block shadow-2xl"
          : "bg-gradient-to-r from-orange-200 via-amber-50 to-yellow-200 kanban-block shadow-md"
      }
      ref={drop}
    >
      {children}
    </div>
  );
}

export default InProgressTasks;
