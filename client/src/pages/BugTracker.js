import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BugEntryComponent from '../components/bagtracker/BugEntryComponent'

function BugTracker() {
  return (
    <DndProvider backend={HTML5Backend}>
<BugEntryComponent />
    </DndProvider>
  )
}

export default BugTracker