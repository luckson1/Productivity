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
    <div className="task dark:bg-[#484B52]
     dark:text-slate-100
     transition ease-in-out 
     delay-100 
     hover:-translate-y-0.5 
     hover:scale-105 
     duration-300" id="task"  ref= {drag} style={{opacity: isDragging? 0.3: 1, cursor: "pointer"}}  onClick={()=> {setShowInfoModal(true); setCurrentEntry(task); }} >
      <span>{task?.title}</span>
      
 

   
    </div>
  )
}

export default TaskCard