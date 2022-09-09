import React, { useEffect } from "react";
import { MdCancel } from "react-icons/md";

import { useStateContext } from "../../context/ContextProvider";

import dateFormatter from "../../utils/dateFormatter";
import InfoCard from "../InfoCard";
import { Button } from "../Button";
import CreateComment from "../CreateComment";
import { fetchCommentAction } from "../../redux/CommentSlices";
import { useDispatch, useSelector } from "react-redux";
import {
  isEditModeReset,
  isShowDeleteModal,
  isShowInfoModalReset,
  isShowModal,
  isEditMode,
} from "../../redux/taskSlices";

export const TasksInformation = () => {
  const { currentColor, setSelectedTask, selectedTask, team } =
    useStateContext();
  const dispatch = useDispatch();
  const task = selectedTask;
  const assigneeData = team?.filter((member) => member?._id === task?.assigned);
  useEffect(() => {
    dispatch(fetchCommentAction({ id: task?.taskId }));
  }, []);

  const comments = useSelector(
    (state) => state?.comment?.commentsFetched?.comment
  );
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
            onClick={() => {
              dispatch(isShowInfoModalReset());
              dispatch(isEditModeReset());
            }}
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
            {task?.start !== undefined && (
              <InfoCard
                title=" Starting Date"
                details={dateFormatter(task?.start)}
              />
            )}
            {task?.end !== undefined && (
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
            <CreateComment taskId={task?.taskId} />
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 border-t-1 border-color mx-7">
          <Button
            color="white"
            bgColor={currentColor}
            text="Edit Details"
            borderRadius="10px"
            onClick={() => {
              dispatch(isShowInfoModalReset());
              dispatch(isShowModal());
              dispatch(isEditMode());
              setSelectedTask(task);
              window.scrollTo(0, 0);
            }}
          />
          <Button
            color="white"
            bgColor="red"
            text="Delete Task"
            borderRadius="10px"
            onClick={() => {
              dispatch(isShowDeleteModal());
              dispatch(isShowInfoModalReset());
            }}
          />
        </div>
      </div>
    </div>
  );
};
