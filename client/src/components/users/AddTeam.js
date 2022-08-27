import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid'
import { MdCancel } from 'react-icons/md'
import { useStateContext } from '../../context/ContextProvider';
import { useDispatch } from 'react-redux';
import { createUserAction } from '../../redux/usersSlices';
import { SiAddthis } from 'react-icons/si';
import { createTeamAction } from '../../redux/TeamSlices';

const errorSchema = Yup.object().shape({

    name: Yup
        .string()
        .required('Name is Required'),
    description: Yup
        .string()
        .required('Description is Required'),
    role: Yup
        .string()



});

function AddTeam({...props}) {
    const { setShowModal, currentColor, setTeams,teams, setShowCreateTeamModal} = useStateContext()


    const dispatch = useDispatch()

    const addMemberHandler = (values) => {
        dispatch(createTeamAction(values))
        setTeams([...teams, values]);
        setShowCreateTeamModal(false);

    }
    // use formik hook to handle form state 
    const formik = useFormik({
        initialValues: {
            name: '',
            description: "",
            teamId: uuidv4()
        },
        validationSchema: errorSchema,
        onSubmit: values => addMemberHandler(values)
        // onSubmit: values =>   console.log(values)
    });


    return (
        <div className="modal bg-white h-96 w-96 shadow-2xl" >
            <div className="flex flex-row justify-between mx-5 mt-5">
                <strong>Create new Team</strong>
            <MdCancel size="30px" color='red' onClick={() => {
                setShowCreateTeamModal(false);
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
                        <input className="form-row-input border-b-2 border-b-indigo-500 rounded-none"
                            type="text"
                            id="name"
                            value={formik.values.name}
                            onChange={formik.handleChange("name")}
                            onBlur={formik.handleBlur("name")}
                            placeholder='Name of the invitee' />

                    </span>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.description && formik.errors.description}
                    </div>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="description">description</label>
                            <input className="form-row-input border-b-2 border-b-indigo-500 rounded-none"
                            type="text"
                            id="description"
                            value={formik.values.description}
                            onChange={formik.handleChange("description")}
                            onBlur={formik.handleBlur("description")}
                            placeholder='description of the invitee' />
                    </span>

                    <span className="form-row-buttons">
                    <label className="form-row-label" htmlFor="Role"></label>
                        <button className="form-row-input" type="submit" style={{ background: currentColor }}>Save</button>

                    </span>            
            </form>
        </div>
    )
}

export default AddTeam