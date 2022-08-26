import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid'
import { MdCancel } from 'react-icons/md'
import { useStateContext } from '../../context/ContextProvider';
import { useDispatch } from 'react-redux';
import { createUserAction } from '../../redux/usersSlices';

const errorSchema = Yup.object().shape({

    name: Yup
        .string()
        .required('Name is Required'),
    email: Yup
        .string()
        .required('Email is Required'),
    role: Yup
        .string()



});

function InviteUser({ ...props }) {
    const { setShowModal, currentColor, team, setTeam } = useStateContext()


    const dispatch = useDispatch()

    const addMemberHandler = (values) => {
        dispatch(createUserAction(values))
        setTeam([...team, values]);
        setShowModal(false);

    }
    // use formik hook to handle form state 
    const formik = useFormik({
        initialValues: {
            name: '',
            role: "",
            email: "",
            status: "pending",
            userId: uuidv4()
        },
        validationSchema: errorSchema,
        onSubmit: values => addMemberHandler(values)
    });


    return (
        <div className="modal bg-white h-96 w-96 shadow-2xl" >
            <div className="flex flex-row justify-between mx-5 mt-5">
                <strong>Create new Member</strong>
            <MdCancel size="30px" color='red' onClick={() => {
                setShowModal(false);
            }} 
            style={{cursor: "poiter"}}/>
            </div>
            <form onSubmit={formik.handleSubmit} className=" mx-5 my-5">               
                
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.name && formik.errors.name}
                    </div>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="name">Name</label>
                        <input className="form-row-input border-2 border-indigo-300"
                            type="text"
                            id="name"
                            value={formik.values.name}
                            onChange={formik.handleChange("name")}
                            onBlur={formik.handleBlur("name")}
                            placeholder='Name of the invitee' />

                    </span>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.email && formik.errors.email}
                    </div>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="email">Email</label>
                            <input className="form-row-input border-2 border-indigo-300"
                            type="text"
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange("email")}
                            onBlur={formik.handleBlur("email")}
                            placeholder='Email of the invitee' />
                    </span>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.role && formik.errors.role}
                    </div>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="Role">Role</label>
                            <input className="form-row-input border-2 border-indigo-300"
                            type="text"
                            id="role"
                            value={formik.values.role}
                            onChange={formik.handleChange("role")}
                            onBlur={formik.handleBlur("role")}
                            placeholder='Role of the invitee'
                        />
                    </span>
                    <span className="form-row-buttons">
                    <label className="form-row-label" htmlFor="Role"></label>
                        <button className="form-row-input" type="submit" style={{ background: currentColor }}>Save</button>

                    </span>            
            </form>
        </div>
    )
}

export default InviteUser