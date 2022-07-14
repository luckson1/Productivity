import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { DndProvider } from "react-dnd"
import { HTML5Backend, } from "react-dnd-html5-backend"

import {  MdAdd } from "react-icons/md"
import CreateTask from '../components/createTask'
import { fetchTasksAction } from '../redux/taskSlices';
import DeleteDialogBox from '../components/DeleteDialogBox'
import TaskCard from '../components/TaskCard'


export default function Kanban() {
    // display or remove action creation/edit form 
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [currentTask, setCurrentTask] = useState()



    // dispatch action to fetch all tasks
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksAction())
    }, [dispatch])

    const tasksState = useSelector((state) => state?.tasks)
    const { tasksFetched, taskLoading, taskAppErr, taskServerErr } = tasksState
    const toDoTasks = tasksFetched?.tasks?.filter(task => task?.status === "To Do")
    const inProgressTasks = tasksFetched?.tasks?.filter(task => task?.status === "In Progress")
    const doneTasks = tasksFetched?.tasks?.filter(task => task?.status === "Done")

    //delete action dispatch


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="container">
                <div className="kanban-heading">
                    <strong className="kanban-heading-text">Kanban Board</strong>
                </div>
                <div className="kanban-board">
                    <div className="kanban-block" id="todo" >
                        <strong>To Do</strong>
                        <div className="task-button-block">
                            <button id="task-button" onClick={() => setShowModal(true)}> <MdAdd size="15px" /> New task</button>

                        </div>
                        {taskAppErr || taskServerErr ? (<div className="form-validation">An Error Has Occured</div>)
                            : taskLoading ? <h4>Loading Please Wait......</h4>
                                : toDoTasks?.length === 0 ? (<div><h3>No Tasks to Display, Please create some </h3></div>)
                                    : toDoTasks?.map(task => (<TaskCard 
                                        task={task}
                                        key={task?._id}
                                        setIsEdit={setIsEdit}
                                        setShowModal={setShowModal}
                                        setCurrentTask={setCurrentTask}
                                        setShowDeleteModal={setShowDeleteModal} />))}

                    </div>
                    <div className="kanban-block" id="inprogress" >
                        <strong>In Progress</strong>
                        {taskAppErr || taskServerErr ? (<div className="form-validation">An Error Has Occured</div>)
                            : taskLoading ? <h4>Loading Please Wait......</h4>
                                : inProgressTasks?.map(task => (<TaskCard 
                                    task={task}
                                    key={task?._id}
                                    setIsEdit={setIsEdit}
                                    setShowModal={setShowModal}
                                    setCurrentTask={setCurrentTask}
                                    setShowDeleteModal={setShowDeleteModal} />))}
                    </div>
                    <div className="kanban-block" id="done" >
                        <strong>Done</strong>
                        {taskAppErr || taskServerErr ? (<div className="form-validation">An Error Has Occured</div>)
                            : taskLoading ? <h4>Loading Please Wait......</h4>
                                : doneTasks?.map(task => (<TaskCard 
                                    task={task}
                                    key={task?._id}
                                    setIsEdit={setIsEdit}
                                    setShowModal={setShowModal}
                                    setCurrentTask={setCurrentTask}
                                    setShowDeleteModal={setShowDeleteModal} />))}
                    </div>
                </div>
                {showModal && <CreateTask setShowModal={setShowModal} isEdit={isEdit} task={currentTask} setIsEdit={setIsEdit} />}
                {showDeleteModal && <DeleteDialogBox setShowDeleteModal={setShowDeleteModal} task={currentTask} item="Task" />}
            </div>
        </DndProvider>
    )
}
