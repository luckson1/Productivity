import React from "react";

import dateFormatter from "../../utils/dateFormatter";

import { useStateContext } from "../../context/ContextProvider";

import { BugsInformation } from "./BugsInformation";
import { useDispatch, useSelector } from "react-redux";
import { isShowInfoModal } from "../../redux/bugsSlices";

function BugEntryList({ entries, loading, errors }) {
  const { setSelectedBug, selectedBug, currentColor } = useStateContext();
const dispatch=useDispatch()
  // get bug state from store
  const bugsState = useSelector((state) => state?.bugs);
  const { showInfoModal } = bugsState;
  const handleClick=(entry) => {
    dispatch(isShowInfoModal())
       setSelectedBug(entry);
       window.scrollTo(0, 0);
     }
  return (
    <div className="table">
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-2">Title</div>
          <div className="col col-5">Priority</div>
          <div className="col col-3">Status</div>
          <div className="col col-4">Date Created</div>
          <div className="col col-3">Assignee</div>
        </li>

        {loading ? (
          <p>Loading, Please Wait 😀......</p>
        ) : errors ? (
          <p className="text-red-500">An Error Occured 😥</p>
        ) : entries?.length === 0 ? (
          <p>No Entries, Create some 😀 </p>
        ) : (
          entries?.map((entry) => (
            <li
              className="table-row"
              key={entry?.bugId}
              style={{ cursor: "pointer" }}
              onClick={handleClick(entry)}
            >
              <div className="col col-2" data-label="Title">
                {entry?.title}
              </div>
              <div
                className={
                  entry?.priority === "Low"
                    ? "text-blue-500 col col-5"
                    : entry?.priority === "Medium"
                    ? "text-amber-400 col col-5"
                    : entry?.priority === "High"
                    ? "text-red-500 col col-5"
                    : "text-gray-900"
                }
                data-label="Description"
              >
                {entry?.priority}
              </div>
              <div
                className="col col-3"
                data-label="Amount"
                style={{
                  color: entry?.status === "Open" ? currentColor : "green",
                }}
              >
                {entry?.status}
              </div>
              <div className="col col-4" data-label="Date">
                {dateFormatter(entry?.createdAt)}
              </div>
              <div className="col col-3" data-label="Assigned">
                {entry?.assigned === undefined
                  ? "Not Assigned"
                  : entry?.assigned}
              </div>
            </li>
          ))
        )}
      </ul>
      {showInfoModal && <BugsInformation bugEntry={selectedBug} />}
    </div>
  );
}

export default BugEntryList;
