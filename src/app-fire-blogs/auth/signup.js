/*
** Create Account
*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Packages
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Firebase
import { auth, createUserWithEmailAndPassword, db, collection, setDoc, doc } from '../../firebase.config';

const Signup = () => {

    const navigate = useNavigate();

    const [formMessages, setFormMessages] = useState('');

    useEffect(() => {
        if(formMessages) {
            setTimeout(() => {
                setFormMessages(null)
            }, 5000);
        }
    }, [formMessages]);

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
            .required('Username is required.')
            .min(6, 'Must be at least 6 characters or more.'),
            email: Yup.string()
            .required('Email is required.')
            .email('Email must be valid.'),
            password: Yup.string()
            .min(6, 'Must be at least 6 characters or more.')
            .required('Password is required.')
        }),
        onSubmit: values => {
            createUserWithEmailAndPassword(auth, values?.email, values?.password)
            .then(async (user) => {
                const usersRef = doc(collection(db, 'users'));
            
                await setDoc(usersRef, { 
                    id: user?.user?.uid,
                    email: values?.email,
                    username: values?.username,
                    profileImage: ''
                });

                setFormMessages({type: 'success', message: 'Redirecting...'});
                navigate('/');
            })
            .catch((error) => {
                setFormMessages({type: 'error', message: error?.message});
            })
        },
    });

    return (
        <React.Fragment>
            <div className="fb_container">
                <div className="fb_auth">

                    <div className="mb-40">
                        <h1>Signup</h1>
                    </div>

                    {
                        formMessages &&
                        <div className={`alert alert-${formMessages?.type}`}>
                            { formMessages?.message }
                            <button type="button" className="btn-close" onClick={() => setFormMessages(null)}></button>
                        </div>
                    }
                    
                    <form onSubmit={formik.handleSubmit}>

                        <div className="fb_form-control">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik?.values?.username}
                            />
                            
                            { formik?.touched?.username && formik?.errors?.username && <span className="fb_form-control-error">{formik?.errors?.username}</span> }
                            
                        </div>

                        <div className="fb_form-control">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik?.values?.email}
                            />
                            
                            { formik?.touched?.email && formik?.errors?.email && <span className="fb_form-control-error">{formik?.errors?.email}</span> }
                            
                        </div>

                        <div className="fb_form-control">

                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik?.values?.password}
                            />
                            
                            { formik?.touched?.password && formik?.errors?.password && <span className="fb_form-control-error">{formik?.errors?.password}</span> }
                            
                        </div>

                        <div className="fb_button-control">
                            <button className="fb_btn fb_btn__theme" type="submit">Submit</button>
                        </div>

                    </form>

                </div>
            </div>
        </React.Fragment>
    )
}

export default Signup;
