import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import KanbanComponent from '../components/KanbanComponent'

function Kanban() {
  return (
    <DndProvider backend={HTML5Backend}>
<KanbanComponent />
    </DndProvider>
  )
}

export default Kanban