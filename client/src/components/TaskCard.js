import React from 'react'
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function TaskCard({ setShowDeleteModal, setCurrentTask, setShowModal, task, setIsEdit }) {
  return (
    <div className="task" id="task1" draggable="true" key={task?._id}>
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