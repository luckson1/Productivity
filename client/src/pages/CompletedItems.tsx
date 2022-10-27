import React, { useState } from "react";
import { useLocation,  } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { useUpdateBugMutation } from "../redux/bugsApiSlices";
import { BugsData, editBugsAction, Payload } from "../redux/bugsSlices";
import { appDispatch } from "../redux/Hooks";
import { useUpdateTaskMutation } from "../redux/tasksApiSlices";
import { editTasksAction, Task, TasksData, } from "../redux/taskSlices";
import dateFormatter from "../utils/dateFormatter";
interface LocationState {
  state :{
    bugs?: BugsData[];
    tasks?: TasksData[];
  };
}


function CompletedItems() {
  const  location = useLocation();
  const dispatch=appDispatch()

const {state}=location as LocationState
  const [completedBugs, setCompletedBugs] = useState(
    state?.bugs 
  );
  const [completedTasks, setCompletedTasks] = useState(
    state?.tasks 
  );


const [updateBug]=useUpdateBugMutation()
const [updateTask]=useUpdateTaskMutation()
  const editBugHandler = (item: BugsData) => {
    const bugValues: BugsData = {
      status: "Open",
      bugId: item.bugId,
    };  

 dispatch(editBugsAction(bugValues));
const newList =   completedBugs?.filter((bug) => {
      return bug._id !== item?._id;
    });
updateBug(bugValues)
    setCompletedBugs(newList)
  };

const editTaskHandler= (item: Task)=> {
  const tasksValues: Task = {
    status: "To Do",
    taskId: item.taskId
  }
updateTask(tasksValues)
const newList= completedTasks?.filter((task) => {
  return task._id !== item?._id;
});

setCompletedTasks(newList)

}
  return (
    <div className="table mt-24">
      <h2>Completed {state?.bugs ? "Bugs" : "Tasks"}</h2>
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-2">Title</div>
          <div className="col col-2">Assignee</div>
          <div className="col col-3">Date Modified</div>
          <div className="col col-4">Action</div>
        </li>

        {state?.bugs && completedBugs?.map((item) => (
          <li className="table-row" key={item?._id}>
            <div className="col col-2" data-label="Name">
              {item?.title}
            </div>
            <div className="col col-2" data-label="Email">
              {item?.assigned ?? "Not Assigned"}
            </div>
            <div className="col col-3" data-label="Role">
              {dateFormatter(item?.updatedAt)}{" "}
            </div>
            <div className="col col-4" data-label="Status">
              <button
                type="button"
                className="bg-green-500 rounded px-2 py-1"
                onClick={() => editBugHandler(item)}
              >
                Re-Open
              </button>
            </div>
          </li>
        ))}
        {state?.tasks && completedTasks?.map((item) => (
          <li className="table-row" key={item?._id}>
            <div className="col col-2" data-label="Name">
              {item?.title}
            </div>
            <div className="col col-2" data-label="Email">
              {item?.assigned ?? "Not Assigned"}
            </div>
            <div className="col col-3" data-label="Role">
              {dateFormatter(item?.updatedAt)}{" "}
            </div>
            <div className="col col-4" data-label="Status">
              <button
                type="button"
                className="bg-green-500 rounded px-2 py-1"
                onClick={() => editTaskHandler(item)}
              >
                Re-Open
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompletedItems;
