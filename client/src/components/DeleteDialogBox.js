import React from 'react'
import { useDispatch } from "react-redux"
import { useStateContext } from '../context/ContextProvider';
import { deleteExpenseAction } from '../redux/expenseSlices';
import { deleteShoppingItemAction } from '../redux/shoppingItemSlices';
import { deleteTaskAction } from '../redux/taskSlices';
function DeleteDialogBox({ item,shoppingItem, task, entry}) {
       // dispatch action to delete task
       const dispatch = useDispatch()
       const { setShowDeleteModal} = useStateContext();
    return (
        <div>
        
            <div className="delete-modal">
                <div className="modalContent">
                    <span className="close"onClick={()=> setShowDeleteModal(false)}>×</span>
                    <p>Are you sure you want to delete this {item}</p>
                    <button className="del" onClick={() => { dispatch(deleteTaskAction(task));dispatch(deleteShoppingItemAction(shoppingItem));dispatch(deleteExpenseAction(entry))}}>Delete {item}</button>
                    <button className="cancel" onClick={()=> setShowDeleteModal(false)}>Cancel</button>
                </div> 
            </div>
        </div>
    )
}

export default DeleteDialogBox