import React from 'react'
import { useDispatch } from "react-redux"
import { useStateContext } from '../context/ContextProvider';
import { deleteExpenseAction } from '../redux/expenseSlices';
import { deleteIncomeAction } from '../redux/IncomeSlices';
import { deleteShoppingItemAction, fetchAllShoppingsItem } from '../redux/shoppingItemSlices';
import { deleteTaskAction } from '../redux/taskSlices';
function DeleteDialogBox({ item, shoppingItem, task, entry, }) {

    // dispatch action to delete task
    const dispatch = useDispatch()
    const { setShowDeleteModal, isExpense, tasks,setTasks, setShoppingItems, shoppingItems,incomes, setIncomes,  expenses, setExpenses } = useStateContext();

    const deleteTaskHandler= ()=>{
        dispatch(deleteTaskAction(task))
        const newTasks= tasks.filter(item=> item.id !== task.id)
        setTasks(newTasks);
        console.log(task)
        setShowDeleteModal(false)
    }

    const deleteShoppingItemHandler = () => {
        dispatch(deleteShoppingItemAction(shoppingItem));
        dispatch(fetchAllShoppingsItem());
        const newShoppingList=shoppingItems.filter(listItem=> listItem._id !==shoppingItem?._id);
        setShoppingItems( newShoppingList);
        setShowDeleteModal(false)
    }

    const deleteIncomeHandler = () => {
        dispatch(deleteIncomeAction(entry));
        const newIncomeList=incomes.filter(income=> income._id !==entry?._id);
        setIncomes( newIncomeList);
        setShowDeleteModal(false)
    }
    const deleteExpenseHandler = () => {
        dispatch(deleteExpenseAction(entry));
        const newExpenseList=expenses.filter(expense=> expense._id !==entry?._id);
        setExpenses( newExpenseList);
        setShowDeleteModal(false)
    }
    
    return (
        <div>

            <div className="delete-modal">
                <div className="modalContent">
                    <span className="close" onClick={() => setShowDeleteModal(false)}>×</span>
                    <p>Are you sure you want to delete this {item}</p>
                    <button className="del" onClick={
                        task !== undefined ? () =>deleteTaskHandler() 
                            : shoppingItem !== undefined ? () => deleteShoppingItemHandler()
                                : entry !== undefined && isExpense ? () => deleteExpenseHandler()
                                    : entry !== undefined && !isExpense ? () => deleteIncomeHandler()
                                        : console.log("error")
                    }>Delete {item}</button>
                    <button className="cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteDialogBox