import React, { useCallback } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { MdCancel } from "react-icons/md";
import {
  isEditModeReset,
  isShowModalReset,
  Payload,
} from "../../redux/bugsSlices";
import { appDispatch, getState } from "../../redux/Hooks";
import { useCreateBugMutation, useUpdateBugMutation } from "../../redux/bugsApiSlices";
import { useGetTeamQuery } from "../../redux/usersApiSlices";
import { userData } from "../../redux/usersSlices";

const errorSchema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  steps: Yup.string().required("Steps are Required"),
  description: Yup.string().required("Description is Required"),
  priority: Yup.string().required("priority is Required"),
  assigned: Yup.string(),
});

function CreateBugEntry({selectedBug}) {

  
  const entry = selectedBug;

   //fetch team
 const {
  data: teamData
}=useGetTeamQuery(undefined)
const team=teamData? Object.values(teamData)[0] as Array<userData>: null
  const dispatch = appDispatch();
  const bugsState = getState((state) => state?.bugs);
  const { isEdit } = bugsState;

  const [createBug ] = useCreateBugMutation();
  const [updateBug]=useUpdateBugMutation()
  const addBugHandler = (values) => {
    dispatch(isShowModalReset());
    createBug(values)
  };

  const editbugHandler = (values) => {
    dispatch(isEditModeReset());
updateBug(values)
    dispatch(isShowModalReset());
  };

  // use formik hook to handle form state
  const formik = useFormik({
    initialValues: {
      title: isEdit ? entry?.title : "",
      description: isEdit ? entry?.description : "",
      steps: isEdit ? entry?.steps : "",
      status: isEdit ? entry?.status : "Open",
      priority: isEdit ? entry?.priority : "",
      assigned: isEdit ? entry?.assigned : undefined,
      createdAt: isEdit ? entry?.createdAt : new Date(),
      _id: isEdit ? entry?._id : undefined,
      bugId: isEdit ? entry?.bugId : uuidv4(),
    },
    validationSchema: errorSchema,
    onSubmit: isEdit
      ? (values: Payload) => editbugHandler(values)
      : (values: Payload) => addBugHandler(values),
  });

  const handleHideForm = useCallback(() => {
    dispatch(isEditModeReset());
    dispatch(isShowModalReset());
  }, []);
  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
      <div className="float-right h-screen  bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-50  dark:bg-[#484B52] w-full sm:w-6/12 ">
        <div className="px-7 pt-5">
          <div className="flex flex-row justify-between my-5">
            <p className="text-xl font-semibold text-gray-900 text-center ">
              {isEdit ? "Edit Issue Info" : "Create Issue"}
            </p>
            <MdCancel
              size="30px"
              color="red"
              onClick={handleHideForm}
              style={{ cursor: "pointer" }}
            />
          </div>
          <form onSubmit={formik.handleSubmit}>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.title && formik.errors.title}
            </div>
            <span className="form-row">
              <label className="form-row-label" htmlFor="bug-name">
                Title
              </label>
              <input
                className="form-row-input"
                type="text"
                id="bug-name"
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                placeholder="Title of the Issue"
              />
            </span>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.description && formik.errors.description}
            </div>
            <span className="form-row">
              <label className="form-row-label" htmlFor="bug-description">
                Description
              </label>
              <textarea
                className="form-row-input"
                id="bug-description"
                value={formik.values.description}
                onChange={formik.handleChange("description")}
                onBlur={formik.handleBlur("description")}
                placeholder="Describe the Issue in a few words"
              ></textarea>
            </span>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.steps && formik.errors.steps}
            </div>
            <span className="form-row">
              <label className="form-row-label" htmlFor="bug-description">
                steps
              </label>
              <textarea
                className="form-row-input"
                id="bug-steps"
                placeholder="Describe the process one takes to identify the Bug"
                value={formik.values.steps}
                onChange={formik.handleChange("steps")}
                onBlur={formik.handleBlur("steps")}
              ></textarea>
            </span>
            <div className="form-validation">
              {formik.touched.priority && formik.errors.priority}
            </div>
            <span className="form-row">
              <label className="form-row-label" htmlFor="task-name">
                priority
              </label>

              <div className="multiple-input-container">
                <input
                  id="low"
                  value={undefined}
                  onChange={() => {
                    formik.setFieldValue("priority", "Low");
                  }}
                  onBlur={formik.handleBlur("priority")}
                  type="radio"
                  checked={formik.values.priority === "Low"}
                />
                <label htmlFor="low">Low</label>

                <input
                  id="medium"
                  value={undefined}
                  onChange={() => {
                    formik.setFieldValue("priority", "Medium");
                  }}
                  onBlur={formik.handleBlur("priority")}
                  type="radio"
                  checked={formik.values.priority === "Medium"}
                />
                <label htmlFor="medium">Medium</label>

                <input
                  id="high"
                  value={undefined}
                  onChange={() => {
                    formik.setFieldValue("priority", "High");
                  }}
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
                Save Issue
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBugEntry;
