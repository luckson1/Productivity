import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateEntry from '../components/expenseTraker/CreateEntry'
import EntryList from '../components/expenseTraker/EntryList'
import { useStateContext } from '../context/ContextProvider'
import { FetchExpensesAction, hideExpensesAction, showExpensesAction } from '../redux/expenseSlices'
import { fetchIncomesAction } from '../redux/IncomeSlices'

function ExpenseTracker() {
  const {currentColor ,showModal, setShowModal, setIsExpense,  incomes, setIncomes,  expenses, setExpenses} = useStateContext();


  // dispatch action to fetch incomes and expenses
  const dispatch= useDispatch()
useEffect(()=> {
dispatch(fetchIncomesAction())
}, [dispatch])
useEffect(()=> {
  dispatch(FetchExpensesAction())
  }, [dispatch])


  const incomesState=useSelector(state=> state?.incomes)
  const {incomeLoading, incomeList, incomeAppErr, incomeServerErr}=incomesState
useEffect(()=> {
  if(incomeList) setIncomes(incomeList)
},[incomeList, setIncomes])



const expensesState=useSelector(state=> state?.expenses)
const {expenseLoading, expenseList, expenseAppErr, expenseServerErr, isExpense }=expensesState
useEffect(()=> {
  if(expenseList) setExpenses(expenseList)
},[expenseList, setExpenses])

  return (
    <div>
      <div className="content-display-buttons" id="transactions">
        <button className="list-heading-button" id="income" onClick={() => dispatch(hideExpensesAction())}
          style={{
            backgroundColor: isExpense ? "white" : currentColor,
            borderStartStartRadius: "10px",
            borderEndStartRadius: "10px"
          }}>
          View Incomes
        </button>
        <button className="list-heading-button " id="expense" onClick={() => dispatch(showExpensesAction())}
          style={{
            backgroundColor: !isExpense ? "white" : currentColor,
            borderStartEndRadius: "10px",
            borderEndEndRadius: "10px"
          }}>
          View Expenses
        </button>
      </div>
      <h1 style={{marginTop: "20px", fontSize: "30px"}}>{isExpense? "Expenses List": "Incomes List"}</h1>
      <div className="entry-buttons">
        {!isExpense && <button id="task-button" onClick={() => setShowModal(true)}> Add Income</button>}
        {isExpense && <button id="expense-button" onClick={() => { setShowModal(true);  }}> Add Expense</button>}
      </div>
  
    
     { !isExpense && <EntryList entries= {incomes} isExpense={isExpense} loading={incomeLoading} errors={incomeAppErr ||incomeServerErr}/>}
      {isExpense && <EntryList  entries= {expenses} isExpense={isExpense} loading={expenseLoading}errors={expenseAppErr || expenseServerErr}/>}
     
      {showModal && <CreateEntry setShowModal={setShowModal} isExpense={isExpense} />}
    </div>
  )
}

export default ExpenseTracker