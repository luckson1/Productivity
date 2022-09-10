import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksAction, isShowInfoModal } from "../../redux/taskSlices";
import DeleteDialogBox from "../DeleteDialogBox";
import TaskCard from "./TaskCard";
import { ItemTypes } from "../../utils/items";
import InProgressTasks from "./InProgressTasks";
import DoneTasks from "./DoneTasks";
import { useStateContext } from "../../context/ContextProvider";
import { TasksInformation } from "./TaskInformation";
import CreateTasks from "./CreateTasks";
import EditTasks from "./EditTasks";
import { fetchTeamMembersAction } from "../../redux/usersSlices";
import { Button } from "../Button";

export default function KanbanComponent() {
  // display or remove action creation/edit form

  const {
    selectedTask,
    tasks,
    setTasks,
    setSelectedTask,
    setTeam,
    currentColor,
  } = useStateContext();
  const [showTaskInput, setShowTaskInput] = useState(false);

  // dispatch action to fetch all tasks
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksAction());
    dispatch(fetchTeamMembersAction());
  }, [dispatch]);

  const tasksState = useSelector((state) => state?.tasks);
  const {
    tasksFetched,
    taskLoading,
    taskAppErr,
    taskServerErr,
    showInfoModal,
    showModal,
    showDeleteModal,
  } = tasksState;

  useEffect(() => {
    if (tasksFetched) {
      setTasks(tasksFetched?.tasks);
    }
  }, [tasksFetched, setTasks]);

  const toDoTasks = tasks?.filter((task) => task?.status === "To Do");
  const inProgressTasks = tasks?.filter(
    (task) => task?.status === "In Progress"
  );
  const doneTasks = tasks?.filter((task) => task?.status === "Done");

  const teamMembers = useSelector(
    (state) => state?.users?.teamProfile?.teamMembers
  );
  useEffect(() => {
    if (typeof teamMembers !== "undefined")
      setTeam(teamMembers.filter((member) => member?.status !== "Pending"));
  }, [teamMembers]);
const handleClick=(task) => {
  dispatch(isShowInfoModal());
  setSelectedTask(task);
}
  return (
    <div className=" w-11/12 my-10 mx-3 text-sm md:text-base md:flex-nowrap">
      <div className="kanban-heading">
        <Button
          bgColor={currentColor}
          animationType="bounce"
          borderRadius="10px"
          text="Add New Task"
          onClick={() => {
            setShowTaskInput(true);
          }}
        />
      </div>
      <div className="kanban-board ">
        <div className="kanban-block bg-gradient-to-r from-indigo-200 via-purple-50 to-pink-200 shadow-md">
          <strong>To Do</strong>
          {showTaskInput && <CreateTasks setShowTaskInput={setShowTaskInput} />}

          {taskAppErr || taskServerErr ? (
            <div className="form-validation">An Error Has Occured</div>
          ) : taskLoading ? (
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
                onClick={handleClick(task)}
              />
            ))
          )}
        </div>
        <InProgressTasks>
          <strong>In Progress</strong>
          {taskAppErr || taskServerErr ? (
            <div className="form-validation">An Error Has Occured</div>
          ) : taskLoading ? (
            <h4>Loading Please Wait......</h4>
          ) : (
            inProgressTasks?.map((task) => (
              <TaskCard
                task={task}
                key={task?.taskId}
                type={ItemTypes.PROGRESS}
              />
            ))
          )}
        </InProgressTasks>
        <DoneTasks>
          <strong>Done</strong>
          {taskAppErr || taskServerErr ? (
            <div className="form-validation">An Error Has Occured</div>
          ) : taskLoading ? (
            <h4>Loading Please Wait......</h4>
          ) : (
            doneTasks?.map((task) => (
              <TaskCard task={task} key={task?.taskId} type={ItemTypes.DONE} />
            ))
          )}
        </DoneTasks>
      </div>
      {showModal && <EditTasks entry={selectedTask} />}
      {showDeleteModal && <DeleteDialogBox item="Task" />}
      {showInfoModal && <TasksInformation />}
    </div>
  );
}
