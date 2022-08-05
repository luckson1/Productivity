import React from 'react'
import { MdCancel } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useStateContext } from '../../context/ContextProvider';
import { editBugsAction } from '../../redux/bugsSlices';
import dateFormatter from '../../utils/dateFormatter';
import { Button } from '../Button'
import BugCard from './bugCard';

export const BugsInformation = ({ bugEntry }) => {
    const { currentColor, setShowBugInfoModal, setIsEdit, setShowModal, setCurrentEntry, bugs, currentEntry, setBugs} = useStateContext();
    const entry=currentEntry
    const dispatch= useDispatch()
    const editbugHandler = (bugEntry) => {
        const values={
            title:bugEntry.title, 
            description:bugEntry.description, 
            steps:bugEntry.steps,
            status: "Closed",
            priority:bugEntry.priority ,
            assigned:bugEntry.assigned ,
            createdAt:bugEntry.createdAt ,
            _id:bugEntry._id ,
            bugId:bugEntry._id 
        }
        dispatch(editBugsAction(values));
        const newBugs = bugs?.filter(bug => {
            return entry._id !== bug?._id
        })
       
        setBugs([...newBugs, values]);
        setShowBugInfoModal(false);

    }


    return (
        <div className="modal">
            <div className="bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-100 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl md:w-780   ">
                <div className="flex justify-between items-center gap-2">
                    <p className="text-xl font-semibold text-gray-900 text-center">Bug Information</p>

                    <MdCancel className='' color='red' size="30px" onClick={() => {
                        setIsEdit(false);
                        setShowBugInfoModal(false);


                    }} />
                </div>

                <div className="mt-3 w-72 md:w-400 text-sm ">

                    <div className="flex-col">

                        <BugCard title="Title" details={bugEntry?.title} />
                        <BugCard title="Status" details={bugEntry?.status} />
                        <BugCard title="Description" details={bugEntry?.description} />
                        <BugCard title="Steps" details={bugEntry?.steps} />
                        <BugCard title="Priority" details={bugEntry?.priority} />
                        <BugCard title="Date Created" details={dateFormatter(bugEntry?.createdAt)} />

                    </div>
                </div>
                <div className="flex justify-between items-center mt-3 border-t-1 border-color">

                    <Button
                        color="white"
                        bgColor={currentColor}
                        text="Edit Details"
                        borderRadius="10px"
                        onClick={() => { setShowBugInfoModal(false); setShowModal(true); setIsEdit(true); setCurrentEntry(bugEntry);   window.scrollTo(0, 0) }}
                    />
                    <Button
                        color="white"
                        bgColor={currentColor}
                        text="Mark Complete"
                        borderRadius="10px"
                        onClick={() => { editbugHandler(bugEntry)  }}
                    />



                </div>
            </div>
        </div>
    )
}
