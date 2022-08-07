import React from 'react'
import { useDrag } from 'react-dnd';
import { useStateContext } from '../../context/ContextProvider';


function TaskCard({ task, type }) {
 
  const { setCurrentEntry, setShowInfoModal} = useStateContext();
const [{isDragging},drag]=useDrag({
  item:{ task,
},
    

  type:type,
  collect: monitor => ({
    isDragging: !!monitor.isDragging(),
  
  })
})


  return (
    <div className="task" id="task"  ref= {drag} style={{opacity: isDragging? 0.3: 1, cursor: "pointer"}}  onClick={()=> {setShowInfoModal(true); setCurrentEntry(task)}} >
      <span>{task?.title}</span>
      <div className="summary">
        <p>{task?.summary}</p>
      </div>
 

   
    </div>
  )
}

export default TaskCard