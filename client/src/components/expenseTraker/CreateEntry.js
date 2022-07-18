import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { MdCancel } from 'react-icons/md'

const errorSchema = Yup.object().shape({

    title: Yup
        .string()
        .required('Title is Required'),
    amount: Yup
        .number()
        .required('Amount is Required'),
    description: Yup
        .number()
        .required('Amount is Required'),


});

function CreateEntry({ setShowModal, setIsEdit, isEdit, entry, isExpense, setIsExpense }) {

    const dispatch = useDispatch()
    // use formik hook to handle form state 
    const formik = useFormik({
        initialValues: {

            title: isEdit ? entry?.title : '',
            description: isEdit ? entry?.description : "",
            amount: isEdit ? entry?.amount : "",
            id: isEdit ? entry?._id : null

        },
        validationSchema: errorSchema,
        onSubmit: isEdit ? values => { console.log(values) }
            : values => {

                console.log(values)
            }
    });


    return (
        <div className="modal">
            <MdCancel className='close-icon' color='red' onClick={() => {
                // setIsEdit(false);
                setShowModal(false);
                setIsExpense(false)

            }} />
            <form onSubmit={formik.handleSubmit}>
                <div className="create-new-task-block" id="create-new-task-block">
                    <strong>{isExpense ? "Expense" : "Income"}</strong>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="item-name">Title</label>
                        <input className="form-row-input"
                            type="text"
                            id="item-name"
                            value={formik.values.title}
                            onChange={formik.handleChange("title")}
                            onBlur={formik.handleBlur("title")}
                            placeholder='Title of the Budget Item' />

                    </span>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.description && formik.errors.description}
                    </div>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="item-description">Description</label>
                        <input className="form-row-input"
                            type="text"
                            id="item-description"
                            value={formik.values.description}
                            onChange={formik.handleChange("description")}
                            onBlur={formik.handleBlur("description")}
                        />
                    </span>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.amount && formik.errors.amount}
                    </div>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="item-description">amount</label>
                        <input className="form-row-input"
                            type="number"
                            id="item-amount"
                            value={formik.values.amount}
                            onChange={formik.handleChange("amount")}
                            onBlur={formik.handleBlur("amount")}
                        />
                    </span>
                    <span className="form-row-buttons">
                        <button id="save-button" type="submit" style={{ background: isExpense ? "red" : "linear-gradient(270deg, green, rgb(163, 245, 163))" }}>Save</button>

                    </span>
                </div>
            </form>
        </div>
    )
}

export default CreateEntry