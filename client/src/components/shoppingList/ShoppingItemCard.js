import React from 'react'
import { useDrag } from 'react-dnd';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { editShoppingItem } from '../../redux/shoppingItemSlices';


function ShoppingItemCard({ setShowDeleteModal, setCurrentItem, setShowModal, shoppingItem, setIsEdit, type, showCart }) {

  const dispatch = useDispatch()
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
        <p style={{ color: "rgb(110, 148, 245)" }}>| Price: {shoppingItem?.price} |</p>
        <p style={{color:"#f56b6b"}}> Total: Ksh {shoppingItem?.totalItemCost}</p>

      </div>
      <div className='handling-buttons'>

        <MdDeleteForever size="20px" color='red' onClick={() => {
          setShowDeleteModal(true);
          setCurrentItem(shoppingItem)
        }} style={{ cursor: "pointer" }} />
        {showCart === false && <button className='details-button'
          onClick={() => { dispatch(editShoppingItem({ id: shoppingItem?.id, status: "Added to Cart" })); window.location.reload() }}>
          Add to Cart
        </button>}
        <MdEdit size="20px" color='orange' onClick={() => {
          setShowModal(true);
          setIsEdit(true);
          setCurrentItem(shoppingItem)
        }} style={{ cursor: "pointer" }} />

      </div>
    </div>
  )
}

export default ShoppingItemCard