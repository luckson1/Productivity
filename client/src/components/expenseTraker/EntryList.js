import React from 'react'

function EntryList() {
  return (
    <div className="table">

    <ul className="responsive-table">
      <li className="table-header">
        <div className="col col-1">Job Id</div>
        <div className="col col-2">Customer Name</div>
        <div className="col col-3">Amount Due</div>
        <div className="col col-4">Payment Status</div>
      </li>
      <li className="table-row">
        <div className="col col-1" data-label="Job Id">42235</div>
        <div className="col col-2" data-label="Customer Name">John Doe</div>
        <div className="col col-3" data-label="Amount">$350</div>
        <div className="col col-4" data-label="Payment Status">Pending</div>
      </li>
      <li className="table-row">
        <div className="col col-1" data-label="Job Id">42442</div>
        <div className="col col-2" data-label="Customer Name">Jennifer Smith</div>
        <div className="col col-3" data-label="Amount">$220</div>
        <div className="col col-4" data-label="Payment Status">Pending</div>
      </li>
      <li className="table-row">
        <div className="col col-1" data-label="Job Id">42257</div>
        <div className="col col-2" data-label="Customer Name">John Smith</div>
        <div className="col col-3" data-label="Amount">$341</div>
        <div className="col col-4" data-label="Payment Status">Pending</div>
      </li>
      <li className="table-row">
        <div className="col col-1" data-label="Job Id">42311</div>
        <div className="col col-2" data-label="Customer Name">John Carpenter</div>
        <div className="col col-3" data-label="Amount">$115</div>
        <div className="col col-4" data-label="Payment Status">Pending</div>
      </li>
    </ul>
  </div>
  )
}

export default EntryList