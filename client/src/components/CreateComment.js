import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../context/ContextProvider";
import { v4 as uuidv4 } from "uuid";
import "react-datepicker/dist/react-datepicker.css";
import { createCommentAction } from "../redux/CommentSlices";
const errorSchema = Yup.object().shape({
  details: Yup.string().required("Comment Required"),
});
function CreateComment({ bugId, taskId, setComments, comments}) {
  const { currentColor } = useStateContext();

  const dispatch = useDispatch();

  const addTaskHandler = (values) => {
    dispatch(createCommentAction(values));
    setComments([values, ...comments])
  };
  const user= useSelector(state=> state.users?.userAuth?.user?._id)
  console.log(user)
  // use formik hook to handle form state
  const formik = useFormik({
    initialValues: {
      details: "",
      commentId: uuidv4(),
      bugId: bugId,
      taskId: taskId,
      creator: user
    },
    validationSchema: errorSchema,
    onSubmit: (values, { resetForm }) => {
      addTaskHandler(values);
      resetForm({ values: "" });
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className=" dark:bg-[#484B52] flex flex-row px-0 "
      >
        <div
          className="flex flex-row justify-between gap-2 border-1 border-slate-50 items-end"
          style={{ width: "100%" }}
        >
          <textarea
            className=" shadow-2xl rounded-md px-1 text-xs bg-white h-24"
            type="text"
            id="name"
            value={formik.values.details}
            onChange={formik.handleChange("details")}
            onBlur={formik.handleBlur("details")}
            placeholder="Add a comment"
            style={{ width: "90%" }}
          ></textarea>

          <button
            type="submit"
            className="  rounded-md shadow-2xl h-10 animate-bounce text-white"
            style={{ backgroundColor: currentColor }}
          >
            Add Comment
          </button>
        </div>
      </form>
      {/* errors */}
      <div className="form-validation">
        {formik.touched.details && formik.errors.details}
      </div>
    </>
  );
}

export default CreateComment;
