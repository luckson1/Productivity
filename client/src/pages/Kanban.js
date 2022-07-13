import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { MdDeleteForever, MdEdit, MdAdd } from "react-icons/md"
import CreateTask from '../components/createTask'
import { fetchTasksAction, deleteTaskAction } from '../redux/taskSlices';
import DeleteDialogBox from '../components/DeleteDialogBox'

export default function Kanban() {
    // display or remove action creation/edit form 
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const[currentTask,setCurrentTask]=useState()

   

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
        <div className="container">
            <div className="kanban-heading">
                <strong className="kanban-heading-text">Kanban Board</strong>
            </div>
            <div className="kanban-board">
                <div className="kanban-block" id="todo" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <strong>To Do</strong>
                    <div className="task-button-block">
                        <button id="task-button" onClick={() => setShowModal(true)}> <MdAdd size="15px" /> New task</button>

                    </div>
                    {taskAppErr || taskServerErr ? (<div className="form-validation">An Error Has Occured</div>)
                        : toDoTasks?.length === 0 ? (<div><h3>No Tasks to Display, Please create some </h3></div>)
                            : toDoTasks?.map(task => (<div className="task" id="task1" draggable="true" ondragstart="drag(event)" key={task?._id}>
                                <span>{task?.title}</span>
                                <div className="summary">
                                    <p>{task?.summary}</p>
                                </div>
                                <div className='handling-buttons'>

                                    <MdDeleteForever size="20px" color='red' onClick={ () => {
        setShowDeleteModal(true);
        setCurrentTask(task)
    }} style={{ cursor: "pointer" }} />
                                    <MdEdit size="20px" color='orange' onClick={ () => {
        setShowModal(true);
        setIsEdit(true);
        setCurrentTask(task)
    }} style={{ cursor: "pointer" }} />

                                </div>
                            </div>))}

                </div>
                <div className="kanban-block" id="inprogress" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <strong>In Progress</strong>
                    {taskAppErr || taskServerErr ? (<div className="form-validation">An Error Has Occured</div>)
                        : inProgressTasks?.map(task => (<div className="task" id="task1" draggable="true" ondragstart="drag(event)" key={task?.id}>
                            <span>{task?.title}</span>
                            <div className="summary">
                                <p>{task?.summary}</p>
                            </div>
                            <div className='handling-buttons'>

                                <MdDeleteForever size="20px" color='red' onClick={() => { dispatch(deleteTaskAction(task)); window.location.reload() }} style={{ cursor: "pointer" }} />
                                <MdEdit size="20px" color='orange' onClick={ () => {
        setShowModal(true);
        setIsEdit(true);
        setCurrentTask(task)
    }} style={{ cursor: "pointer" }} />

                            </div>
                        </div>))}
                </div>
                <div className="kanban-block" id="done" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <strong>Done</strong>
                    {taskAppErr || taskServerErr ? (<div className="form-validation">An Error Has Occured</div>)
                        : doneTasks?.map(task => (<div className="task" id="task1" draggable="true" ondragstart="drag(event)" key={task?.id}>
                            <span>{task?.title}</span>
                            <div className="summary">
                                <p>{task?.summary}</p>
                            </div>
                            <div className='handling-buttons'>

                                <MdDeleteForever size="20px" color='red' onClick={() => { dispatch(deleteTaskAction(task));window.location.reload();console.log("hi") }} style={{ cursor: "pointer" }} />
                                <MdEdit size="20px" color='orange' onClick={ () => {
        setShowModal(true);
        setIsEdit(true);
        setCurrentTask(task)
    }} style={{ cursor: "pointer" }} />

                            </div>
                        </div>))}
                </div>
            </div>
            {showModal && <CreateTask setShowModal={setShowModal} isEdit={isEdit} task={currentTask}/>}
            {showDeleteModal && <DeleteDialogBox setShowDeleteModal ={setShowDeleteModal }  task={currentTask}/>}
        </div>
    )
}
