import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksAction } from "../../redux/taskSlices";
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

export default function KanbanComponent() {
  // display or remove action creation/edit form

  const {
    showModal,
    setShowModal,
    showDeleteModal,
    setShowDeleteModal,
    isEdit,
    setIsEdit,
    currentEntry,
    tasks,
    setTasks,
    showInfoModal,
    setShowInfoModal,
    setCurrentEntry,
    setTeam,
  } = useStateContext();

  // dispatch action to fetch all tasks
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksAction());
  }, [dispatch]);

  const tasksState = useSelector((state) => state?.tasks);
  const { tasksFetched, taskLoading, taskAppErr, taskServerErr } = tasksState;

  useEffect(() => {
    if (tasksFetched) {
      setTasks(tasksFetched?.tasks);
    }
  }, [tasksFetched, setTasks]);

  useEffect(() => {
    dispatch(fetchTeamMembersAction());
  }, []);

  const toDoTasks = tasks?.filter((task) => task?.status === "To Do");
  const inProgressTasks = tasks?.filter((task) => task?.status === "In Progress");
  const doneTasks = tasks?.filter((task) => task?.status === "Done");

  const teamMembers = useSelector(
    (state) => state?.users?.teamProfile?.teamMembers
  );
  useEffect(() => {
    if (typeof teamMembers !== "undefined")
      setTeam(teamMembers.filter((member) => member?.status !== "Pending"));
  }, [teamMembers]);

  return (
    <div className=" w-11/12 my-10 mx-3 text-sm md:text-base md:flex-nowrap">
      <div className="kanban-board ">
        <div className="kanban-block bg-gradient-to-r from-indigo-200 via-purple-50 to-pink-200 shadow-md">
          <strong>To Do</strong>
          <CreateTasks />

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
                onClick={() => {
                  setShowInfoModal(true);
                  setCurrentEntry(task);
                }}
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
      {showModal && (
        <EditTasks
          setShowModal={setShowModal}
          isEdit={isEdit}
          entry={currentEntry}
          setIsEdit={setIsEdit}
        />
      )}
      {showDeleteModal && (
        <DeleteDialogBox
          setShowDeleteModal={setShowDeleteModal}
          task={currentEntry}
          item="Task"
        />
      )}
      {showInfoModal && <TasksInformation />}
    </div>
  );
}
