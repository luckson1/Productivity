import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CreateEntry from '../components/expenseTraker/CreateEntry'
import EntryList from '../components/expenseTraker/EntryList'
import { useStateContext } from '../context/ContextProvider'
import { FetchExpensesAction } from '../redux/expenseSlices'
import { fetchIncomesAction } from '../redux/IncomeSlices'

function ExpenseTracker() {
  const {currentColor ,showModal, setShowModal,isExpense, setIsExpense} = useStateContext();


  // dispatch action to fetch incomes and expenses
  const dispatch= useDispatch()
useEffect(()=> {
dispatch(fetchIncomesAction())
}, [])
useEffect(()=> {
  dispatch(FetchExpensesAction())
  }, [])


  const incomesState=useSelector(state=> state?.incomes)
  const {incomeLoading, incomeList}=incomesState
const incomes=incomeList?.docs


const expensesState=useSelector(state=> state?.expenses)
const {expenseLoading, expenseList}=expensesState
const expenses=expenseList?.docs
  return (
    <div>
      <div className="content-display-buttons" id="transactions">
        <button className="list-heading-button" id="income" onClick={() => setIsExpense(false)}
          style={{
            backgroundColor: isExpense ? currentColor : "white",
            borderStartStartRadius: "10px",
            borderEndStartRadius: "10px"
          }}>
          View Incomes
        </button>
        <button className="list-heading-button " id="expense" onClick={() => setIsExpense(true)}
          style={{
            backgroundColor: !isExpense ? currentColor : "white",
            borderStartEndRadius: "10px",
            borderEndEndRadius: "10px"
          }}>
          View Expenses
        </button>
      </div>
      <div className="entry-buttons">
        {!isExpense && <button id="task-button" onClick={() => setShowModal(true)}> Add Income</button>}
        {isExpense && <button id="expense-button" onClick={() => { setShowModal(true); setIsExpense(true) }}> Add Expense</button>}
      </div>
      <h3>{isExpense? "Expenses": "Incomes"}</h3>
    
     { !isExpense && <EntryList entries= {incomes} isExpense={isExpense} loading={incomeLoading}/>}
      {isExpense && <EntryList  entries= {expenses} isExpense={isExpense} loading={expenseLoading}/>}
     
      {showModal && <CreateEntry setShowModal={setShowModal} isExpense={isExpense} setIsExpense={setIsExpense} />}
    </div>
  )
}

export default ExpenseTracker