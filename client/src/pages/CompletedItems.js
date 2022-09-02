import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { editBugsAction } from '../redux/bugsSlices';
import { editTasksAction } from '../redux/taskSlices';
import dateFormatter from '../utils/dateFormatter';






const {currentColor}=useStateContext
function CompletedItems(props) {
 const location=useLocation()
 const dispatch=useDispatch()
 const [completedItems, setCompletedItems]=useState(location?.state?.bugs ?? location?.state?.tasks)
 
const newStatus=location?.state?.bugs ? "Open" : "To Do"

 const edititemHandler = (item) => {
    const values = {
     taskId: item?.taskId,
      status: newStatus,
      bugId: item.bugId,
    };
  
    location?.state?.bugs ?  dispatch(editBugsAction(values)): dispatch(editTasksAction(values));
    const newList = completedItems?.filter((selectedItem) => {
      return selectedItem._id !== item?._id;
    });
console.log(newList)
    setCompletedItems(newList);
   
  };
  return (
    <div className="table mt-24">
<h2>Completed {location?.state?.bugs? "Bugs": "Tasks"}</h2>
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-2">Title</div>
          <div className="col col-2">Assignee</div>
          <div className="col col-3">Date Modified</div>
          <div className="col col-4">Action</div>

        </li>

        {completedItems?.map(item=> (<li className="table-row" key={item?._id} >
                <div className="col col-2" data-label="Name">{item?.title}</div>
                <div className="col col-2" data-label="Email">{item?.assigned?? "Not Assigned"}</div>
                <div className="col col-3" data-label="Role" >{dateFormatter(item?.updatedAt)} </div>
                <div className="col col-4" data-label="Status">
                    <button type="button" className="bg-green-500 rounded px-2 py-1"
                    onClick={()=> edititemHandler(item)}>
                        Re-Open
                    </button>
                </div>
          
            

              </li>))}


      </ul>

    </div>
  )
}

export default CompletedItems