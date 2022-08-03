import React from 'react'
import { useDrag } from 'react-dnd';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { useStateContext } from '../../context/ContextProvider';



function ShoppingItemCard({type, shoppingItem}) {
  const {setShowDeleteModal, setCurrentItem, setShowModal, setIsEdit }=useStateContext()

  const [{ isDragging }, drag] = useDrag({
    item: {
      id: shoppingItem?._id,
    },


    type: type,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),

    })
  })


  return (
    <div className="task" id="task" ref={drag} style={{ opacity: isDragging ? 0.3 : 1 }} >

      <div className="summary" >
        <p> {shoppingItem?.units} {shoppingItem?.name} </p>
        {shoppingItem?.price > 0 && <p style={{ color: "rgb(110, 148, 245)" }}>| Price: {shoppingItem?.price} |</p>}
        {shoppingItem?.price > 0 && <p style={{ color: "#f56b6b" }}> Total: Ksh {shoppingItem?.totalItemCost || shoppingItem?.price*shoppingItem?.units}</p>}

      </div>
      <div className='flex justify-end gap-4 items-end'>
      
        <MdDeleteForever size="20px" color='red' onClick={() => {
          setShowDeleteModal(true);
          setCurrentItem(shoppingItem)
        }} style={{ cursor: "pointer" }} />
        <MdEdit size="20px" color='orange' onClick={() => {
          setShowModal(true);
          setIsEdit(true);
          setCurrentItem(shoppingItem);
          window.scrollTo(0, 0)
        }} style={{ cursor: "pointer" }} />



      </div>
    </div>
  )
}

export default ShoppingItemCard