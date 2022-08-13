import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useDispatch} from 'react-redux';
import { createTaskAction, editTasksAction} from '../../redux/taskSlices';
import { MdCancel } from 'react-icons/md'
import { useStateContext } from '../../context/ContextProvider';
import { v4 as uuidv4 } from "uuid";

const errorSchema = Yup.object().shape({

    title: Yup
        .string()
        .required('Title Required'),
    summary: Yup
        .string()
        .required('Summary Information Required'),
    status: Yup
        .string()


});
function CreateTask() {
    const { setShowModal, setIsEdit, isEdit, tasks, setTasks, currentEntry} = useStateContext()
const entry=currentEntry
    const dispatch = useDispatch()


    const addTaskHandler = (values) => {
        dispatch(createTaskAction(values))

        let newTask= []
        newTask.push(values)
        setTasks( [...tasks, ...newTask]);       
        setShowModal(false);

    }
  
    const editTaskHandler = (values) => {

        dispatch(editTasksAction(values));
        const newtasks = tasks?.filter(task => {
            return entry._id !== task?._id
        })

        setTasks([...newtasks, values]);
        setShowModal(false);

    }

    // use formik hook to handle form state 
    const formik = useFormik({
        initialValues: {

            title: isEdit ? entry?.title : '',
            summary: isEdit ? entry?.summary : '',
            status: isEdit ? entry?.status : 'To Do',
            taskId: isEdit ? entry?.taskId : uuidv4(),
            _id: entry?._id,
            createdAt: isEdit ? entry?.createdAt : new Date()

        },
        validationSchema: errorSchema,
        onSubmit: isEdit ? values => {editTaskHandler(values)}
            : values => { addTaskHandler(values) }
    });


    return (
        <div className="modal  bg-slate-200" >
            <MdCancel className='close-icon' color='red' onClick={() => {
                setIsEdit(false);
                setShowModal(false)
            }} />
            <form onSubmit={formik.handleSubmit}>
                <div className="create-new-task-block" id="create-new-task-block">
                    <strong>Task</strong>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="task-name">Task Title</label>
                        <input className="form-row-input"
                            type="text"
                            id="task-name"
                            value={formik.values.title}
                            onChange={formik.handleChange("title")}
                            onBlur={formik.handleBlur("title")}
                            placeholder='Tittle of the Task' />

                    </span>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.summary && formik.errors.summary}
                    </div>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="task-name">Summary</label>
                        <textarea className="form-row-input"
                            id="task-summary"
                            cols="50" rows="6"
                            value={formik.values.summary}
                            onChange={formik.handleChange("summary")}
                            onBlur={formik.handleBlur("summary")}
                            placeholder='Describe the Task......'></textarea>
                    </span>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.status && formik.errors.status}
                    </div>
                    {isEdit && <span className="form-row">
                        <label className="form-row-label" htmlFor="task-name">Status</label>


                        <div className='multiple-input-container'>

                            <input
                                id='do'
                                value={undefined}
                                onChange={() => { formik.setFieldValue('status', "To Do") }}
                                onBlur={formik.handleBlur("status")}
                                type="radio"
                                checked={formik.values.status === "To Do"}

                            />
                            <label htmlFor="do">To Do</label>

                            <input
                                id='progress'
                                value={undefined}
                                onChange={() => { formik.setFieldValue('status', "In Progress") }}
                                onBlur={formik.handleBlur("status")}
                                type="radio"
                                checked={formik.values.status === "In Progress"}

                            />
                            <label htmlFor="progress">In Progress</label>


                            <input
                                id='Done'
                                value={undefined}
                                onChange={() => { formik.setFieldValue('status', "Done") }}
                                onBlur={formik.handleBlur("status")}
                                type="radio"
                                checked={formik.values.status === "Done"}

                            />
                            <label htmlFor="Done">Done</label>



                        </div>
                    </span>}
                    <span className="form-row-buttons">
                        <button id="save-button" type="submit">Save</button>

                    </span>
                </div>
            </form>
        </div>
    )
}

export default CreateTask