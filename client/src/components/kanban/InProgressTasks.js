import React from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../utils/items'
import { editTasksAction } from '../../redux/taskSlices';
import { useDispatch } from 'react-redux';



function InProgressTasks({children}) {
 
    const dispatch= useDispatch()
    const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.DO],
    drop: (item, monitor) => {dispatch(editTasksAction(({id:item?.id, status:"In Progress"} )));window.location.reload() },

   
    collect: monitor => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
   

    })


})
const isActive= isOver && canDrop



  return (
    <div className={isActive? "bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 kanban-block" : "bg-gradient-to-r from-orange-200 via-amber-200 to-yellow-200 kanban-block" } ref= {drop}>
        {children}
    </div>
  )
}

export default InProgressTasks