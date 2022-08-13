import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
// import { useDispatch } from 'react-redux';
import { MdCancel } from 'react-icons/md'
import { useStateContext } from '../../context/ContextProvider';
import { useDispatch } from 'react-redux';
import { createBugAction, editBugsAction } from '../../redux/bugsSlices';
import { v4 as uuidv4 } from "uuid";

const errorSchema = Yup.object().shape({

    title: Yup
        .string()
        .required('Title is Required'),
    steps: Yup
        .string()
        .required('Steps are Required'),
    description: Yup
        .string()
        .required('Description is Required'),
    priority: Yup
        .string()
        .required('priority is Required'),
    assigned: Yup
        .string()
       
      



});

function CreateBugEntry() {
    const { setShowModal, isEdit, isExpense, currentEntry, bugs, setBugs, setIsEdit} = useStateContext()
    const entry = currentEntry

    const dispatch = useDispatch()

    const addBugHandler = (values) => {
        dispatch(createBugAction(values))
        setBugs(bugs => [...bugs, values]);
        setShowModal(false);

    }

    const editbugHandler = (values) => {

        dispatch(editBugsAction(values));
        const newBugs = bugs?.filter(bug => {
            return entry._id !== bug?._id
        })

        setBugs([...newBugs, values]);
        setShowModal(false);

    }



    // use formik hook to handle form state 
    const formik = useFormik({
        initialValues: {

            title: isEdit ? entry?.title : '',
            description: isEdit ? entry?.description : "",
            steps: isEdit ? entry?.steps : "",
            status: isEdit ? entry?.status : "Open",
            priority: isEdit ? entry?.priority : "",
            assigned: isEdit ? entry?.assigned : undefined,
            createdAt: isEdit ? entry?.createdAt : new Date(),
            _id: isEdit ? entry?._id :  undefined,
            bugId: isEdit ? entry?.bugId  : uuidv4()

        },
        validationSchema: errorSchema,
        onSubmit:isEdit? values=> editbugHandler(values) : values =>  addBugHandler(values)
    });


    return (
        <div className="modal bg-slate-200" >
            <MdCancel className='close-icon' color='red' onClick={() => {
                setIsEdit(false);
                setShowModal(false);
                
               

            }} />
            <form onSubmit={formik.handleSubmit}>
                <div className="create-new-task-block" id="create-new-task-block">
                    <strong>{isEdit? "Edit Bug Info" :"Create Bug"}</strong>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="bug-name">Title</label>
                        <input className="form-row-input"
                            type="text"
                            id="bug-name"
                            value={formik.values.title}
                            onChange={formik.handleChange("title")}
                            onBlur={formik.handleBlur("title")}
                            placeholder='Title of the bug' />

                    </span>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.description && formik.errors.description}
                    </div>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="bug-description">Description</label>
                        <textarea className="form-row-input"

                            cols="50" rows="4"
                            type="text"
                            id="bug-description"
                            value={formik.values.description}
                            onChange={formik.handleChange("description")}
                            onBlur={formik.handleBlur("description")}
                            placeholder='Describe the Bug in a few words'
                        ></textarea>
                    </span>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.steps && formik.errors.steps}
                    </div>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="bug-description">steps</label>
                        <textarea className="form-row-input"
                            type="text"
                            cols="50" rows="4"
                            id="bug-steps"
                            placeholder='Describe the process one takes to identify the Bug'
                            value={formik.values.steps}
                            onChange={formik.handleChange("steps")}
                            onBlur={formik.handleBlur("steps")}
                        ></textarea>
                    </span>
                    <div className="form-validation">
                        {formik.touched.priority && formik.errors.priority}
                    </div>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="task-name">priority</label>


                        <div className='multiple-input-container'>
                            <input
                                id='low'
                                value={undefined}
                                onChange={() => { formik.setFieldValue('priority', "Low") }}
                                onBlur={formik.handleBlur("priority")}
                                type="radio"
                                checked={formik.values.priority === "Low"}

                            />
                            <label htmlFor="low">Low</label>


                            <input
                                id='medium'
                                value={undefined}
                                onChange={() => { formik.setFieldValue('priority', "Medium") }}
                                onBlur={formik.handleBlur("priority")}
                                type="radio"
                                checked={formik.values.priority === "Medium"}

                            />
                            <label htmlFor="medium">Medium</label>


                            <input

                                id='high'
                                value={undefined}
                                onChange={() => { formik.setFieldValue('priority', "High") }}
                                onBlur={formik.handleBlur("priority")}
                                type="radio"
                                checked={formik.values.priority === "High"}

                            />
                            <label htmlFor="high">High</label>

                        </div>

                        <div className="form-validation">
                        {formik.touched.assigned && formik.errors.assigned}
                    </div>
                    </span>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="assigned">Assigned</label>
                        <select
                            className="form-row-input"
                            id="assigned"
                            name="ç"
                            placeholder=''
                            onBlur={formik.handleBlur("assigned")}
                            onChange={formik.handleChange("assigned")}
                            value={formik.values.assigned}

                        >

                            <option value="">Assign a developer</option>
                            <option     onBlur={formik.handleBlur("assigned")}  value="cat">Cat</option>
                            <option     onBlur={formik.handleBlur("assigned")}  value="hamster">Hamster</option>
                            <option     onBlur={formik.handleBlur("assigned")}  value="parrot">Parrot</option>
                            <option     onBlur={formik.handleBlur("assigned")}  value="spider">Spider</option>
                            <option     onBlur={formik.handleBlur("assigned")} value="goldfish">Goldfish</option>
                        </select>
                    </span>
                    <span className="form-row-buttons">
                        <button id="save-button" type="submit" style={{ background: isExpense ? "red" : "linear-gradient(270deg, green, rgb(163, 245, 163))" }}>Save</button>

                    </span>
                </div>
            </form>
        </div>
    )
}

export default CreateBugEntry