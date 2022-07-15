import React from 'react'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import ShoppingListComponent from '../components/shoppingList/ShoppingListComponent'


function ShoppingList() {
  return (
    <DndProvider backend={ TouchBackend}>
<ShoppingListComponent />
    </DndProvider>
  )
}

export default ShoppingList