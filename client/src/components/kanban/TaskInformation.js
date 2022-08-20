import React from 'react'
import { MdCancel } from 'react-icons/md';

import { useStateContext } from '../../context/ContextProvider';

import dateFormatter from '../../utils/dateFormatter';
import InfoCard from '../InfoCard';
import { Button } from '../Button'


export const TasksInformation = () => {
    const { currentColor, setShowInfoModal, setIsEdit, setShowModal,  setShowDeleteModal, setCurrentEntry, currentEntry} = useStateContext();
    
const  task=currentEntry



    return (
        <div className="fixed-modal">
        <div className="modal">
            <div className="bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-100 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl md:w-780   ">
                <div className="flex justify-between items-center gap-2">
                    <p className="text-xl font-semibold text-gray-900 text-center">Task Information</p>

                    <MdCancel className='' color='red' size="30px" onClick={() => {setShowInfoModal(false); setIsEdit(false);}} style={{cursor: "pointer"}}/>
                </div>

                <div className="mt-3 text-sm ">

                    <div className="flex-col">

                        <InfoCard title="Title" details={task?.title} />
                        <InfoCard title="Status" details={task?.status} />
                        <InfoCard title="Summary" details={task?.summary} />
                        <InfoCard title="Assignee" details={task?.assigned ?? "Not Assigned"} />
                        <InfoCard title="Date Created" details={dateFormatter(task?.createdAt)} />
                    {  task?.start!==undefined &&  <InfoCard title=" Starting Date" details={dateFormatter(task?.start)} />}
                        { task?.end!==undefined && <InfoCard title="Ending Date" details={dateFormatter(task?.end)} />}



                    </div>
                </div>
                <div className="flex justify-between items-center mt-3 border-t-1 border-color">

                    <Button
                        color="white"
                        bgColor={currentColor}
                        text="Edit Details"
                        borderRadius="10px"
                        onClick={() => { setShowInfoModal(false); setShowModal(true); setIsEdit(true);  setCurrentEntry(task);window.scrollTo(0, 0) }}
                    />
                    <Button
                        color="white"
                        bgColor= "red"
                        text="Delete Task"
                        borderRadius="10px"
                        onClick={() => {
                            setShowDeleteModal(true);
                       
                            setShowInfoModal(false); 
                          }}
                    />



                </div>
            </div>
        </div>
        </div>
    )
}
