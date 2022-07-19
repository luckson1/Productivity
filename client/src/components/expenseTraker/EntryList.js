import React from 'react'
import currencyFormatter from '../../utils/currencyFormatter'
import dateFormatter from '../../utils/dateFormatter'

function EntryList({entries, isExpense, loading}) {
  return (
    <div className="table">

    <ul className="responsive-table">
      <li className="table-header">
        <div className="col col-1">Title</div>
        <div className="col col-2">Description</div>
        <div className="col col-3">Amount</div>
        <div className="col col-4">Date Created</div>
      </li>

{loading? (<p>Loading, Please Wait 😀......</p>):entries?.lenght===0 ? (<p>No Entries, Create some 😀 </p>) : entries?.map(entry => (  <li className="table-row" key={entry?._id}  >
        <div className="col col-1" data-label="Title">{entry?.title}</div>
        <div className="col col-2" data-label="Description">{entry?.description}</div>
        <div className="col col-3" data-label="Amount" style={{color: isExpense? "red": "green"}}>{ currencyFormatter(entry?.amount)} </div>
        <div className="col col-4" data-label="Date">{dateFormatter( entry?.createdAt)}</div>
      </li>))}
    
     
    </ul>
  </div>
  )
}

export default EntryList