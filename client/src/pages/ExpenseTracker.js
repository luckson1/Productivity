import React, { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import CreateEntry from '../components/expenseTraker/CreateEntry'
import EntryList from '../components/expenseTraker/EntryList'

function ExpenseTracker() {
  const [showModal, setShowModal] = useState(false)
  const [isExpense, setIsExpense] = useState(false)
  return (
    <div>
      <div className="content-display-buttons" id="transactions">
        <button className="list-heading-button" id="income" onClick={() => setIsExpense(false)}
          style={{
            backgroundColor: isExpense ? "#ac73ff" : "white",
            borderStartStartRadius: "10px",
            borderEndStartRadius: "10px"
          }}>
          View Incomes
        </button>
        <button className="list-heading-button " id="expense" onClick={() => setIsExpense(true)}
          style={{
            backgroundColor: !isExpense ? "#ac73ff" : "white",
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
      <EntryList />
      {showModal && <CreateEntry setShowModal={setShowModal} isExpense={isExpense} setIsExpense={setIsExpense} />}
    </div>
  )
}

export default ExpenseTracker