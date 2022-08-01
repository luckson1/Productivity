import React from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../utils/items'
import { editTasksAction } from '../../redux/taskSlices';
import { useDispatch } from 'react-redux';
import { useStateContext } from '../../context/ContextProvider';



function InProgressTasks({children}) {
  const {tasks,setTasks}=useStateContext()
    const dispatch= useDispatch()

    const editTaskHandler= (item)=> {
      dispatch(editTasksAction(({_id:item.task._id, status:"In Progress"} )));
const newTasks= tasks?.filter(task=> {
  return task._id !==item.task._id
})

      setTasks([...newTasks, {title: item?.task.title, summary: item?.task.summary, status:"In Progress", _id:item.task._id}]);
 
     
  }
    const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.DO],
    drop: (item, monitor) => editTaskHandler(item),

   
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