import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { appDispatch } from "../redux/Hooks";
import { useDeletetaskMutation } from "../redux/tasksApiSlices";

import {  isShowDeleteModalReset } from "../redux/taskSlices";
function DeleteDialogBox({ item, task }) {
const [deleteTask]=useDeletetaskMutation()
  // dispatch action to delete task
 


  const dispatch=appDispatch()
  const deleteTaskHandler = (task) => {
   deleteTask(task)
    dispatch(isShowDeleteModalReset());

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
          <button className="del" onClick={() => deleteTaskHandler(task)}>
            Delete {item}
          </button>
          <button className="cancel" onClick={() => dispatch(isShowDeleteModalReset())}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteDialogBox;
