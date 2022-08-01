import React from 'react'
import currencyFormatter from '../../utils/currencyFormatter'
import dateFormatter from '../../utils/dateFormatter'
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import { useStateContext } from '../../context/ContextProvider';
import DeleteDialogBox from '../DeleteDialogBox';
import CreateEntry from '../expenseTraker/CreateEntry'

function EntryList({ entries, loading }) {
  const { showDeleteModal, setShowDeleteModal,  setIsEdit,  setCurrentEntry, isExpense, showModal, setShowModal ,currentEntry,} = useStateContext();

  return (
    <div className="table">

      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Title</div>
          <div className="col col-2">Description</div>
          <div className="col col-3">Amount</div>
          <div className="col col-4">Date Created</div>
          <div className="col col-5">Action</div>
        </li>

        {loading ? (<p>Loading, Please Wait 😀......</p>) : entries?.length === 0 ? (<p>No Entries, Create some 😀 </p>) : entries?.map(entry => (<li className="table-row" key={entry?._id} >
          <div className="col col-1" data-label="Title">{entry?.title}</div>
          <div className="col col-2" data-label="Description">{entry?.description}</div>
          <div className="col col-3" data-label="Amount" style={{ color: isExpense ? "red" : "green" }}>{currencyFormatter(entry?.amount)} </div>
          <div className="col col-4" data-label="Date">{dateFormatter(entry?.createdAt)}</div>
          <div className="col col-5 flex justify-between" data-label="Action">
            <MdDeleteForever size={"20px"} color={"red"} cursor={"pointer"} onClick={() => {
              setShowDeleteModal(true)
              setCurrentEntry(entry)
            }} />
          
            <MdModeEdit size={"20px"} color={"orange"} cursor={"pointer"} onClick={() => {
              setShowModal(true);
              setIsEdit(true);
              setCurrentEntry(entry)
            }} /> </div>
          {showDeleteModal && <DeleteDialogBox entry={currentEntry} item={isExpense ? "Expense" : "Income"} />}
          {showModal && <CreateEntry   />}
        </li>))}


      </ul>

    </div>
  )
}

export default EntryList