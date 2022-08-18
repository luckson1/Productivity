import React from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../utils/items'
import { useDispatch } from 'react-redux';
import {  editBugsAction } from '../../redux/bugsSlices';
import { useStateContext } from '../../context/ContextProvider';

function ClosedBugs({ children }) {
    const {bugs,setBugs}=useStateContext()
    const dispatch = useDispatch()


    const editBugHandler= (item)=> {

        const editedBugValues= {title: item?.bug.title, description: item?.bug.description, status:"Closed", _id:item?.bug._id, createdAt: item?.bug.createdAt,  bugId:item?.bug.bugId,updatedAt: new Date()}
        let editedBug=[]
        editedBug.push(editedBugValues)
        console.log(editedBugValues)
        dispatch( editBugsAction (( editedBugValues)))
  const newBugs= bugs?.filter(bug=> {
    return bug._id !==item?.bug._id
  })
  
        setBugs([...newBugs, ...editedBug]);
    }
    const [{ isOver, canDrop}, drop] = useDrop({
        accept: [ItemTypes.OPEN, ItemTypes.REVIEW],

        drop: (item, monitor) =>editBugHandler(item),

        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
            didDrop: !!monitor.didDrop()
        })


    })

    const isActive = isOver && canDrop
    return (
        <div className={ isActive? "bg-gradient-to-r from-green-400 via-emerald-300 to-teal-300 kanban-block" : "bg-slate-100 kanban-block" } id="done" ref={drop}  >
            {children}
        </div>
    )
}

export default ClosedBugs