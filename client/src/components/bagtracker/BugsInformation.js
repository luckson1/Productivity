import React, { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../../context/ContextProvider";
import {
  editBugsAction,
  isEditMode,
  isEditModeReset,
  isShowInfoModalReset,
  isShowModal,
} from "../../redux/bugsSlices";
import { fetchCommentAction } from "../../redux/CommentSlices";
import { Button } from "../Button";
import CreateComment from "../CreateComment";
import InfoCard from "../InfoCard";

export const BugsInformation = ({ bugEntry }) => {
  const { currentColor, setSelectedBug, bugs, selectedBug, setBugs, team } =
    useStateContext();
  const entry = selectedBug;
  const dispatch = useDispatch();
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
  const editbugHandler = (bugEntry) => {
    const values = {
      title: bugEntry.title,
      description: bugEntry.description,
      steps: bugEntry.steps,
      status: newStatus,
      priority: bugEntry.priority,
      assigned: bugEntry.assigned,
      createdAt: bugEntry.createdAt,
      _id: bugEntry._id,
      bugId: bugEntry.bugId,
    };
    dispatch(editBugsAction(values));
    const newBugs = bugs?.filter((bug) => {
      return entry._id !== bug?._id;
    });

    setBugs([...newBugs, values]);
    dispatch(isShowInfoModalReset());
  };

  useEffect(() => {
    dispatch(fetchCommentAction({ id: bugEntry?.bugId }));
  }, []);

  const comments = useSelector(
    (state) => state?.comment?.commentsFetched?.comment
  );
  const assigneeData = team?.filter(
    (member) => member?._id === bugEntry?.assigned
  );

  const handleEditModule=() => {
    dispatch(isShowInfoModalReset());
    dispatch(isShowModal());
    dispatch(isEditMode());
    setSelectedBug(bugEntry);
    window.scrollTo(0, 0);
  }
  const buttonTextOptions= bugEntry?.status === "Open"
  ? "Add to Progress"
  : bugEntry?.status === "In Review"
  ? "Mark as Closed"
  : bugEntry?.status === "In Progress"
  ? "Send to Review"
  : bugEntry?.status === "Closed"
  ? "Mark as Complete"
  : null
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
            onClick={() => {
              dispatch(isEditModeReset());
              dispatch(isShowInfoModalReset());
            }}
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
            <CreateComment bugId={bugEntry?.bugId} />
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 border-t-1 border-color mx-7">
          <Button
            color="white"
            bgColor={currentColor}
            text="Edit Details"
            borderRadius="10px"
            onClick={handleEditModule()}
          />
          <Button
            color="white"
            bgColor={currentColor}
            text={buttonTextOptions}
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
