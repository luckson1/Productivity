import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import DisabledButton from "../components/DisabledButton";
import profile from "../assets/ProfilePic.jpg";
import { useStateContext } from "../context/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProfileAction } from "../redux/usersSlices";

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
  const { setActiveMenu, setShowNavBar } = useStateContext();
  useEffect(() => {
    setActiveMenu(false);
    setShowNavBar(false);
  }, [setActiveMenu, setShowNavBar]);
  // dispatch action of creating a profile

  const dispatch = useDispatch();

  // use formik hook to handle form state
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      image: "",
    },
    validationSchema: errorSchema,
    onSubmit: (values) => {
      dispatch(createProfileAction(values));
    },
  });

  //get state from store
  const user = useSelector((state) => {
    return state?.users;
  });

  const {
    isProfilecreated,
    createProfileLoading,
    createProfileAppErr,
    createProfileServerErr,
    userProfile,
  } = user;

  //user Data
  const userStatus = userProfile?.user?.status;

  // force navagation to the dashboard page

  const navigate = useNavigate();

  useEffect(() => {
    if (userStatus !== "Pending") {
      navigate("/dashboard");
      setActiveMenu(true);
      setShowNavBar(true);
    }
  }, [userStatus, navigate, setActiveMenu, setShowNavBar]);

  useEffect(() => {
    if (isProfilecreated) {
      navigate("/dashboard");
      setActiveMenu(true);
      setShowNavBar(true);
    }
  }, [isProfilecreated, navigate, setActiveMenu, setShowNavBar]);

  return (
    <>
      <div className="onboarding mt-10 ">
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
              id="image"
              value={undefined}
              onChange={(e) =>
                formik.setFieldValue("image", e.currentTarget.files[0])
              }
              onBlur={formik.handleBlur("image")}
              type="file"
              placeholder="Profile Image"
            />

            {createProfileLoading ? (
              <DisabledButton />
            ) : (
              <input type="submit" />
            )}
          </section>
          {createProfileServerErr || createProfileAppErr ? (
            <div className="form-validation" role="alert">
              {createProfileServerErr} {createProfileAppErr}
            </div>
          ) : null}

          <section>
            <img
              alt=""
              src={profile}
              className="rounded-xl sm:h-4/5 sm:w-3/5 mt-10 md:ml-60"
            />
          </section>
        </form>
      </div>
    </>
  );
};
