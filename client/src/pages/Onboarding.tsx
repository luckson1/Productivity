import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import DisabledButton from "../components/DisabledButton";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { createProfileAction } from "../redux/usersSlices";
import {  appDispatch, getState } from "../redux/Hooks";
import { useCreateProfileMutation } from "../redux/usersApiSlices";
import { SerializedError } from "../components/users/Authmodal";

const errorSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name Too Short!")
    .max(50, "First name Too Long!")
    .required("First name Required"),
  lastName: Yup.string()
    .min(2, "Last name Too Short!")
    .max(50, "Last name Too Long!")
    .required("Last name Required"),
  image: Yup.string().required("Image Required"),
});
export const Onboarding = () => {
  const dispatch=appDispatch()
  const { setActiveMenu, setShowNavBar } = useStateContext();
  useEffect(() => {
    setActiveMenu(false);
    setShowNavBar(false);
  }, [setActiveMenu, setShowNavBar]);
  // dispatch action of creating a profile


  // use formik hook to handle form state
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      image: "",
      email: ""
    },
    validationSchema: errorSchema,
    onSubmit: (values) => {
     createProfile(values)
    },
  });
 const [createProfile, {isLoading, isError, error, isSuccess}]=useCreateProfileMutation()
 const errorDetails= error as SerializedError
  //get state from store


  //user Data
  const userStatus = getState(state=> state?.auth?.user?.status)

  // force navagation to the dashboard page

  const navigate = useNavigate();

  useEffect(() => {
    if (userStatus !== "Pending") {
      navigate("/dashboard");
      setActiveMenu(true);
      setShowNavBar(true);
    }
  }, [userStatus]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
      setActiveMenu(true);
      setShowNavBar(true);
    }
  }, [isSuccess]);

  return (
    <>
      <div className="onboarding mt-10 flex  justify-center m-auto">
        <div className="bg-indigo-200 w-80 md:w-6/12 rounded-md pt-3 md:pt-10">
        <h2>CREATE YOUR PROFILE</h2>
        <form
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
          className="flex-col-reverse md:flex-row"
        >
          <section>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange("firstName")}
              onBlur={formik.handleBlur("firstName")}
              type="text"
              placeholder="First Name"
            />
            {/* Err */}
            <div className="form-validation">
              {formik.touched.firstName && formik.errors.firstName}
            </div>

            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange("lastName")}
              onBlur={formik.handleBlur("lastName")}
              type="text"
              placeholder="Last Name"
            />
            {/* Err */}
            <div className="form-validation">
              {formik.touched.lastName && formik.errors.lastName}
            </div>

            <label htmlFor="image">Profile Picture</label>
            <input
              name="image"
              className="bg-white"
              id="image"
              value={undefined}
              onChange={(e) =>
                formik.setFieldValue("image", e.currentTarget.files![0])
              }
              onBlur={formik.handleBlur("image")}
              type="file"
              placeholder="Profile Image"
            />

            {isLoading ? (
              <DisabledButton />
            ) : (
              <input type="submit" className="bg-white"/>
            )}
          </section>
          {isError? (
            <div className="form-validation" role="alert">
              {errorDetails?.data?.msg}
            </div>
          ) : null}

          
        </form>
        </div>
      </div>
    </>
  );
};
