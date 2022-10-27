import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import { MdCancel } from "react-icons/md";
import { TasksData } from "../../redux/taskSlices";
import { useStateContext } from "../../context/ContextProvider";
import { useCreatetaskMutation } from "../../redux/tasksApiSlices";
const errorSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  summary: Yup.string(),
  status: Yup.string(),
});
function CreateTasks({ setShowTaskInput }) {
  const {  currentColor } = useStateContext();
  const [createTask]=useCreatetaskMutation()
  const addTaskHandler = (values: TasksData) => {
   createTask(values)
    setShowTaskInput(false);
  };
  // use formik hook to handle form state
  const formik = useFormik({
    initialValues: {
      title: "" ,
      start: undefined,
      end: undefined,
      taskId: uuidv4(),
      status: "To Do",
    },
    validationSchema: errorSchema,
    onSubmit: (values: TasksData, { resetForm }) => {
      addTaskHandler(values);
      resetForm({ values: undefined });
    },
  });
  // control state of data input
  const [startDate, setStartDate] = useState(new Date(new Date()));
  const [endDate, setEndDate] = useState(new Date(new Date()));
  return (
    <div className="fixed-modal bg-half-transparent">
      <div className="modal bg-white h-80 w-11/12 md:w-4/12 shadow-2xl mt-12">
        <div className="flex flex-row justify-between mx-5 mt-5 cursor-pointer">
          <strong>Create new Task</strong>
          <MdCancel
            size="30px"
            color="red"
            onClick={() => {
              setShowTaskInput(false);
            }}
          />
        </div>
        <form onSubmit={formik.handleSubmit} className=" mx-5 my-5">
          {/* errors */}
          <div className="form-validation">
            {formik.touched.title && formik.errors.title}
          </div>
          <span className="form-row">
            <label className="form-row-label" htmlFor="title">
              Title
            </label>
            <input
              className="form-row-input border-b-2 border-b-indigo-500 rounded-none"
              type="text"
              id="title"
              value={formik.values.title}
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              placeholder="Title of the task"
            />
          </span>
          <div className="flex flex-row mt-5">
            <span className="form-row">
              <label className="form-row-label" htmlFor="startDate">
                Start Date
              </label>
              <DatePicker
                className="w-11/12 rounded-lg m-auto h-10"
                id="startDate"
                name="startDate"
                placeholder="start-date"
                selected={startDate}
                onChange={(val) => {
                  formik.setFieldValue("start", val);
                  setStartDate(val);
                }}
                minDate={new Date()}
                onBlur={formik.handleBlur("startDate")}
              />
            </span>

            <span className="form-row">
              <label className="form-row-label" htmlFor="endDate">
                End Date
              </label>
              <DatePicker
                className="w-11/12 rounded-lg m-auto h-10"
                name="endDate"
                selected={endDate}
                onChange={(val) => {
                  formik.setFieldValue("end", val);
                  setEndDate(val);
                }}
                minDate={new Date()}
                onBlur={formik.handleBlur("end")}
              />
            
            </span>
          </div>

          <span className="form-row-buttons">
            <label className="form-row-label" htmlFor="Role"></label>
            <button
              className="form-row-input"
              type="submit"
              style={{ background: currentColor }}
            >
              Save
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}

export default CreateTasks;
