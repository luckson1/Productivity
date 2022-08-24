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
        <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
        <div className="float-right h-screen  bg-gradient-to-r from-blue-100 via-pink-100 to-indigo-50  dark:bg-[#484B52] w-full sm:w-6/12 overflow-scroll">
                <div className="flex justify-between items-center gap-2 mx-7 mt-7">
                    <p className="text-xl font-semibold text-gray-900 text-center ">Task Information</p>

                    <MdCancel className='' color='red' size="30px" onClick={() => {setShowInfoModal(false); setIsEdit(false);}} style={{cursor: "pointer"}}/>
                </div>

                <div className="mt-3 text-sm mx-7">

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
                <div className="flex justify-between items-center mt-3 border-t-1 border-color mx-7">

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
    )
}
