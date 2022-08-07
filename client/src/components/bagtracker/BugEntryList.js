import React from 'react'

import dateFormatter from '../../utils/dateFormatter'

import { useStateContext } from '../../context/ContextProvider';

import { BugsInformation } from './BugsInformation';


function BugEntryList({ entries, loading }) {
  const {   setCurrentEntry ,currentEntry,currentColor, showInfoModal, setShowInfoModal  } = useStateContext();

  return (
    <div className="table">

      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-2">Title</div>
          <div className="col col-5">Priority</div>
          <div className="col col-3">Status</div>
          <div className="col col-4">Date Created</div>
          <div className="col col-3">Assignee</div>
        </li>

        {loading ? (<p>Loading, Please Wait 😀......</p>) : entries?.length === 0 ? (<p>No Entries, Create some 😀 </p>) : entries?.map(entry => (<li className="table-row" key={entry?._id } style={{cursor:"pointer"}} onClick={()=> {setShowInfoModal (true); setCurrentEntry(entry);   window.scrollTo(0, 0)}} >
          <div className="col col-2" data-label="Title">{entry?.title}</div>
          <div  className={entry?.priority==="Low"? 'text-blue-500 col col-5' : entry?.priority==="Medium"? 'text-amber-400 col col-5' : entry?.priority==="High"? 'text-red-500 col col-5': "text-gray-900" } data-label="Description">{entry?.priority}</div>
          <div className="col col-3" data-label="Amount" style={{ color: entry?.status==="Open"? currentColor: "green" }}>{entry?.status}</div>
          <div className="col col-4" data-label="Date">{dateFormatter(entry?.createdAt)}</div>
          <div className="col col-3" data-label="Assigned">{entry?.assigned===undefined? "Not Assigned": entry?.assigned}</div>
        
         
      
        </li>))}


      </ul>
      {showInfoModal && <BugsInformation bugEntry={currentEntry} />}

    </div>
  )
}

export default BugEntryList