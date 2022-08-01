import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"


import DeleteDialogBox from '../DeleteDialogBox'
import { ItemTypes } from '../../utils/items'
import CreateShoppingItem from './CreateShoppingItem';
import ShoppingItemCard from './ShoppingItemCard';
import ItemsAddedToCart from './ItemAddedToCart';
import { fetchAllShoppingsItem } from '../../redux/shoppingItemSlices'
import { useStateContext } from '../../context/ContextProvider';


export default function ShoppingListComponent() {
    // display or remove action creation/edit form 
   
    const {currentColor, showModal, setShowModal ,showDeleteModal, setShowDeleteModal,isEdit, setIsEdit,currentItem, setCurrentItem,showCart, setShowCart,   setShoppingItems, shoppingItems, setShoppingStats, shoppingStats, } = useStateContext();

    // dispatch action to fetch all itemss
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllShoppingsItem())
    }, [dispatch])


    const shoppingItemsState = useSelector((state) => state?.shoppingItem)
    const { shoppingItemsFetched, shoppingItemLoading, shoppingItemAppErr, shoppingItemServerErr } = shoppingItemsState

    

    useEffect(() => {
     if(shoppingItemsFetched) {
        setShoppingItems(shoppingItemsFetched?.shoppingItems);
        setShoppingStats(shoppingItemsFetched?.shoppingStats)
      
     }
    
    }, [shoppingItemsFetched, setShoppingItems,setShoppingStats ])

    
    const toDoshoppingItems = shoppingItems?.filter(shoppingItem => shoppingItem?.status === "On Shopping List")
    const doneshoppingItems =shoppingItems?.filter(shoppingItem => shoppingItem?.status === "Added to Cart")

    // const toDoshoppingStats = shoppingStats?.filter(shoppingItem => shoppingItem?._id === "On Shopping List")
    const doneshoppingStats = shoppingStats?.filter(shoppingItem => shoppingItem?._id === "Added to Cart")


    return (

        <div className=" w-11/12 my-10 mx-3 text-sm md:text-base md:flex-nowrap">
        
            <div className="content-display-buttons mb-5">
                <button className="list-heading-button" onClick={() => setShowCart(false)}
                    style={{
                        backgroundColor: !showCart ? currentColor : "white",
                        borderStartStartRadius: "10px",
                        borderEndStartRadius: "10px"
                    }}>
                    Items On List
                </button>
                <button className="list-heading-button " onClick={() => setShowCart(true)}
                    style={{
                        backgroundColor: showCart ? currentColor : "white",
                        borderStartEndRadius: "10px",
                        borderEndEndRadius: "10px"
                    }}>
                    Items In Cart
                </button>
            </div>
            <div className="kanban-board" id="shopping-board">
                {!showCart && <div className="kanban-block bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200" id="todo" >
                    <strong>Items On List</strong>
                    <div className="task-button-block">
                        <button id="task-button" onClick={() => {setShowModal(true);setShowCart(true)}}> Add Item</button>

                    </div>
                    {shoppingItemAppErr || shoppingItemServerErr ? (<div className="form-validation">An Error Has Occured</div>)
                        : shoppingItemLoading ? <h4>Loading Please Wait......</h4>
                            : toDoshoppingItems?.length === 0 ? (<div><p>No shopping Items to Display, Please create some </p></div>)
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
                    <strong>Items In Cart</strong>
                    <br />
                    <strong>Shopping Amount :  Ksh.{doneshoppingStats?.[0]?.totalShoppingAmount=== undefined? 0: doneshoppingStats?.[0]?.totalShoppingAmount}</strong>
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
