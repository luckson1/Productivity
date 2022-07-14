import React from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../utils/items'
import { editTasksAction } from '../redux/taskSlices';
import { useDispatch } from 'react-redux';


function InProgressTasks({children}) {
    const dispatch= useDispatch()
const [{isOver, canDrop, },drop]= useDrop({
    accept: ItemTypes.DO,
   drop: (item, monitor) => {dispatch(editTasksAction(item));window.location.reload()},
   
    collect: monitor => ({
        isOver: !!monitor.isOver({ shallow: true }),
        canDrop: !!monitor.canDrop(),
        didDrop: !!monitor.didDrop()
    })


})
const isActive= isOver && canDrop
  return (
    <div className="kanban-block" id="inprogress"  style={{backgroundColor: isActive? "#d5aa4c": "#f9f2e3"}} ref={drop}>
        {children}
    </div>
  )
}

export default InProgressTasks