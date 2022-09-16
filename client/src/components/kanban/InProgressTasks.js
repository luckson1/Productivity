import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/items";
import { editTasksAction } from "../../redux/taskSlices";
import { useDispatch } from "react-redux";
import { useStateContext } from "../../context/ContextProvider";
import { v4 as uuidv4 } from "uuid";

function InProgressTasks({ children }) {
  const { tasks, setTasks } = useStateContext();
  const dispatch = useDispatch();

  const editTaskHandler = (item) => {
    const editedTaskValues = {
      title: item?.task.title,
      summary: item?.task.summary,
      status: "In Progress",
      _id: item.task._id,
      createdAt: item.task.createdAt,
      taskId: item?.task.taskId ?? uuidv4(),
    };
    let editedTask = [];
    editedTask.push(editedTaskValues);
    dispatch(editTasksAction(editedTaskValues));
    const newTasks = tasks?.filter((task) => {
      return task._id !== item.task._id;
    });

    setTasks([...newTasks, ...editedTask]);
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
