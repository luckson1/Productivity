import React from 'react'
import { useDrag } from 'react-dnd';
import { useStateContext } from '../../context/ContextProvider';


function BugCard({ bug, type }) {
 
  const { setCurrentEntry, setShowInfoModal} = useStateContext();
const [{isDragging},drag]=useDrag({
  item:{ bug,
},
    

  type:type,
  collect: monitor => ({
    isDragging: !!monitor.isDragging(),
  
  })
})


  return (
    <div className="task" id="task"  ref= {drag} style={{opacity: isDragging? 0.3: 1, cursor: "pointer"}}  onClick={()=> {setShowInfoModal(true); setCurrentEntry(bug)}} >
      <span>{bug?.title}</span>
      <div className="summary">
        <p>{bug?.description}</p>
      </div>
 

   
    </div>
  )
}

export default BugCard