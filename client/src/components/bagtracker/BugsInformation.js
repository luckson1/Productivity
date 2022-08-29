import React from 'react'
import { MdCancel } from 'react-icons/md';
import { useDispatch} from 'react-redux';
import { useStateContext } from '../../context/ContextProvider';
import {  editBugsAction } from '../../redux/bugsSlices';
import dateFormatter from '../../utils/dateFormatter';
import { Button } from '../Button'
import InfoCard from '../InfoCard';


export const BugsInformation = ({ bugEntry, }) => {
    const { currentColor, setShowInfoModal, setIsEdit, setShowModal, setCurrentEntry, bugs, currentEntry, setBugs, team} = useStateContext();
    const entry=currentEntry
    const dispatch= useDispatch()
    const newStatus=bugEntry?.status=== "Open" ?"In Review": bugEntry?.status=== "In Review"? "Closed": "Open"
    const editbugHandler = (bugEntry) => {
        const values={
            title:bugEntry.title, 
            description:bugEntry.description, 
            steps:bugEntry.steps,
            status: newStatus,
            priority:bugEntry.priority ,
            assigned:bugEntry.assigned ,
            createdAt:bugEntry.createdAt ,
            updatedAt: new Date(),
            _id:bugEntry._id ,
            bugId:bugEntry.bugId
        }
        dispatch(editBugsAction(values));
        const newBugs = bugs?.filter(bug => {
            return entry._id !== bug?._id
        })
       
        setBugs([...newBugs, values]);
        setShowInfoModal(false);

    }

// const deleteBugHundler= (bugEntry) => {
//     const newBugs= bugs?.filter(bug => {
//         return  bug.bugId!==bugEntry.bugId
//     })
//     setBugs(newBugs)
//     dispatch(deleteBugAction(bugEntry))
// }


  
    const assigneeData=team?.filter(member=> member?._id=== bugEntry?.assigned)
    return (
        <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
        <div className="float-right h-screen  bg-gradient-to-r from-blue-100 via-pink-100 to-indigo-50  dark:bg-[#484B52] w-full sm:w-6/12 overflow-scroll">
                <div className="flex justify-between items-center gap-2 mt-7 mx-7">
                    <p className="text-xl font-semibold text-gray-900 text-center">Bug Information</p>

                    <MdCancel className='' color='red' size="30px"style={{cursor: "pointer"}} onClick={() => {
                        setIsEdit(false);
                        setShowInfoModal(false);


                    }} />
                </div>

                <div className="mt-3 text-sm mx-7 dark:text-gray-200">

                    <div className="flex-col">

                        <InfoCard title="Title" details={bugEntry?.title} />
                        <InfoCard title="Status" details={bugEntry?.status} />
                        <InfoCard title="Description" details={bugEntry?.description} />
                        <InfoCard title="Steps" details={bugEntry?.steps} />
                        <InfoCard title="Priority" details={bugEntry?.priority} />
                        <InfoCard title="Assignee" details={assigneeData[0]?.firstName?? "Not Assigned"} />
                        <InfoCard title="Date Created" details={dateFormatter(bugEntry?.createdAt)} />

                    </div>
                </div>
                <div className="flex justify-between items-center mt-3 border-t-1 border-color mx-7">

                    <Button
                        color="white"
                        bgColor={currentColor}
                        text="Edit Details"
                        borderRadius="10px"
                        onClick={() => { setShowInfoModal(false); setShowModal(true); setIsEdit(true); setCurrentEntry(bugEntry);   window.scrollTo(0, 0) }}
                    />
                <Button
                    color="white"
                    bgColor={currentColor}
                    text={bugEntry?.status==="Open"? "Send to Review": bugEntry?.status ==="In Review" ?"Mark as Complete": bugEntry?.status ==="Closed" ?"Re-Open": null}
                    borderRadius="10px"
                    onClick={() => {editbugHandler(bugEntry)  }}
                />



                </div>
            </div>
        </div>
      
    )
}
