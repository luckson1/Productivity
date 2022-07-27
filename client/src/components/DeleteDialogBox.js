import React from 'react'
import { useDispatch } from "react-redux"
import { useStateContext } from '../context/ContextProvider';
import { deleteExpenseAction } from '../redux/expenseSlices';
import { deleteIncomeAction } from '../redux/IncomeSlices';
import { deleteShoppingItemAction } from '../redux/shoppingItemSlices';
import { deleteTaskAction } from '../redux/taskSlices';
function DeleteDialogBox({ item, shoppingItem, task, entry, }) {
    console.log(entry)
    // dispatch action to delete task
    const dispatch = useDispatch()
    const { setShowDeleteModal, isExpense } = useStateContext();
    return (
        <div>

            <div className="delete-modal">
                <div className="modalContent">
                    <span className="close" onClick={() => setShowDeleteModal(false)}>×</span>
                    <p>Are you sure you want to delete this {item}</p>
                    <button className="del" onClick={
                        task !== undefined ? () => { dispatch(deleteTaskAction(task)) }
                            : shoppingItem !== undefined ? () => {
                                dispatch(deleteShoppingItemAction(shoppingItem)); setTimeout(() => {
                                    window.location.reload()
                                },1000)
                            }
                                : entry !== undefined && isExpense ? () => {
                                    dispatch(deleteExpenseAction(entry)); setTimeout(() => {
                                        window.location.reload()
                                    },1000)
                                }
                                    : entry !== undefined && !isExpense ? () => {
                                        dispatch(deleteIncomeAction(entry)); setTimeout(() => {
                                            window.location.reload()
                                        },1000)
                                    }
                                        : console.log("error")
                    }>Delete {item}</button>
                    <button className="cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteDialogBox