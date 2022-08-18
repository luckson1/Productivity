import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { fetchbugsAction } from '../../redux/bugsSlices';
import BugCard from './BugCard'
import { ItemTypes } from '../../utils/items'
import { useStateContext } from '../../context/ContextProvider';
import CreateBugEntry from './CreateBugEntry';
import { BugsInformation } from './BugsInformation';
import ReviewBugs from './ReviewBugs';
import ClosedBugs from './ClosedBug';
import { Button } from '../Button';
import moment from "moment"


export default function BugEntryComponent() {
    // display or remove action creation/edit form 


    const { currentColor, showModal, setShowModal, isEdit, setIsEdit, currentEntry, bugs, setBugs, showInfoModal } = useStateContext();

    // dispatch action to fetch all Bugs
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchbugsAction())

    }, [dispatch])

    const bugsState = useSelector((state) => state?.bugs)
    const { bugsFetched, bugLoading, bugAppErr, bugServerErr } = bugsState

    useEffect(() => {
        if (bugsFetched) {
            setBugs(bugsFetched?.bugs)
        }

    }, [bugsFetched, setBugs])


    const openBugs = bugs?.filter(bug => bug?.status === "Open")
    const inReviewBugs = bugs?.filter(bug => bug?.status === "In Review" )
    const closedBugs = bugs?.filter(bug => bug?.status === "Closed" && new Date(bug?.updatedAt) > new Date(moment().subtract(7, 'days').calendar()))





    return (

        <div className=" w-11/12 my-10 mx-3 text-sm md:text-base md:flex-nowrap">
            <div className="kanban-heading">
                <Button bgColor={currentColor} borderRadius="10px" text="Add New Bug" onClick={() => { setShowModal(true); window.scrollTo(0, 0) }} />
            </div>

            <div className="kanban-board ">
                <div className="kanban-block bg-slate-100">
                    <strong>Open</strong>

                    {bugAppErr || bugServerErr ? (<div className="form-validation">An Error Has Occured</div>)
                        : bugLoading ? <h4>Loading Please Wait......</h4>
                            : openBugs?.length === 0 ? (<div><h3>No Bugs to Display, Please create some </h3></div>)
                                : openBugs?.map(bug => (<BugCard
                                    bug={bug}
                                    key={bug?.bugId}
                                    type={ItemTypes.OPEN}

                                />))}

                </div>
                <ReviewBugs  >
                    <strong>In Review</strong>
                    {bugAppErr || bugServerErr ? (<div className="form-validation">An Error Has Occured</div>)
                        : bugLoading ? <h4>Loading Please Wait......</h4>
                            : inReviewBugs?.map(bug => (<BugCard
                                bug={bug}
                                key={bug?.bugId}
                                type={ItemTypes.REVIEW}


                            />))}
                </ReviewBugs>
                <ClosedBugs>
                    <strong>Closed</strong>
                    {bugAppErr || bugServerErr ? (<div className="form-validation">An Error Has Occured</div>)
                        : bugLoading ? <h4>Loading Please Wait......</h4>
                            : closedBugs?.map(bug => (<BugCard
                                bug={bug}
                                key={bug?.bugId}
                                type={ItemTypes.CLOSED}
                            />))}

                </ClosedBugs>
            </div>
            {showModal && <CreateBugEntry setShowModal={setShowModal} isEdit={isEdit} entry={currentEntry} setIsEdit={setIsEdit} />}
            {showInfoModal && <BugsInformation bugEntry={currentEntry} />}
        </div>

    )
}
