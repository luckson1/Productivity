import React, { useCallback, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { useStateContext } from "../../context/ContextProvider";
import { useUpdateBugMutation } from "../../redux/bugsApiSlices";
import {
  BugsData,
  editBugsAction,
  isEditMode,
  isEditModeReset,
  isShowInfoModalReset,
  isShowModal,
  Payload,
} from "../../redux/bugsSlices";
import { useGetCommentsQuery } from "../../redux/commentApislices";
import { commentData } from "../../redux/CommentSlices";
import { appDispatch, getState } from "../../redux/Hooks";
import { TasksData } from "../../redux/taskSlices";
import { useGetTeamQuery } from "../../redux/usersApiSlices";
import { userData } from "../../redux/usersSlices";
import { Button } from "../Button";
import CreateComment from "../CreateComment";
import InfoCard from "../InfoCard";

export const BugsInformation = ({ selectedBug, setSelectedBug }) => {
  const { currentColor } = useStateContext();

  const [updateBug] = useUpdateBugMutation();
  const dispatch = appDispatch();
  const bugEntry = selectedBug;
  const newStatus =
    bugEntry?.status === "Open"
      ? "In Progress"
      : bugEntry?.status === "In Progress"
      ? "In Review"
      : bugEntry?.status === "In Review"
      ? "Closed"
      : bugEntry?.status === "Closed"
      ? "Complete"
      : "Open";
  const editbugHandler = (bugEntry: BugsData) => {
    const values: BugsData = {
      title: bugEntry.title,
      description: bugEntry.description,
      steps: bugEntry.steps,
      status: newStatus,
      priority: bugEntry.priority,
      assigned: bugEntry.assigned,
      createdAt: bugEntry.createdAt,
      updatedAt: bugEntry.updatedAt,
      _id: bugEntry._id,
      bugId: bugEntry.bugId,
    };
updateBug(values)
    dispatch(isShowInfoModalReset());
  };
  //fetch comments
  const { data: commentsData } = useGetCommentsQuery({ id: bugEntry?.bugId });
  const comments = commentsData
    ? (Object.values(commentsData)[0] as Array<commentData>)
    : null;

  //fetch team
  const { data: teamData } = useGetTeamQuery(undefined);
  const team = teamData
    ? (Object.values(teamData)[0] as Array<userData>)
    : null;
  const assigneeData = team?.filter(
    (member) => member?._id === bugEntry?.assigned
  );
  const handleInitiateEditing = useCallback(
    (selectedBug: TasksData) => {
      dispatch(isShowInfoModalReset());
      dispatch(isShowModal());
      dispatch(isEditMode());
      setSelectedBug(selectedBug);
      window.scrollTo(0, 0);
    },
    [setSelectedBug]
  );

  const handleHideForm = useCallback(() => {
    dispatch(isEditModeReset());
    dispatch(isShowInfoModalReset());
  }, []);
  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
      <div className="float-right h-screen  bg-gradient-to-r from-blue-100 via-pink-100 to-indigo-50  dark:bg-[#484B52] w-full sm:w-6/12 overflow-scroll">
        <div className="flex justify-between items-center gap-2 mt-7 mx-7">
          <p className="text-xl font-semibold text-gray-900 text-center">
            Bug Information
          </p>

          <MdCancel
            className=""
            color="red"
            size="30px"
            style={{ cursor: "pointer" }}
            onClick={handleHideForm}
          />
        </div>

        <div className="mt-3 text-sm mx-7 dark:text-gray-200">
          <div className="flex-col">
            <div className="flex flex-row gap-2 justify-between flex-wrap">
              <InfoCard title="Title" details={bugEntry?.title} />
              <InfoCard title="Priority" details={bugEntry?.priority} />
              <InfoCard title="Status" details={bugEntry?.status} />
              <InfoCard
                title="Assignee"
                details={assigneeData[0]?.firstName ?? "Not Assigned"}
              />
            </div>

            <InfoCard title="Description" details={bugEntry?.description} />
            <InfoCard title="Steps" details={bugEntry?.steps} />
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
            <CreateComment bugId={bugEntry?.bugId} taskId="" />
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 border-t-1 border-color mx-7">
          <Button
            size="12px"
            animationType=""
            bgColor={currentColor}
            text="Edit Details"
            borderRadius="10px"
            onClick={() => handleInitiateEditing(bugEntry)}
          />
          <Button
            size="12px"
            animationType=""
            bgColor={currentColor}
            text={
              bugEntry?.status === "Open"
                ? "Add to Progress"
                : bugEntry?.status === "In Review"
                ? "Mark as Closed"
                : bugEntry?.status === "In Progress"
                ? "Send to Review"
                : bugEntry?.status === "Closed"
                ? "Mark as Complete"
                : "Add to Progress"
            }
            borderRadius="10px"
            onClick={() => {
              editbugHandler(bugEntry);
            }}
          />
        </div>
      </div>
    </div>
  );
};
