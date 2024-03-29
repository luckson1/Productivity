import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  isEditModeReset,
  isShowModalReset,
  Task,
} from "../../redux/taskSlices";
import { MdCancel } from "react-icons/md";
import { useStateContext } from "../../context/ContextProvider";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { appDispatch } from "../../redux/Hooks";
import { useGetTeamQuery } from "../../redux/usersApiSlices";
import { userData } from "../../redux/usersSlices";
import { useUpdateTaskMutation } from "../../redux/tasksApiSlices";
const errorSchema = Yup.object().shape({
  title: Yup.string().required("Title Required"),
  summary: Yup.string(),
  status: Yup.string(),
});
function EditTasks({selectedTask}) {

  const entry = selectedTask;
  const dispatch=appDispatch()
   //fetch team
 const {
  data: teamData
}=useGetTeamQuery(undefined)
const team=teamData? Object.values(teamData)[0] as Array<userData>: null

// mutation 
const [updateBug]=useUpdateTaskMutation()
  const editTaskHandler = (values: Task) => {
    updateBug(values)
    dispatch(isShowModalReset());
  };
  // control state of data input
  const [startDate, setStartDate] = useState(
    new Date(entry?.start ?? new Date())
  );
  const [endDate, setEndDate] = useState(new Date(entry?.end ?? new Date()));
  // use formik hook to handle form state
  const formik = useFormik({
    initialValues: {
      title: entry?.title,
      summary: entry?.summary,
      status: entry?.status,
      taskId: entry?.taskId ?? uuidv4(),
      _id: entry?._id,
      start: entry?.start ?? undefined,
      end: entry?.end ?? undefined,
      assigned: entry?.assigned,
      user:  entry?.user
    },
    validationSchema: errorSchema,
    onSubmit: (values: Task) => {
      editTaskHandler(values);
    },
  });

  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0 z-50">
      <div className="float-right h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100  dark:bg-[#484B52] w-full sm:w-6/12 ">
        <div className="px-7 pt-5">
          <div className="flex flex-row justify-between my-5">
            <p className="text-xl font-semibold text-gray-900 text-center ">
              Edit Task
            </p>
            <MdCancel
              size="30px"
              color="red"
              onClick={() => {
                dispatch(isEditModeReset());
                dispatch(isShowModalReset());
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
          <form onSubmit={formik.handleSubmit} className=" ">
            {/* errors */}
               {/* errors */}
          <div className="form-validation">
            {formik.touched.title && formik.errors.title}
          </div>
            <span className="form-row">
              <label className="form-row-label" htmlFor="title">
                Task Title
              </label>
              <input
                className="form-row-input"
                type="text"
                id="title"
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                placeholder="Tittle of the Task"
              />
            </span>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.summary && formik.errors.summary}
            </div>

            <span className="form-row">
              <label className="form-row-label" htmlFor="summary">
                Summary
              </label>
              <textarea
                className="form-row-input"
                id="summary"
           
                value={formik.values.summary}
                onChange={formik.handleChange("summary")}
                onBlur={formik.handleBlur("summary")}
                placeholder="Describe the Task......"
              ></textarea>
            </span>

            <span className="form-row">
              <label className="form-row-label" htmlFor="task-name">
                Status
              </label>

              <div className="multiple-input-container">
                <input
                  id="do"
                  value={undefined}
                  onChange={() => {
                    formik.setFieldValue("status", "To Do");
                  }}
                  onBlur={formik.handleBlur("status")}
                  type="radio"
                  checked={formik.values.status === "To Do"}
                />
                <label htmlFor="do">To Do</label>

                <input
                  id="progress"
                  value={undefined}
                  onChange={() => {
                    formik.setFieldValue("status", "In Progress");
                  }}
                  onBlur={formik.handleBlur("status")}
                  type="radio"
                  checked={formik.values.status === "In Progress"}
                />
                <label htmlFor="progress">In Progress</label>

                <input
                  id="Done"
                  value={undefined}
                  onChange={() => {
                    formik.setFieldValue("status", "Done");
                  }}
                  onBlur={formik.handleBlur("status")}
                  type="radio"
                  checked={formik.values.status === "Done"}
                />
                <label htmlFor="Done">Done</label>

                <input
                  id="Complete"
                  value={undefined}
                  onChange={() => {
                    formik.setFieldValue("status", "Complete");
                  }}
                  onBlur={formik.handleBlur("status")}
                  type="radio"
                  checked={formik.values.status === "Complete"}
                />
                <label htmlFor="Complete">Complete</label>
              </div>
            </span>

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

            <span className="form-row">
              <label className="form-row-label" htmlFor="assigned">
                Assigned
              </label>
              <select
                className="form-row-input"
                id="assigned"
                name="assigned"
                placeholder=""
                onBlur={formik.handleBlur("assigned")}
                onChange={formik.handleChange("assigned")}
                value={formik.values.assigned}
              >
                <option value="">Assign a team mate</option>
                {team?.map((member) => (
                  <option
                    key={member?.userId}
                    onBlur={formik.handleBlur("assigned")}
                    value={member?._id}
                  >
                    {member?.firstName ?? member?.email}
                  </option>
                ))}
              </select>
            </span>
            <span className="form-row-buttons">
              <label className="form-row-label" htmlFor="button"></label>
              <button
                type="submit"
                className="form-row-input bg-gradient-to-r from-blue-300 to-white rounded-lg"
              >
                Save Task
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTasks;
