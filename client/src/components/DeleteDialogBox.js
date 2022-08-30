import React from 'react'
import { useDispatch } from "react-redux"
import { useStateContext } from '../context/ContextProvider';

import { deleteTaskAction } from '../redux/taskSlices';
function DeleteDialogBox({ item, shoppingItem, task, entry, }) {

    // dispatch action to delete task
    const dispatch = useDispatch()
    const { setShowDeleteModal,  tasks,setTasks } = useStateContext();

    const deleteTaskHandler= ()=>{
        dispatch(deleteTaskAction(task))
        const newTasks= tasks.filter(item=> item.id !== task.id)
        setTasks(newTasks);
        setShowDeleteModal(false)
    }

   


    
    return (
        <div>

            <div className="fixed-modal">
                <div className="modalContent">
                    <span className="close" onClick={() => setShowDeleteModal(false)}>×</span>
                    <p>Are you sure you want to delete this {item}</p>
                    <button className="del" onClick={
                        task !== undefined ? () =>deleteTaskHandler()
                                        : console.log("error")
                    }>Delete {item}</button>
                    <button className="cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteDialogBox