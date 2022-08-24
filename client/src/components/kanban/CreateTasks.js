import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createTaskAction} from '../../redux/taskSlices';
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
    const {   tasks, setTasks } = useStateContext()

    const dispatch = useDispatch()


    const addTaskHandler = (values) => {
        dispatch(createTaskAction(values))
        setTasks([values, ...tasks])
       
    }
    // use formik hook to handle form state 
    const formik = useFormik({
        initialValues: {

            title:  '',      
            taskId:  uuidv4(),
            status: "To Do",           
            createdAt: new Date(),
            

        },
        validationSchema: errorSchema,
        onSubmit: (values, {resetForm} )=> { addTaskHandler(values); resetForm({values: ""})}
    });


    return (
       
                <form onSubmit={formik.handleSubmit} className=" dark:bg-[#484B52] flex flex-row px-0 ">
                    
                       
                        <span className="form-row">                            
                            <input className="form-row-input px-3"
                                type="text"
                                id="task-name"
                                value={formik.values.title}
                                onChange={formik.handleChange("title")}
                                onBlur={formik.handleBlur("title")}
                                placeholder='Tittle of the Task' />
                        </span>
                        
                        <span className="form-row-buttons">
                        <button type="submit" className='py-2 px-5 bg-gradient-to-r from-indigo-400 to-blue-100 rounded-md '> Add </button>                   

                    </span>
                          {/* errors */}
                          <div className="form-validation">
                            {formik.touched.title && formik.errors.title}
                        </div>
               
                </form>
         
    )
}

export default CreateTasks