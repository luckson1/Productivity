import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { MdCancel } from 'react-icons/md'
import { createShoppingItemAction, editShoppingItem } from '../../redux/shoppingItemSlices';

const errorSchema = Yup.object().shape({

    name: Yup
        .string()
        .required('Item name Required'),
    price: Yup
        .number(),
    units: Yup
        .number()


});
function CreateShoppingItem({ setShowModal, setIsEdit, isEdit, shoppingItem }) {
    const dispatch = useDispatch()
    // use formik hook to handle form state 
    const formik = useFormik({
        initialValues: {

            name: isEdit ? shoppingItem?.name : '',
            units: isEdit ? shoppingItem?.units : 1,
            price: isEdit ? shoppingItem?.price : 0,
            id: isEdit ? shoppingItem?._id : null

        },
        validationSchema: errorSchema,
        onSubmit: isEdit ? values => { dispatch(editShoppingItem(values)); window.location.reload() }
            : values => {

                dispatch(createShoppingItemAction(values)); window.location.reload()
            }
    });


    return (
        <div className="modal">
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

                    <span className="form-row">
                        <label className="form-row-label" htmlFor="item-units">Price</label>
                        <input className="form-row-input"
                            type="number"
                            id="item-price"
                            value={formik.values.price}
                            onChange={formik.handleChange("price")}
                            onBlur={formik.handleBlur("price")}
                        />
                    </span>
                    <span className="form-row-buttons">
                        <button id="save-button" type="submit">Save</button>

                    </span>
                </div>
            </form>
        </div>
    )
}

export default CreateShoppingItem