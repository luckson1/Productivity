import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { MdCancel } from "react-icons/md";
import { useStateContext } from "../../context/ContextProvider";
import { useDispatch } from "react-redux";
import { createUserAction, isShowModalReset } from "../../redux/usersSlices";

const errorSchema = Yup.object().shape({
  firstName: Yup.string().required("Name is Required"),
  email: Yup.string().email().required("Email is Required"),
  role: Yup.string().required("Role is Required"),
});

function InviteUser() {
  const { currentColor, team, setTeam } = useStateContext();

  const dispatch = useDispatch();

  const addMemberHandler = (values) => {
    dispatch(createUserAction(values));
    dispatch(isShowModalReset());
    setTeam([values, ...team])
  };
  // use formik hook to handle form state
  const formik = useFormik({
    initialValues: {
      firstName: "",
      role: "",
      email: "",
      status: "pending",
      userId: uuidv4(),
    },
    validationSchema: errorSchema,
    onSubmit: (values) => addMemberHandler(values),
  });

  return (
    <div className="modal bg-white h-96 w-96 shadow-2xl">
      <div className="flex flex-row justify-between mx-5 mt-5">
        <strong>Create new Member</strong>
        <MdCancel
          size="30px"
          color="red"
          onClick={() => {
            dispatch(isShowModalReset());
          }}
          style={{ cursor: "poiter" }}
        />
      </div>
      <form onSubmit={formik.handleSubmit} className=" mx-5 my-5">
        {/* errors */}
        <div className="form-validation">
          {formik.touched.name && formik.errors.name}
        </div>
        <span className="form-row">
          <label className="form-row-label" htmlFor="firstName">
            Name
          </label>
          <input
            className="form-row-input border-b-2 border-b-indigo-500 rounded-none"
            type="text"
            id="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange("firstName")}
            onBlur={formik.handleBlur("firstName")}
            placeholder="Name of the invitee"
          />
        </span>
        {/* errors */}
        <div className="form-validation">
          {formik.touched.email && formik.errors.email}
        </div>
        <span className="form-row">
          <label className="form-row-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-row-input border-b-2 border-b-indigo-500 rounded-none"
            type="text"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            placeholder="Email of the invitee"
          />
        </span>
        {/* errors */}
        <div className="form-validation">
          {formik.touched.role && formik.errors.role}
        </div>
        <span className="form-row">
          <label className="form-row-label" htmlFor="role">
            Role
          </label>
          <input
            className="form-row-input border-b-2 border-b-indigo-500 rounded-none"
            type="text"
            id="role"
            value={formik.values.role}
            onChange={formik.handleChange("role")}
            onBlur={formik.handleBlur("role")}
            placeholder="Role of the invitee"
          />
        </span>
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
  );
}

export default InviteUser;
