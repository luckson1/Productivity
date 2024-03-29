import React from "react"
import * as Yup from 'yup'
import { useFormik } from 'formik';
import DisabledButton from '../DisabledButton';
import { useDispatch, useSelector } from 'react-redux';
import { editProfileAction, editProfilePicAction, User} from '../../redux/usersSlices';
import { MdOutlineCancel } from 'react-icons/md';
import {appDispatch, getState } from "../../redux/Hooks";
import { useEditProfileMutation, useEditProfilePicMutation } from "../../redux/usersApiSlices";




const errorSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'First name Too Short!')
        .max(50, 'First name Too Long!')
        .required('First name Required'),
    lastName: Yup.string()
        .min(2, 'Last name Too Short!')
        .max(50, 'Last name Too Long!')
        .required('Last name Required'),


});

function UserProfileEdit({ user, isEditPic, removeProfileEditModal, isLoading, isError, error }) {

    const dispatch=appDispatch()
const [editProfile]=useEditProfileMutation()
const [editPic]= useEditProfilePicMutation()
    // use formik hook to handle form state 
    const formik = useFormik({
        initialValues: {

            firstName: user?.firstName,
            email: user?.email,
            lastName: user?.lastName,
            image: user?.image ?? "",


        },
        validationSchema: errorSchema,
        onSubmit: isEditPic ? (values: User) => {

            editPic(values); ;removeProfileEditModal()
        } : (values: User)=> {

            editProfile(values); removeProfileEditModal()
        },
    });


    //get state from store 
    const userData = getState((state) => {
        return state?.users
    })






    return (
        <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
            <div className="float-right h-screen dark:text-gray-200  bg-white dark:bg-[#484B52] w-full sm:w-6/12">
                <div className='onboarding mt-10  flex flex-col px-2'>
                <div className="flex flex-row justify-between px-5">
                <h2 >EDIT YOUR PROFILE</h2>
                    <MdOutlineCancel size="30px" color='red' cursor={"pointer"} onClick={() => { removeProfileEditModal()}} />
                </div>
                    <form onSubmit={formik.handleSubmit} encType={isEditPic ? "multipart/form-data " : undefined} className="flex flex-col">


                        {!isEditPic && <>
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

                        </>}

                        {isEditPic && <>
                            <label htmlFor="image">Profile Picture</label>
                            <input
                                name="image"
                                id='image'
                                value={undefined}
                                onChange={(e) =>
                                    formik.setFieldValue('image', e.currentTarget.files![0])
                                }
                                onBlur={formik.handleBlur("image")}

                                type="file"
                                placeholder="Profile Image"

                            />

                        </>}

                        {
                            isLoading ? <DisabledButton /> :
                                <input type="submit" />}


                        {isError ? <div className="form-validation" role="alert">
                            {error}
                        </div> : null}


                    </form>
                </div>

            </div>
        </div>
    )
}

export default UserProfileEdit