import React from 'react'
import { useDrag } from 'react-dnd';
import { useStateContext } from '../../context/ContextProvider';


function BugCard({ bug, type }) {

  const { setCurrentEntry, setShowInfoModal } = useStateContext();
  const [{ isDragging }, drag] = useDrag({
    item: {
      bug,
    },


    type: type,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),

    })
  })


  return (
    <div className="task" id="task" ref={drag} style={{ opacity: isDragging ? 0.3 : 1, cursor: "pointer" }} onClick={() => { setShowInfoModal(true); setCurrentEntry(bug) }} >
      <div className="flex flex-row justify-between">
        <p>{bug?.title}</p>
        <div className={bug?.priority=== "Low" ?'bg-blue-200 rounded mt-1 text-xs p-1': bug?.priority==="Medium" ? " rounded mt-1 text-xs p-1 bg-amber-200" : "bg-red-500 rounded mt-1 text-xs p-1"}>
          <p>{bug?.priority} Priority</p>
        </div>
      </div>
      <div className="summary">
        <p>{bug?.description}</p>
      </div>



    </div>
  )
}

export default BugCard