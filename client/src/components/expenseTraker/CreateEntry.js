import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
// import { useDispatch } from 'react-redux';
import { MdCancel } from 'react-icons/md'
import { useStateContext } from '../../context/ContextProvider';
import { useDispatch } from 'react-redux';
import { createExpenseAction, hideExpensesAction, updateExpenseAction } from '../../redux/expenseSlices';
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

function CreateEntry({isExpense}) {
    const {setShowModal, isEdit,  currentEntry, incomes, setIncomes,  expenses, setExpenses}=useStateContext()
   const  entry=currentEntry

    const dispatch = useDispatch()

    const addIncomeHandler= (values)=> {
        dispatch(createIncomeAction(values))
        setIncomes([...incomes, values]);
        setShowModal(false);
       
    }
    
    const editIncomeHandler= (values)=> {
     
        dispatch(updateIncomeAction(values));
    const newIncomes= incomes?.filter(income=> {
    return entry._id !==income?._id
    })
    
        setIncomes([...newIncomes, values]);
        setShowModal(false);
       
    }

    const addExpenseHandler= (values)=> {
        dispatch(createExpenseAction(values))
        setExpenses([...expenses, values]);
        setShowModal(false);
       
    }
    
    const editExpenseHandler= (values)=> {
     
        dispatch(updateExpenseAction(values));
    const newExpenses= expenses?.filter(expense=> {
    return entry._id !==expense?._id
    })
   
        setExpenses([...newExpenses, values]);
        setShowModal(false);
       
    }
    // use formik hook to handle form state 
    const formik = useFormik({
        initialValues: {

            title: isEdit ? entry?.title : '',
            description: isEdit ? entry?.description : "",
            amount: isEdit ? entry?.amount : "",
            createdAt: isEdit? entry?.createdAt: new Date(),
            id: isEdit ? entry?._id : null

        },
        validationSchema: errorSchema,
        onSubmit: isExpense && !isEdit ? values => addExpenseHandler(values)
            : isExpense && isEdit ? values =>  editExpenseHandler(values)
            :!isExpense && !isEdit ? values => addIncomeHandler(values)
            :!isExpense && isEdit? values =>editIncomeHandler(values)
            :null
    });


    return (
        <div className="modal bg-slate-200" >
            <MdCancel className='close-icon' color='red' onClick={() => {
                // setIsEdit(false);
                setShowModal(false);
          dispatch(hideExpensesAction())

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