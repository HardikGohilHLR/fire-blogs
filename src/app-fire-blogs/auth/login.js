/*
** Login
*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Packages
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Firebase
import { auth, signInWithEmailAndPassword } from '../../firebase.config';
import { useFireContext } from '../fire-context';

const Login = () => {

    const navigate = useNavigate();
    const _USER = useFireContext(e => e?.userInfo);

    const [formMessages, setFormMessages] = useState('');

    useEffect(() => {
        if(formMessages) {
            setTimeout(() => {
                setFormMessages(null)
            }, 5000);
        }
    }, [formMessages]);

    useEffect(() => {
        if(_USER?.email) {
            navigate('/');
        }
    }, [_USER]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
            .required('Email is required.')
            .email('Email must be valid.'),
            password: Yup.string()
            .min(6, 'Must be at least 6 characters or more.')
            .required('Password is required.')
        }),
        onSubmit: values => {
            signInWithEmailAndPassword(auth, values?.email, values?.password)
            .then((userCredential) => {
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

                    {
                        formMessages &&
                        <div className={`alert alert-${formMessages?.type}`}>
                            { formMessages?.message }
                            <button type="button" className="btn-close" onClick={() => setFormMessages(null)}></button>
                        </div>
                    }
                    
                    <form onSubmit={formik.handleSubmit}>

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
                            <button className="fb_btn fb_btn__theme" type="submit">Login</button>
                        </div>

                    </form>

                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;
