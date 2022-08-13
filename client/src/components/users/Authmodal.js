import { useFormik } from "formik"
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
// import { loginUserAction, registerUserAction } from '../redux/usersSlices';
import DisabledButton from "../DisabledButton";
import { useStateContext } from "../../context/ContextProvider";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAction, registerUserAction } from "../../redux/usersSlices";
import { useEffect } from "react";

// use yup to handle errors 
const SignInErrorSchema = Yup.object().shape({

    email: Yup.string()
        .email('Invalid email')
        .required('Email Required'),
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
    const { reveal, setReveal, setShowModal, isSignUp, setIsSignUp, setActiveMenu, setShowNavBar } = useStateContext()
    // dispatch
    const dispatch = useDispatch()

    // get data from store

    const user = useSelector((state) => {
        return state?.users
    })
    const { userLoading, userServerErr, userAppErr, isRegistered, isLoggedIn } = user;
    // use formik hook to handle form state 
    const formik = useFormik({
        initialValues: {

            email: '',
            password: '',


        },

        validationSchema: isSignUp ? SignInErrorSchema : LoginErrorSchema,
        onSubmit: values => {

            isSignUp ? dispatch(registerUserAction(values)) : dispatch(loginUserAction(values))
        },
    })


    // force navigation once an action is performed
    const navigate = useNavigate();
    useEffect(() => {
        if (isRegistered) {
            navigate('/onboarding');

            setTimeout(() => {
                window.location.reload();
            }, 100)

        }
    }, [isRegistered, navigate])

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard');
            setActiveMenu(true);
            setShowNavBar(true)
            setTimeout(() => {
                window.location.reload();
            }, 100)
        }
    }, [isLoggedIn, navigate, setActiveMenu, setShowNavBar])

    return (<div className='auth-modal text-gray-900 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 z-20'>
        <div onClick={() => { setShowModal(false); setIsSignUp(true); setReveal(false) }} className="close-icon"><MdCancel color="red" /></div>
        <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
        {<>
            <p className="text-left"> Guest login: </p>
            <p className="text-left">  email: guest@gmail.com </p>
            <p className="text-left">  password: Greetings@2022</p>
        </>}
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
                type={reveal ? "text" : "password"}
                placeholder="Password" z
            />
            <div className="toggle-icon" role="button" onClick={() => setReveal(!reveal)}>{reveal ? <FiEyeOff /> : <FiEye />}  </div>
            {/* Err */}
            <div className="form-validation">
                {formik.touched.password && formik.errors.password}
            </div>

            {
                userLoading ? <DisabledButton /> :
                    <button
                        type="submit"
                        className="secondary-button"
                    >
                        {isSignUp ? "Sign Up" : "Login"}
                    </button>}
            {!isSignUp && <p className="text-left"> Dont have an account? <Link to="/" type="button" className="text-blue-500" onClick={() => setIsSignUp(true)}>Sign Up</Link></p>}
            {isSignUp && <p className="text-left"> Already have an account? <Link to="/" type="button" className="text-blue-500" onClick={() => setIsSignUp(false)}>Login</Link></p>}
        </form>

    </div>);
};
