import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { MdCancel } from 'react-icons/md'
import { createShoppingItemAction, editShoppingItem, fetchAllShoppingsItem } from '../../redux/shoppingItemSlices';
import { useStateContext } from '../../context/ContextProvider';
const { v4: uuidv4 } = require('uuid')

const errorSchema = Yup.object().shape({

    name: Yup
        .string()
        .required('Item name Required'),
    price: Yup
        .number(),
    units: Yup
        .number()


});
function CreateShoppingItem({shoppingItem }) {
    const { currentColor, setShoppingItems, setShowModal,setIsEdit, isEdit,  shoppingItems, setShoppingStats, shoppingStats, showCart, setShowCart} = useStateContext()
    const dispatch = useDispatch()


    const addShoppingItemHandler = (values) => {
        dispatch(createShoppingItemAction(values))
        setShoppingItems([...shoppingItems, values]);
        setShowCart(false);
        setShowModal(false);
     
    }
const editShoppingItemHandler = values => {
    dispatch(editShoppingItem(values));
    dispatch(fetchAllShoppingsItem())
    const newShoppingList=shoppingItems.filter(listItem=> listItem._id !==shoppingItem?._id);
    setShoppingItems([...newShoppingList, values]);
    setShowModal(false);
    setIsEdit(false);
}


    // use formik hook to handle form state 
    const formik = useFormik({
        initialValues: {

            name: isEdit ? shoppingItem?.name : '',
            units: isEdit ? shoppingItem?.units : 1,
            price: isEdit ? shoppingItem?.price : 0,
            status: isEdit ? shoppingItem?.status : "On Shopping List",

            _id: isEdit ? shoppingItem?._id : uuidv4()

        },
        validationSchema: errorSchema,
        onSubmit: isEdit ? values => editShoppingItemHandler(values)
       
            : values => addShoppingItemHandler(values)

    });


    return (
        <div className="modal" style={{ backgroundColor: currentColor }}>
            <MdCancel className='close-icon' color='red' onClick={() => {
                setIsEdit(false);
                setShowModal(false)
            }} />
            <form onSubmit={formik.handleSubmit}>
                <div className="create-new-task-block" id="create-new-task-block">
                    <strong>Item</strong>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.name && formik.errors.name}
                    </div>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="item-name">Name</label>
                        <input className="form-row-input"
                            type="text"
                            id="item-name"
                            value={formik.values.name}
                            onChange={formik.handleChange("name")}
                            onBlur={formik.handleBlur("name")}
                            placeholder='Name of the Shopping Item' />

                    </span>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="item-units">units</label>
                        <input className="form-row-input"
                            type="number"
                            id="item-units"
                            value={formik.values.units}
                            onChange={formik.handleChange("units")}
                            onBlur={formik.handleBlur("units")}
                        />
                    </span>

                    {isEdit && <span className="form-row">
                        <label className="form-row-label" htmlFor="item-units">Price</label>
                        <input className="form-row-input"
                            type="number"
                            id="item-price"
                            value={formik.values.price}
                            onChange={formik.handleChange("price")}
                            onBlur={formik.handleBlur("price")}
                        />
                    </span>}
                {!showCart && <span className="form-row">
                       <label className="form-row-label" htmlFor="task-name">Add to Cart?</label>
                <div className='multiple-input-container py-3 pt-5'>

                    <input
                        id='no'
                        value={undefined}
                        onChange={() => { formik.setFieldValue('status', "On Shopping List") }}
                        onBlur={formik.handleBlur("status")}
                        type="radio"
                        checked={formik.values.status === "On Shopping List"}

                    />
                    <label htmlFor="no">No</label>

                    <input
                        id='yes'
                        value={undefined}
                        onChange={() => { formik.setFieldValue('status', "Added to Cart") }}
                        onBlur={formik.handleBlur("status")}
                        type="radio"
                        checked={formik.values.status === "Added to Cart"}

                    />
                    <label htmlFor="yes">Yes</label>

                </div>
                </span>}
                    <span className="flex justify-center ">
                        <button className='bg-green-400 py-2 px-10 m-2 rounded-lg' type="submit">Save</button>
                     

                    </span>
                </div>
            </form>
        </div>
    )
}

export default CreateShoppingItem