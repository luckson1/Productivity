import { useFormik } from "formik"
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
// import { loginUserAction, registerUserAction } from '../redux/usersSlices';
import DisabledButton from "../DisabledButton";
import { useState } from "react";
import { useStateContext } from "../../context/ContextProvider";

// use yup to handle errors 
const SignInErrorSchema = Yup.object().shape({

    email: Yup.string().email('Invalid email').required('Email Required'),
    password: Yup.string()
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
            , 'password must contain 6 or more characters with at least one of each: uppercase, lowercase, number and special character')
        .required('Password Required'),

});


const LoginErrorSchema = Yup.object().shape({

    email: Yup.string()
        .email('Invalid email')
        .required('Email Required'),
    password: Yup.string()
        .required('Password Required'),

});

export const Authmodal = () => {
    const{ reveal, setReveal,setShowModal,  isSignUp, setIsSignUp  }= useStateContext()
    // dispatch
    // const dispatch = useDispatch()

    // get data from store

    // const user = useSelector((state) => {
    //     return state?.users
    // })
    // const { userLoading, userServerErr, userAppErr } = user;
    // use formik hook to handle form state 
    const formik = useFormik({
        initialValues: {

            email: '',
            password: '',


        },

        validationSchema: isSignUp ? SignInErrorSchema : LoginErrorSchema,
        onSubmit: values => {
            console.log(values)
            // isSignUp ? dispatch(registerUserAction(values)) : dispatch(loginUserAction(values))
        },
    })

    return (<div className='auth-modal text-gray-900 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300'>
        <div onClick={() => { setShowModal(false); setIsSignUp(true) }} className="close-icon"><h4>X</h4></div>
        <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
        {isSignUp && <p className="text-left"> By clicking Sign Up you are in agreement with our terms. Learn more from our Privacy Policy Page</p>}
        {/* Errors */}
        {/* {userAppErr || userServerErr ? (
            <div className="form-validation" role="alert">
                {userServerErr} {userAppErr}
            </div>
        ) : null} */}
        <form onSubmit={formik.handleSubmit} >


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
                type={reveal ? "text" : "password"}
                placeholder="Password"z
            />
            <div className="toggle-icon"><i className={reveal ? "bi bi-eye-slash " : "bi bi-eye "} id="togglePassword" onClick={() => setReveal(!reveal)}></i></div>
            {/* Err */}
            <div className="form-validation">
                {formik.touched.password && formik.errors.password}
            </div>
            {
            // userLoading ? <DisabledButton /> : 
            <button
                type="submit"
                className="secondary-button"
            >
                {isSignUp ? "Sign Up" : "Login"}
            </button>}
        </form>

    </div>);
};
