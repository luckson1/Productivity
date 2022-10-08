import { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import { loginUserAction, registerUserAction } from '../redux/usersSlices';

import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import DisabledButton from "../DisabledButton";
import {
  isShowSignUpModal,
  isShowSignUpModalReset,
  loginUserAction,
  registerUserAction,
  isShowModalReset,
} from "../../redux/usersSlices";

// use yup to handle errors
const SignInErrorSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "password must contain 6 or more characters with at least one of each: uppercase, lowercase, number and special character"
    )
    .required("Password Required"),
});

const LoginErrorSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string().required("Password Required"),
});

export const Authmodal = () => {
  const [revealPassword, setRevealPassword] = useState(false);
  // dispatch
  const dispatch = useDispatch();

  // get data from store

  const user = useSelector((state) => {
    return state?.users;
  });
  const { userLoading, userServerErr, userAppErr, isSignUp } = user;
  // use formik hook to handle form state
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: isSignUp ? SignInErrorSchema : LoginErrorSchema,

    onSubmit: isSignUp
      ? (values) => {
          dispatch(registerUserAction(values));
        }
      : (values) => {
          dispatch(loginUserAction(values));
        },
  });

  const handleHideForm= useCallback(() => {
    dispatch(isShowModalReset());
    dispatch(isShowSignUpModal());
    setRevealPassword(false);
  }, [dispatch])

  return (
    <div className="auth-modal text-gray-900 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 z-20">
      <div
        onClick={handleHideForm}
        className="close-icon"
      >
        <MdCancel color="red" />
      </div>
      <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
      {
        <>
          <p className="text-left"> Guest login: </p>
          <p className="text-left"> email: guest@gmail.com </p>
          <p className="text-left"> password: Greetings@2022</p>
        </>
      }
      {/* Errors */}
      {userAppErr || userServerErr ? (
        <div className="form-validation" role="alert">
          {userServerErr} {userAppErr}
        </div>
      ) : null}
      <form onSubmit={formik.handleSubmit} className="mt-4">
        <input
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          type="email"
          placeholder="E-mail address"
        />
        {/* Err */}
        <div className="form-validation">
          {formik.touched.email && formik.errors.email}
        </div>
        <input
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          type={revealPassword ? "text" : "password"}
          placeholder="Password"
        />
        <div
          className="toggle-icon"
          role="button"
          onClick={() => setRevealPassword(!revealPassword)}
        >
          {revealPassword ? <FiEyeOff /> : <FiEye />}{" "}
        </div>
        {/* Err */}
        <div className="form-validation">
          {formik.touched.password && formik.errors.password}
        </div>

        {userLoading ? (
          <DisabledButton />
        ) : (
          <button type="submit" className="secondary-button">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        )}
        {!isSignUp && (
          <p className="text-left">
            {" "}
            Dont have an account?{" "}
            <Link
              to="/"
              type="button"
              className="text-blue-500"
              onClick={() => dispatch(isShowSignUpModal())}
            >
              Sign Up
            </Link>
          </p>
        )}
        {isSignUp && (
          <p className="text-left">
            {" "}
            Already have an account?{" "}
            <Link
              to="/"
              type="button"
              className="text-blue-500"
              onClick={() => dispatch(isShowSignUpModalReset())}
            >
              Login
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};
