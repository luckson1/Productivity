import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../context/ContextProvider";

import { deleteTaskAction, isShowDeleteModalReset } from "../redux/taskSlices";
function DeleteDialogBox({ item }) {
  // dispatch action to delete task
  const dispatch = useDispatch();
  const { tasks, setTasks, selectedTask } = useStateContext();
  const task = selectedTask;
  const tasksState = useSelector((state) => state?.tasks);
  const deleteTaskHandler = () => {
    dispatch(deleteTaskAction(task));
    dispatch(isShowDeleteModalReset());
    const newTasks = tasks.filter((item) => item.taskId !== task.taskId);
    setTasks(newTasks);
  };

  return (
    <div>
      <div className="fixed-modal">
        <div className="modalContent">
          <span
            className="close"
            onClick={() => dispatch(isShowDeleteModalReset())}
          >
            ×
          </span>
          <p>Are you sure you want to delete this {item}</p>
          <button className="del" onClick={() => deleteTaskHandler()}>
            Delete {item}
          </button>
          <button className="cancel" onClick={() => isShowDeleteModalReset()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteDialogBox;
