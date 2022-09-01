import React from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../utils/items'
import { useDispatch } from 'react-redux';
import { editTasksAction } from '../../redux/taskSlices';
import { useStateContext } from '../../context/ContextProvider';
import { v4 as uuidv4 } from "uuid";

function DoneTasks({ children, setStatus }) {
    const {tasks,setTasks}=useStateContext()
    const dispatch = useDispatch()


    const editTaskHandler= (item)=> {
        const editedTaskValues= {title: item?.task.title, summary: item?.task.summary, status:"Done", _id:item.task._id, createdAt: item.task.createdAt, updatedAt: new Date(), taskId: item?.task.taskId ?? uuidv4()}
        let editedTask=[]
        editedTask.push(editedTaskValues)
        dispatch(editTasksAction(( editedTaskValues)))
  const newTasks= tasks?.filter(task=> {
    return task._id !==item.task._id
  })
  
        setTasks([ ...editedTask, ...newTasks]);
    }
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: [ItemTypes.PROGRESS, ItemTypes.DO],

        drop: (item, monitor) => { editTaskHandler(item) },

        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
            didDrop: !!monitor.didDrop()
        })


    })

    const isActive = isOver && canDrop
    return (
        <div className={ isActive? "bg-gradient-to-r from-green-400 via-emerald-50 to-teal-400 kanban-block shadow-2xl" : "bg-gradient-to-r from-green-200 via-emerald-50 to-teal-200 kanban-block shadow-md" } id="done" ref={drop}  >
            {children}
        </div>
    )
}

export default DoneTasks