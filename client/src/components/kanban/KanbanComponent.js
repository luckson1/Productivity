import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"

import CreateTask from './createTask'
import { fetchTasksAction } from '../../redux/taskSlices';
import DeleteDialogBox from '../DeleteDialogBox'
import TaskCard from './TaskCard'
import { ItemTypes } from '../../utils/items'
import InProgressTasks from './InProgressTasks'
import DoneTasks from './DoneTasks'
import { useStateContext } from '../../context/ContextProvider';


export default function KanbanComponent() {
    // display or remove action creation/edit form 
  

    const {currentColor, showModal, setShowModal ,showDeleteModal, setShowDeleteModal,isEdit, setIsEdit,currentEntry, setCurrentEntry} = useStateContext();

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
 


    return (

        <div className="container ">
            <div className="kanban-heading">
                <h2 className="kanban-heading-text" style={{backgroundColor: currentColor}}>Kanban Board</h2>
            </div>
           
            <div className="kanban-board ">
                <div className="kanban-block bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
                    <strong>To Do</strong>
                    <div className="task-button-block">
                        <button id="task-button" onClick={() => setShowModal(true)}> Add New task</button>

                    </div>
                    {taskAppErr || taskServerErr ? (<div className="form-validation">An Error Has Occured</div>)
                        : taskLoading ? <h4>Loading Please Wait......</h4>
                            : toDoTasks?.length === 0 ? (<div><h3>No Tasks to Display, Please create some </h3></div>)
                                : toDoTasks?.map(task => (<TaskCard
                                    task={task}
                                    key={task?._id}
                                    setIsEdit={setIsEdit}
                                    setShowModal={setShowModal}
                                    setCurrentEntry={setCurrentEntry}
                                    setShowDeleteModal={setShowDeleteModal}
                                    type={ItemTypes.DO}
                                    newStatus="Done"
                                />))}

                </div>
                <InProgressTasks  >
                    <strong>In Progress</strong>
                    {taskAppErr || taskServerErr ? (<div className="form-validation">An Error Has Occured</div>)
                        : taskLoading ? <h4>Loading Please Wait......</h4>
                            : inProgressTasks?.map(task => (<TaskCard
                                task={task}
                                key={task?._id}
                                setIsEdit={setIsEdit}
                                setShowModal={setShowModal}
                                setCurrentEntry={setCurrentEntry}
                                setShowDeleteModal={setShowDeleteModal}
                                type={ItemTypes.PROGRESS}
                                newStatus="Done"
                            />))}
                </InProgressTasks>
                <DoneTasks>
                    <strong>Done</strong>
                    {taskAppErr || taskServerErr ? (<div className="form-validation">An Error Has Occured</div>)
                        : taskLoading ? <h4>Loading Please Wait......</h4>
                            : doneTasks?.map(task => (<TaskCard
                                task={task}
                                key={task?._id}
                                setIsEdit={setIsEdit}
                                setShowModal={setShowModal}
                                setCurrentEntry={setCurrentEntry}
                                setShowDeleteModal={setShowDeleteModal}
                                type={ItemTypes.DONE}
                            />))}

                </DoneTasks>
            </div>
            {showModal && <CreateTask setShowModal={setShowModal} isEdit={isEdit} task={currentEntry} setIsEdit={setIsEdit} />}
            {showDeleteModal && <DeleteDialogBox setShowDeleteModal={setShowDeleteModal} task={currentEntry} item="Task" />}
        </div>

    )
}
