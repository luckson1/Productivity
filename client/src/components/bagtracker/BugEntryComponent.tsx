import React, { useCallback, useEffect } from "react";
import { BugsData,  isShowModal } from "../../redux/bugsSlices";
import BugCard from "./BugCard";
import { ItemTypes } from "../../utils/items";
import { useStateContext } from "../../context/ContextProvider";
import CreateBugEntry from "./CreateBugEntry";
import { BugsInformation } from "./BugsInformation";
import ReviewBugs from "./ReviewBugs";
import ClosedBugs from "./ClosedBug";
import { Button } from "../Button";
import InProgressBugs from "./InProgressBugs";
import { appDispatch, getState } from "../../redux/Hooks";
import { useGetBugsQuery} from "../../redux/bugsApiSlices";
import { useState } from "react";

export default function BugEntryComponent() {
  const {  currentColor } = useStateContext();
const [selectedBug, setSelectedBug]=useState<BugsData| undefined>()
const dispatch=appDispatch()

const selectBug= useCallback((bug: BugsData)=> {
  setSelectedBug(bug);
}, [])

  // get state from bugs store

  const bugsState = getState((state) => state.bugs)
  const {
    showModal,
    showInfoModal,
  } = bugsState;

  const {
    data: bugsData,
    isLoading,
    isSuccess,
    isError,
    error
  }=useGetBugsQuery(undefined)
  const bugs=bugsData? Object.values(bugsData)[0] as Array<BugsData>: null






  // organise the data
  const openBugs = bugs?.filter((bug) => bug?.status === "Open");
  const inProgressBugs = bugs?.filter((bug) => bug?.status === "In Progress");
  const inReviewBugs = bugs?.filter((bug) => bug?.status === "In Review");
  const closedBugs = bugs?.filter((bug) => bug?.status === "Closed");

  const handleAddBug= useCallback(() => {
    dispatch(isShowModal());
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className=" w-11/12  mx-3 text-sm md:text-base md:flex-nowrap mt-24">
      <div className="kanban-heading">
        <Button
          bgColor={currentColor}
          animationType="bounce"
          borderRadius="10px"
          text="Add New Bug"
          onClick={handleAddBug}
          size="md"
        />
      </div>

      <div className="kanban-board ">
        <div className="kanban-block bg-indigo-100 shadow-md">
          <strong>Open</strong>

          {isError? (
            <div className="form-validation">An Error Has Occured</div>
          ) : isLoading? (
            <h4>Loading Please Wait......</h4>
          ) : openBugs?.length === 0 ? (
            <div>
              <h3>No Bugs to Display, Please create some </h3>
            </div>
          ) : (
            openBugs?.map((bug) => (
              <BugCard bug={bug} key={bug?.bugId} type={ItemTypes.OPEN} setSelectedBug={selectBug}/>
            ))
          )}
        </div>
        <InProgressBugs>
          <strong>In Progress</strong>
          {isError? (
            <div className="form-validation">An Error Has Occured</div>
          ) : isLoading ? (
            <h4>Loading Please Wait......</h4>
          ) : (
            inProgressBugs?.map((bug) => (
              <BugCard bug={bug} key={bug?.bugId} type={ItemTypes.PROGRESS} setSelectedBug={selectBug}/>
            ))
          )}
        </InProgressBugs>
        <ReviewBugs>
          <strong>Testing/Review</strong>
          {isError? (
            <div className="form-validation">An Error Has Occured</div>
          ) : isLoading? (
            <h4>Loading Please Wait......</h4>
          ) : (
            inReviewBugs?.map((bug) => (
              <BugCard bug={bug} key={bug?.bugId} type={ItemTypes.REVIEW} setSelectedBug={selectBug}/>
            ))
          )}
        </ReviewBugs>
        <ClosedBugs>
          <strong>Closed</strong>
          {isError? (
            <div className="form-validation">An Error Has Occured</div>
          ) : isLoading? (
            <h4>Loading Please Wait......</h4>
          ) : (
            closedBugs?.map((bug) => (
              <BugCard bug={bug} key={bug?.bugId} type={ItemTypes.CLOSED} setSelectedBug={selectBug}/>
            ))
          )}
        </ClosedBugs>
      </div>
      {showModal && <CreateBugEntry selectedBug={selectedBug}/>}
      {showInfoModal && <BugsInformation selectedBug={selectedBug} setSelectedBug={selectBug}/>}
    </div>
  );
}
