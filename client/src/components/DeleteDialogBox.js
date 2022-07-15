import React from 'react'
import { useDispatch } from "react-redux"
import { deleteShoppingItemAction } from '../redux/shoppingItemSlices';
import { deleteTaskAction } from '../redux/taskSlices';
function DeleteDialogBox({setShowDeleteModal, item,shoppingItem, task}) {
       // dispatch action to delete task
       const dispatch = useDispatch()
  
    return (
        <div>
        
            <div className="delete-modal">
                <div className="modalContent">
                    <span className="close"onClick={()=> setShowDeleteModal(false)}>×</span>
                    <p>Are you sure you want to delete this {item}</p>
                    <button className="del" onClick={() => { dispatch(deleteTaskAction(task));dispatch(deleteShoppingItemAction(shoppingItem));window.location.reload()}}>Delete {item}</button>
                    <button className="cancel" onClick={()=> setShowDeleteModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteDialogBox