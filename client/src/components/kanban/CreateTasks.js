import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createTaskAction } from '../../redux/taskSlices';
import { useStateContext } from '../../context/ContextProvider';
import { v4 as uuidv4 } from "uuid";
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
function CreateTasks() {
    const { tasks, setTasks } = useStateContext()

    const dispatch = useDispatch()


    const addTaskHandler = (values) => {
        dispatch(createTaskAction(values))
        setTasks([values, ...tasks])

    }
    // use formik hook to handle form state 
    const formik = useFormik({
        initialValues: {

            title: '',
            taskId: uuidv4(),
            status: "To Do",
            createdAt: new Date(),


        },
        validationSchema: errorSchema,
        onSubmit: (values, { resetForm }) => { addTaskHandler(values); resetForm({ values: "" }) }
    });


    return (<>

        <form onSubmit={formik.handleSubmit} className=" dark:bg-[#484B52] flex flex-row px-0 ">


            <div className="flex flex-row justify-between gap-1" style={{width: "100%"}}>
                <input className=" shadow-2xl rounded-md px-1"
                    type="text"
                    id="name"
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    placeholder='Tittle of the Task'
                    style={{width: "80%"}} />

                <button type="submit" className='py-2 px-1 bg-white text-blue-500 rounded-md shadow-2xl ' style={{width: "20%"}} > Add </button>

            </div>


        </form>
        {/* errors */}
        <div className="form-validation">
            {formik.touched.title && formik.errors.title}
        </div>
    </>

    )
}

export default CreateTasks