import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchbugsAction, isShowModal } from "../../redux/bugsSlices";
import BugCard from "./BugCard";
import { ItemTypes } from "../../utils/items";
import { useStateContext } from "../../context/ContextProvider";
import CreateBugEntry from "./CreateBugEntry";
import { BugsInformation } from "./BugsInformation";
import ReviewBugs from "./ReviewBugs";
import ClosedBugs from "./ClosedBug";
import { Button } from "../Button";
import { fetchTeamMembersAction } from "../../redux/usersSlices";
import InProgressBugs from "./InProgressBugs";

export default function BugEntryComponent() {
  const { currentColor, selectedBug, bugs, setBugs, setTeam } =
    useStateContext();

  const dispatch = useDispatch();

  // fetch data
  useEffect(() => {
    dispatch(fetchbugsAction());
    dispatch(fetchTeamMembersAction());
  }, [dispatch]);

  // get state from bugs store

  const bugsState = useSelector((state) => state?.bugs);
  const {
    bugsFetched,
    bugLoading,
    bugAppErr,
    bugServerErr,
    showModal,
    showInfoModal,
  } = bugsState;
  const teamMembers = useSelector(
    (state) => state?.users?.teamProfile?.teamMembers
  );

  // introduce effects
  useEffect(() => {
    if (bugsFetched) {
      setBugs(bugsFetched?.bugs);
    }
  }, [bugsFetched]);

  useEffect(() => {
    if (teamMembers)
      setTeam(teamMembers.filter((member) => member?.status !== "Pending"));
  }, [teamMembers]);

  // organise the data
  const openBugs = bugs?.filter((bug) => bug?.status === "Open");
  const inProgressBugs = bugs?.filter((bug) => bug?.status === "In Progress");
  const inReviewBugs = bugs?.filter((bug) => bug?.status === "In Review");
  const closedBugs = bugs?.filter((bug) => bug?.status === "Closed");

  return (
    <div className=" w-11/12  mx-3 text-sm md:text-base md:flex-nowrap mt-24">
      <div className="kanban-heading">
        <Button
          bgColor={currentColor}
          animationType="bounce"
          borderRadius="10px"
          text="Add New Bug"
          onClick={() => {
            dispatch(isShowModal());
            window.scrollTo(0, 0);
          }}
        />
      </div>

      <div className="kanban-board ">
        <div className="kanban-block bg-indigo-100 shadow-md">
          <strong>Open</strong>

          {bugAppErr || bugServerErr ? (
            <div className="form-validation">An Error Has Occured</div>
          ) : bugLoading ? (
            <h4>Loading Please Wait......</h4>
          ) : openBugs?.length === 0 ? (
            <div>
              <h3>No Bugs to Display, Please create some </h3>
            </div>
          ) : (
            openBugs?.map((bug) => (
              <BugCard bug={bug} key={bug?.bugId} type={ItemTypes.OPEN} />
            ))
          )}
        </div>
        <InProgressBugs>
          <strong>In Progress</strong>
          {bugAppErr || bugServerErr ? (
            <div className="form-validation">An Error Has Occured</div>
          ) : bugLoading ? (
            <h4>Loading Please Wait......</h4>
          ) : (
            inProgressBugs?.map((bug) => (
              <BugCard bug={bug} key={bug?.bugId} type={ItemTypes.PROGRESS} />
            ))
          )}
        </InProgressBugs>
        <ReviewBugs>
          <strong>Testing/Review</strong>
          {bugAppErr || bugServerErr ? (
            <div className="form-validation">An Error Has Occured</div>
          ) : bugLoading ? (
            <h4>Loading Please Wait......</h4>
          ) : (
            inReviewBugs?.map((bug) => (
              <BugCard bug={bug} key={bug?.bugId} type={ItemTypes.REVIEW} />
            ))
          )}
        </ReviewBugs>
        <ClosedBugs>
          <strong>Closed</strong>
          {bugAppErr || bugServerErr ? (
            <div className="form-validation">An Error Has Occured</div>
          ) : bugLoading ? (
            <h4>Loading Please Wait......</h4>
          ) : (
            closedBugs?.map((bug) => (
              <BugCard bug={bug} key={bug?.bugId} type={ItemTypes.CLOSED} />
            ))
          )}
        </ClosedBugs>
      </div>
      {showModal && <CreateBugEntry />}
      {showInfoModal && <BugsInformation bugEntry={selectedBug} />}
    </div>
  );
}
