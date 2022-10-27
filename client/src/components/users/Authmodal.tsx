import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import DisabledButton from "../DisabledButton";
import {
  isShowModal,
  isShowSignUpModal,
  isShowSignUpModalReset,
  isShowModalReset,
  User,
} from "../../redux/usersSlices";
import { appDispatch, getState } from "../../redux/Hooks";
import {
  useLoginMutation,
  useRegisterUserMutation,
} from "../../redux/authApiSlice";
import { AuthState, setCredentials } from "../../redux/authslice";
import { useStateContext } from "../../context/ContextProvider";

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
export interface SerializedError {
  data: {
    msg?: string;
    stack?: string;
  };
  status?: string;
}
const LoginErrorSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string().required("Password Required"),
});

export const Authmodal = () => {
  const { setActiveMenu, setShowNavBar } = useStateContext();
  const [revealPassword, setRevealPassword] = useState(false);
  const dispatch = appDispatch();
  // get data from store

  const user = getState((state) => {
    return state?.auth?.user;
  });
  const {  isSignUp } = getState(state=> state?.users)
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();
  const [
    register,
    {
      isLoading: registerLoading,
      isError: isRegisterError,
      error: registerError,
      isSuccess:isRegisterSuccess
    },
  ] = useRegisterUserMutation();
  const errorDetails = error as SerializedError;
  const errorRegDetails = registerError as SerializedError;

  const handleLogin = async (values) => {
    try {
      const userData: AuthState = await login(values).unwrap();
      // const {token}=userData
      // const {user}=userData
      // localStorage.setItem("userToken", token);
      // localStorage.setItem("user", JSON.stringify(user));
      dispatch(setCredentials(...[userData]));
    
    } catch (error) {}
  };
  const handleRegister = async (values) => {
    try {
      const userData: AuthState = await register(values).unwrap();
      dispatch(setCredentials(...[userData]));
    } catch (error) {}
  };
  // force navigation once an action is performed
  const navigate = useNavigate();
  useEffect(
    () => {
      if (isSuccess) {
        navigate("/dashboard");
        setActiveMenu(true);
        setShowNavBar(true);
        dispatch(isShowModalReset());
      } 
    },
    [isSuccess]
  );
  useEffect(
    () => {
      if (isRegisterSuccess) {
        navigate("/onboarding");
        dispatch(isShowModalReset());
      } 
    },
    [isRegisterSuccess]
  );

  // use formik hook to handle form state
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: isSignUp ? SignInErrorSchema : LoginErrorSchema,

    onSubmit: isSignUp
      ? (values: User) => {
          handleRegister(values);
        }
      : (values) => {
          handleLogin(values);
        },
  });

  const handleHideForm = useCallback(() => {
    dispatch(isShowModalReset());
    dispatch(isShowSignUpModal());
    setRevealPassword(false);
  }, [dispatch]);

  return (
    <div className="auth-modal text-gray-900 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 z-20">
      <div onClick={handleHideForm} className="close-icon">
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
      {isError || isRegisterError ? (
        <div className="form-validation" role="alert">
          {errorDetails?.data?.msg ?? errorRegDetails?.data?.msg}
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

        {isLoading || registerLoading ? (
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
