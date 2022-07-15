import React from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../utils/items'
import { useDispatch } from 'react-redux';
import { editTasksAction } from '../redux/taskSlices';

function DoneTasks({ children, setStatus }) {
    const dispatch = useDispatch()
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: [ItemTypes.PROGRESS, ItemTypes.DO],

        drop: (item, monitor) => {dispatch(editTasksAction(({id:item?.id, status:"Done"} )));window.location.reload() },

        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
            didDrop: !!monitor.didDrop()
        })


    })

    const isActive = isOver && canDrop
    return (
        <div className="kanban-block" id="done" ref={drop} style={{ backgroundColor: isActive ? "#276f27" : "#baddba" }} >
            {children}
        </div>
    )
}

export default DoneTasks