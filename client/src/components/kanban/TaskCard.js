import React from 'react'
import { useDrag } from 'react-dnd';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { useStateContext } from '../../context/ContextProvider';


function TaskCard({ task, type }) {
 
  const { setShowModal ,setShowDeleteModal, setIsEdit,setCurrentEntry} = useStateContext();
const [{isDragging},drag]=useDrag({
  item:{ task,
},
    

  type:type,
  collect: monitor => ({
    isDragging: !!monitor.isDragging(),
  
  })
})


  return (
    <div className="task" id="task"  ref= {drag} style={{opacity: isDragging? 0.3: 1}} >
      <span>{task?.title}</span>
      <div className="summary">
        <p>{task?.summary}</p>
      </div>
      <div className='flex justify-end gap-3'>

        <MdDeleteForever size="20px" color='red' onClick={() => {
          setShowDeleteModal(true);
          setCurrentEntry(task)
        }} style={{ cursor: "pointer" }} />
        <MdEdit size="20px" color='orange' onClick={() => {
          setShowModal(true);
          setIsEdit(true);
          setCurrentEntry(task)
        }} style={{ cursor: "pointer" }} />

      </div>
    </div>
  )
}

export default TaskCard