import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskAction, editTasksAction, fetchTasksAction } from '../../redux/taskSlices';
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
function CreateTask({ task }) {
    const { currentColor, setShowModal, setIsEdit, isEdit, tasks, setTasks } = useStateContext()
    const dispatch = useDispatch()


    const addTaskHandler = (values) => {
        dispatch(createTaskAction(values))
        setTasks([...tasks, values]);
        setShowModal(false);

    }
    const upDatedTask=useSelector(state=> state?.tasks?.tasksFetched?.tasks)
    console.log(upDatedTask)
    const editTaskHandler = (values) => {

        dispatch(editTasksAction(values));
        const newTasks = tasks?.filter(item => {
            return item._id !== task?._id
        })

        setTasks([...newTasks,  values]);
       
        setShowModal(false);
        dispatch(fetchTasksAction())

    }
    // use formik hook to handle form state 
    const formik = useFormik({
        initialValues: {

            title: isEdit ? task?.title : '',
            summary: isEdit ? task?.summary : '',
            status: isEdit ? task?.status : 'To Do',
            taskId: isEdit ? task?.taskId : uuidv4(),
            _id: task?._id

        },
        validationSchema: errorSchema,
        onSubmit: isEdit ? values => {editTaskHandler(values);console.log(values)}
            : values => { addTaskHandler(values) }
    });


    return (
        <div className="modal" style={{ backgroundColor: currentColor }}>
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