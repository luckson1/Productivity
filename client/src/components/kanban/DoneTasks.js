import React from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../utils/items'
import { useDispatch } from 'react-redux';
import { editTasksAction } from '../../redux/taskSlices';
import { useStateContext } from '../../context/ContextProvider';

function DoneTasks({ children, setStatus }) {
    const {tasks,setTasks}=useStateContext()
    const dispatch = useDispatch()


    const editTaskHandler= (item)=> {
        dispatch(editTasksAction(({_id:item?.task?._id, status:"Done"} )));
const newTasks= tasks?.filter(task=> {
    return task._id !==item.task._id
})

        setTasks([...newTasks, {title: item?.task.title, summary: item?.task.summary, status:"Done", _id:item.task._id}]);
   
       
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
        <div className={ isActive? "bg-gradient-to-r from-green-400 via-emerald-300 to-teal-300 kanban-block" : "bg-gradient-to-r from-green-200 via-emerald-200 to-teal-200 kanban-block" } id="done" ref={drop}  >
            {children}
        </div>
    )
}

export default DoneTasks