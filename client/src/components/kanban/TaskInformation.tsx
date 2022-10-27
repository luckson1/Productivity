import React, { useCallback, useEffect} from "react";
import { MdCancel } from "react-icons/md";

import { useStateContext } from "../../context/ContextProvider";

import dateFormatter from "../../utils/dateFormatter";
import InfoCard from "../InfoCard";
import { Button } from "../Button";
import CreateComment from "../CreateComment";
import { commentData} from "../../redux/CommentSlices";
import {
  isEditModeReset,
  isShowDeleteModal,
  isShowInfoModalReset,
  isShowModal,
  isEditMode,
  Task,
} from "../../redux/taskSlices";
import {  appDispatch, getState } from "../../redux/Hooks";
import { useGetTeamQuery } from "../../redux/usersApiSlices";
import { userData } from "../../redux/usersSlices";
import { useGetCommentsQuery } from "../../redux/commentApislices";
import { useUpdateTaskMutation } from "../../redux/tasksApiSlices";

export const TasksInformation = ({selectedTask, setSelectedTask}) => {
  const { currentColor } =
    useStateContext();
    const dispatch=appDispatch()
    const [updateTask]=useUpdateTaskMutation()
  const task = selectedTask;
 //fetch team
 const {
  data: teamData
}=useGetTeamQuery(undefined)
const team=teamData? Object.values(teamData)[0] as Array<userData>: null
  const assigneeData = team?.filter(
    (member) => member?._id === task?.assigned
  );

  //fetch comments
  const {
    data: commentsData
  }=useGetCommentsQuery({ id: task?.taskId })
  const comments=commentsData? Object.values(commentsData)[0] as Array<commentData>: null

  // action to mark task as done
  const editTaskHandler = (task: Task) => {
    const editedTaskValues: Task = {
      title: task?.title,
      summary: task?.summary,
      status: "Complete",
      _id: task?._id,
      taskId: task?.taskId,
      start: task?.start,
      end: task?.end,
      assigned: task?.assigned,
      user:  task?.user
    };

    updateTask(editedTaskValues)
    dispatch(isShowInfoModalReset());
  };
  const Done = task?.status === "Done";
  const text = Done ? "Mark as Complete" : "Delete Task";
  const color = Done ? currentColor : "red";

  // click event handler to initiate deletion or mark task as complete and remove it from the board
  const handleRemoveTask = Done
    ? (task: Task) => editTaskHandler(task)
    : () => {
        dispatch(isShowDeleteModal());
        dispatch(isShowInfoModalReset());
        setSelectedTask(task)
      };

  // click event handler to initiate editing

  const handleInitiateEdit = useCallback(
    (task) => {
      dispatch(isShowInfoModalReset());
      dispatch(isShowModal());
      dispatch(isEditMode());
      setSelectedTask(task);
      window.scrollTo(0, 0);
    },
    [setSelectedTask]
  );

  // cancel button handler
  const handleCancelModule=useCallback(() => {
    dispatch(isShowInfoModalReset());
    dispatch(isEditModeReset());
  }, [])
  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0 z-10">
      <div className="float-right h-screen  bg-gradient-to-r from-blue-100 via-pink-100 to-indigo-50  dark:bg-[#484B52] w-full sm:w-6/12 overflow-scroll">
        <div className="flex justify-between items-center gap-2 mx-7 mt-7">
          <p className="text-xl font-semibold text-gray-900 text-center ">
            Task Information
          </p>

          <MdCancel
            className=""
            color="red"
            size="30px"
            onClick={handleCancelModule}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="text-sm mx-7 mt-7">
          <div className="flex-col">
            <div className="flex flex-row gap-2 justify-between flex-wrap">
              <InfoCard title="Title" details={task?.title} />
              <InfoCard title="Status" details={task?.status} />
              <InfoCard
                title="Assignee"
                details={assigneeData[0]?.firstName ?? "Not Assigned"}
              />
            </div>
            <InfoCard title="Summary" details={task?.summary} />
            {task?.start && (
              <InfoCard
                title=" Starting Date"
                details={dateFormatter(task?.start)}
              />
            )}
            {task?.end && (
              <InfoCard
                title="Ending Date"
                details={dateFormatter(task?.end)}
              />
            )}
            <h2>Comments</h2>
            {comments?.map((comment) => (
              <InfoCard
                key={comment?.commentId}
                title={
                  team?.filter((member) => member?._id === comment?.creator)[0]
                    ?.firstName
                }
                details={comment?.details}
              />
            ))}
            <CreateComment
              taskId={task?.taskId}
              bugId=""
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 border-t-1 border-color mx-7">
          <Button
          animationType=""
          size="md"
            bgColor={currentColor}
            text="Edit Details"
            borderRadius="10px"
            onClick={() => handleInitiateEdit(task)}
          />
          <Button
          animationType=""
          size="md"
            bgColor={color}
            text={text}
            borderRadius="10px"
            onClick={() => handleRemoveTask(task)}
          />
        </div>
      </div>
    </div>
  );
};
