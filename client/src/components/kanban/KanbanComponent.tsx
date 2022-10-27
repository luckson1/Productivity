import React, { useCallback, useState } from "react";
import { TasksData } from "../../redux/taskSlices";
import DeleteDialogBox from "../DeleteDialogBox";
import TaskCard from "./TaskCard";
import { ItemTypes } from "../../utils/items";
import InProgressTasks from "./InProgressTasks";
import DoneTasks from "./DoneTasks";
import { useStateContext } from "../../context/ContextProvider";
import { TasksInformation } from "./TaskInformation";
import CreateTasks from "./CreateTasks";
import EditTasks from "./EditTasks";
import { Button } from "../Button";
import { appDispatch, getState } from "../../redux/Hooks";
import { useGetTasksQuery } from "../../redux/tasksApiSlices";

export default function KanbanComponent() {
  // display or remove action creation/edit form
  const [selectedTask, setSelectedTask] = useState<TasksData | undefined>();
  const { currentColor } = useStateContext();
  const [showTaskInput, setShowTaskInput] = useState(false);

  const tasksState = getState((state) => state?.tasks);
  const { showInfoModal, showModal, showDeleteModal } = tasksState;
  const {
    data: tasksData,
    isLoading,

    isError,
  } = useGetTasksQuery(undefined);
  const tasks = tasksData
    ? (Object.values(tasksData)[0] as Array<TasksData>)
    : null;

  const toDoTasks = tasks?.filter((task) => task?.status === "To Do");
  const inProgressTasks = tasks?.filter(
    (task) => task?.status === "In Progress"
  );
  const doneTasks = tasks?.filter((task) => task?.status === "Done");

  const handleShowForm = useCallback(() => {
    setShowTaskInput(true);
  }, [setShowTaskInput]);
  return (
    <div className=" w-11/12 my-10 mx-3 text-sm md:text-base md:flex-nowrap">
      <div className="kanban-heading">
        <Button
          size="14px"
          bgColor={currentColor}
          animationType="bounce"
          borderRadius="10px"
          text="Add New Task"
          onClick={handleShowForm}
        />
      </div>
      <div className="kanban-board ">
        <div className="kanban-block bg-gradient-to-r from-indigo-200 via-purple-50 to-pink-200 shadow-md">
          <strong>To Do</strong>

          {isError ? (
            <div className="form-validation">An Error Has Occured</div>
          ) : isLoading ? (
            <h4>Loading Please Wait......</h4>
          ) : toDoTasks?.length === 0 ? (
            <div>
              <h3>No Tasks to Display, Please create some </h3>
            </div>
          ) : (
            toDoTasks?.map((task) => (
              <TaskCard
                task={task}
                key={task?.taskId}
                type={ItemTypes.DO}
                setSelectedTask={setSelectedTask}
              />
            ))
          )}
        </div>
        <InProgressTasks>
          <strong>In Progress</strong>
          {isError ? (
            <div className="form-validation">An Error Has Occured</div>
          ) : isLoading ? (
            <h4>Loading Please Wait......</h4>
          ) : (
            inProgressTasks?.map((task) => (
              <TaskCard
                task={task}
                key={task?.taskId}
                type={ItemTypes.PROGRESS}
                setSelectedTask={setSelectedTask}
              />
            ))
          )}
        </InProgressTasks>
        <DoneTasks>
          <strong>Done</strong>
          {isError ? (
            <div className="form-validation">An Error Has Occured</div>
          ) : isLoading ? (
            <h4>Loading Please Wait......</h4>
          ) : (
            doneTasks?.map((task) => (
              <TaskCard
                task={task}
                key={task?.taskId}
                type={ItemTypes.DONE}
                setSelectedTask={setSelectedTask}
              />
            ))
          )}
        </DoneTasks>
      </div>
      {showModal && <EditTasks selectedTask={selectedTask} />}
      {showDeleteModal && <DeleteDialogBox item="Task" task={selectedTask}/>}
      {showInfoModal && (
        <TasksInformation
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
      )}
      {showTaskInput && <CreateTasks setShowTaskInput={setShowTaskInput} />}
    </div>
  );
}
