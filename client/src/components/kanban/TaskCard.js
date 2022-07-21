import React from 'react'
import { useDrag } from 'react-dnd';
import { MdDeleteForever, MdEdit } from 'react-icons/md';


function TaskCard({ setShowDeleteModal, setCurrentTask, setShowModal, task, setIsEdit, type,newStatus }) {
 

const [{isDragging},drag]=useDrag({
  item:{ id: task?._id,
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
      <div className='handling-buttons'>

        <MdDeleteForever size="20px" color='red' onClick={() => {
          setShowDeleteModal(true);
          setCurrentTask(task)
        }} style={{ cursor: "pointer" }} />
        <MdEdit size="20px" color='orange' onClick={() => {
          setShowModal(true);
          setIsEdit(true);
          setCurrentTask(task)
        }} style={{ cursor: "pointer" }} />

      </div>
    </div>
  )
}

export default TaskCard