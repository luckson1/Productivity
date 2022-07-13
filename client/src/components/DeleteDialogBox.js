import React from 'react'
import { useDispatch } from "react-redux"
import { deleteTaskAction } from '../redux/taskSlices';
function DeleteDialogBox({setShowDeleteModal, item,task}) {
       // dispatch action to delete task
       const dispatch = useDispatch()
  
    return (
        <div>
        
            <div className="delete-modal">
                <div className="modalContent">
                    <span className="close"onClick={()=> setShowDeleteModal(false)}>×</span>
                    <p>Are you sure you want to delete this {item}</p>
                    <button className="del" onClick={() => { dispatch(deleteTaskAction(task));window.location.reload()}}>Delete {item}</button>
                    <button className="cancel" onClick={()=> setShowDeleteModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteDialogBox