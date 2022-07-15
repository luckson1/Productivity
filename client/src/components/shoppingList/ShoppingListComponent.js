import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { MdAdd } from "react-icons/md"

import DeleteDialogBox from '../DeleteDialogBox'
import { ItemTypes } from '../../utils/items'
import CreateShoppingItem from './CreateShoppingItem';
import ShoppingItemCard from './ShoppingItemCard';
import ItemsAddedToCart from './ItemAddedToCart';
import { fetchAllShoppingsItem } from '../../redux/shoppingItemSlices'


export default function ShoppingListComponent() {
    // display or remove action creation/edit form 
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [currentItem, setCurrentItem] = useState()
    const [showCart, setShowCart] = useState(false)



    // dispatch action to fetch all itemss
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllShoppingsItem())
    }, [dispatch])

    const shoppingItemsState = useSelector((state) => state?.shoppingItem)
    const { shoppingItemsFetched, shoppingItemLoading, shoppingItemAppErr, shoppingItemServerErr } = shoppingItemsState
    const toDoshoppingItems = shoppingItemsFetched?.shoppingItems?.filter(shoppingItem => shoppingItem?.status === "On Shopping List")
    const doneshoppingItems = shoppingItemsFetched?.shoppingItems?.filter(shoppingItem => shoppingItem?.status === "Added to Cart")



    return (

        <div className="container">
            <div className="kanban-heading">
                <h3 className="kanban-heading-text">Shopping List</h3>
            </div>
            <div className="price-display-buttons">
                <button className="list-heading-button" onClick={() => setShowCart(false)}
                    style={{
                        backgroundColor: showCart ? "#ac73ff" : "white",
                        borderStartStartRadius: "10px",
                        borderEndStartRadius: "10px"
                    }}>
                    Items On List
                </button>
                <button className="list-heading-button " onClick={() => setShowCart(true)}
                    style={{
                        backgroundColor: !showCart ? "#ac73ff" : "white",
                        borderStartEndRadius: "10px",
                        borderEndEndRadius: "10px"
                    }}>
                    Items In Cart
                </button>
            </div>
            <div className="kanban-board">
                {!showCart && <div className="kanban-block" id="todo" >
                    <strong>On List</strong>
                    <div className="task-button-block">
                        <button id="task-button" onClick={() => setShowModal(true)}> <MdAdd size="15px" /> Item</button>

                    </div>
                    {shoppingItemAppErr || shoppingItemServerErr ? (<div className="form-validation">An Error Has Occured</div>)
                        : shoppingItemLoading ? <h4>Loading Please Wait......</h4>
                            : toDoshoppingItems?.length === 0 ? (<div><h3>No shopping Items to Display, Please create some </h3></div>)
                                : toDoshoppingItems?.map(shoppingItem => (<ShoppingItemCard
                                    shoppingItem={shoppingItem}
                                    key={shoppingItem?._id}
                                    setIsEdit={setIsEdit}
                                    setShowModal={setShowModal}
                                    setCurrentItem={setCurrentItem}
                                    setShowDeleteModal={setShowDeleteModal}
                                    showCart={showCart}
                                    type={ItemTypes.SHOPPING}
                                />))}

                </div>}
                {showCart && <ItemsAddedToCart>
                    <strong>Cart</strong>
                    {shoppingItemAppErr || shoppingItemServerErr ? (<div className="form-validation">An Error Has Occured</div>)
                        : shoppingItemLoading ? <h4>Loading Please Wait......</h4>
                            : doneshoppingItems?.map(shoppingItem => (<ShoppingItemCard
                                shoppingItem={shoppingItem}
                                key={shoppingItem?._id}
                                setIsEdit={setIsEdit}
                                setShowModal={setShowModal}
                                setCurrentItem={setCurrentItem}
                                setShowDeleteModal={setShowDeleteModal}
                                type={ItemTypes.ADDEDTOCARD}
                            />))}

                </ItemsAddedToCart>}
            </div>
            {showModal && <CreateShoppingItem setShowModal={setShowModal} isEdit={isEdit} shoppingItem={currentItem} setIsEdit={setIsEdit} />}
            {showDeleteModal && <DeleteDialogBox setShowDeleteModal={setShowDeleteModal} shoppingItem={currentItem} item="Item" />}
        </div>

    )
}
