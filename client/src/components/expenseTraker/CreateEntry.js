import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
// import { useDispatch } from 'react-redux';
import { MdCancel } from 'react-icons/md'
import { useStateContext } from '../../context/ContextProvider';
import { useDispatch } from 'react-redux';
import { createExpenseAction, updateExpenseAction } from '../../redux/expenseSlices';
import { createIncomeAction, updateIncomeAction } from '../../redux/IncomeSlices';

const errorSchema = Yup.object().shape({

    title: Yup
        .string()
        .required('Title is Required'),
    amount: Yup
        .number()
        .required('Amount is Required'),
    description: Yup
        .string()
        .required('Amount is Required'),


});

function CreateEntry() {
    const {currentColor, setShowModal, isEdit, isExpense, setIsExpense, currentEntry}=useStateContext()
   const  entry=currentEntry
console.log(entry, isEdit, isExpense)
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
        onSubmit: isExpense && !isEdit ? values => { dispatch(createExpenseAction(values)) }
            : isExpense && isEdit ? values => { dispatch(updateExpenseAction(values))}
            :!isExpense && !isEdit ? values => { dispatch(createIncomeAction(values))  }
            :!isExpense && isEdit? values => { dispatch(updateIncomeAction(values)) }
            :null
    });


    return (
        <div className="modal" style={{backgroundColor:currentColor}}>
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
                        <textarea  className="form-row-input"
                 
                         cols="50" rows="6"
                            type="text"
                            id="item-description"
                            value={formik.values.description}
                            onChange={formik.handleChange("description")}
                            onBlur={formik.handleBlur("description")}
                            placeholder='Describe the Budget Item in a few words' 
                        ></textarea>
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