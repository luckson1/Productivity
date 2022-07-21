import { useFormik } from "formik"
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
// import { loginUserAction, registerUserAction } from '../redux/usersSlices';
import DisabledButton from "../DisabledButton";
import { useStateContext } from "../../context/ContextProvider";
import { FiEye, FiEyeOff } from "react-icons/fi";

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

    return (<div className='auth-modal text-gray-900 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 z-20'>
        <div onClick={() => { setShowModal(false); setIsSignUp(true);setReveal(false) }} className="close-icon"><h4>X</h4></div>
        <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
        {isSignUp && <p className="text-left"> By clicking Sign Up you are in agreement with our terms. Learn more from our Privacy Policy Page</p>}
        {/* Errors */}
        {/* {userAppErr || userServerErr ? (
            <div className="form-validation" role="alert">
                {userServerErr} {userAppErr}
            </div>
        ) : null} */}
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
                placeholder="Password"z
            />
         <button className="toggle-icon" onClick={() => setReveal(!reveal)}>{reveal ? <FiEyeOff />: <FiEye />}  </button>
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
