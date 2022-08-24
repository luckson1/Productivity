import React, { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { editTasksAction } from '../../redux/taskSlices';
import { MdCancel } from 'react-icons/md'
import { useStateContext } from '../../context/ContextProvider';
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const errorSchema = Yup.object().shape({

    title: Yup
        .string()
        .required('Title Required'),
    summary: Yup
        .string(),
    status: Yup
        .string()


});
function EditTasks() {
    const { setShowModal, setIsEdit, isEdit, tasks, setTasks, currentEntry } = useStateContext()
    const entry = currentEntry
    const dispatch = useDispatch()


    const editTaskHandler = (values) => {

        dispatch(editTasksAction(values));
        const newtasks = tasks?.filter(task => {
            return entry._id !== task?._id
        })
        let editedTask = []
        editedTask.push(values)
        setTasks([...newtasks, ...editedTask]);
        setShowModal(false);

    }
    // control state of data input 
    const [startDate, setStartDate] = useState((new Date(entry?.start ?? new Date())))
    const [endDate, setEndDate] = useState((new Date(entry?.end ?? new Date())))
    // use formik hook to handle form state 
    const formik = useFormik({
        initialValues: {

            title: entry?.title,
            summary: entry?.summary,
            status: entry?.status,
            taskId: entry?.taskId ?? uuidv4(),
            _id: entry?._id,
            createdAt: entry?.createdAt,
            updateAt: entry?.updateAt ?? new Date(),
            start: entry?.start ?? "",
            end: entry?.end ?? "",

        },
        validationSchema: errorSchema,
        onSubmit: values => { editTaskHandler(values) }
    });


    return (
        <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
            <div className="float-right h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-50  dark:bg-[#484B52] w-full sm:w-6/12 ">
                <div className="px-7 pt-5" >
                    <MdCancel className='close-icon' color='red' onClick={() => {
                        setIsEdit(false);
                        setShowModal(false);



                    }} style={{ cursor: "pointer" }} />
                    <form onSubmit={formik.handleSubmit} className=" dark:bg-[#484B52]">
                        <strong>Edit Task</strong>
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
                        {isEdit && <span className="form-row">
                            <label className="form-row-label" htmlFor="task-name">Summary</label>
                            <textarea className="form-row-input"
                                id="task-summary"
                                cols="50" rows="6"
                                value={formik.values.summary}
                                onChange={formik.handleChange("summary")}
                                onBlur={formik.handleBlur("summary")}
                                placeholder='Describe the Task......'></textarea>
                        </span>}

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
                        {isEdit && <span className="form-row">
                            <label className="form-row-label" htmlFor="startDate">Start Date</label>
                            <DatePicker
                                className="w-11/12 rounded-lg m-auto h-10"
                                id="startDate"
                                name='startDate'
                                placeholder="start-date"
                                selected={startDate}

                                onChange={val => { formik.setFieldValue('start', val); setStartDate(val) }}
                                minDate={new Date()}
                                onBlur={formik.handleBlur("startDate")} />
                        </span>}





                        {isEdit && <span className="form-row">
                            <label className="form-row-label" htmlFor="endDate">End Date</label>
                            <DatePicker
                                className="w-11/12 rounded-lg m-auto h-10"
                                name='endDate'
                                selected={endDate}
                                onChange={val => { formik.setFieldValue('end', val); setEndDate(val) }}
                                minDate={new Date()}

                                onBlur={formik.handleBlur("end")} />
                        </span>}

                        <span className="form-row-buttons">
                            <label className="form-row-label" htmlFor="button"></label>
                            <button type="submit" className='form-row-input bg-gradient-to-r from-blue-300 to-white rounded-lg'>Save Task</button>

                        </span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTasks