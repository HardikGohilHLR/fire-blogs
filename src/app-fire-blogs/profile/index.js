/*
** Profile
*/

import React, { useState, useEffect } from 'react';

import { useFireContext } from '../fire-context';

// Packages
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Firebase
import { db, getStorage, ref, uploadBytes, getDownloadURL, doc, updateDoc } from '../../firebase.config';

import Avatar from '../../components/avatar';

const Profile = () => {

    const _USER = useFireContext(e => e?.userInfo);

    const storage = getStorage();

    const [formMessages, setFormMessages] = useState('');
    const [isChange, setIsChange] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(formMessages) {
            setTimeout(() => {
                setFormMessages(null)
            }, 5000);
        }
    }, [formMessages]); 

    const formik = useFormik({
        initialValues: {
            email: _USER?.email,
            username: _USER?.username,
            profileImage: '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            email: Yup.string()
            .required('Email is required.')
            .email('Email must be valid.'),
            username: Yup.string()
            .min(6, 'Must be at least 6 characters or more.')
            .required('Username is required.')
        }),
        onSubmit: async (values) => {

            setIsLoading(true);

            if(values?.profileImage) {
                const storageRef = ref(storage, `images/${values?.profileImage?.name}`);
                uploadBytes(storageRef, values?.profileImage).then(() => {
                    setIsLoading(true);
    
                    getDownloadURL(ref(storage, `images/${values?.profileImage?.name}`))
                    
                    .then(async (url) => {
                        updateUser(values, url);
                    })
                    .catch(error => {
                        setIsLoading(false);
                        setFormMessages({type: 'error', message: error?.message});
                    });
                }).catch(error => {
                    setIsLoading(false);
                    setFormMessages({type: 'error', message: error?.message});
                });
            } else {
                updateUser(values);
            }
        },
    });

    const updateUser = async (values, url = _USER?.profileImage) => {
        await updateDoc(doc(db, "users", _USER?._id), {
            username: values?.username,
            profileImage: url
        });

        setIsLoading(false);
        setFormMessages({type: 'success', message: 'Profile Updated successfully!'});
        formik.handleReset();
    }

    useEffect(() => {
        setIsChange(formik?.dirty);
    }, [formik]);

    const handle = {
        change: (e) => { 
            formik.setFieldValue('profileImage', e?.target?.files[0]);
        },
    }

    return (
        <React.Fragment>
            <div className="fb_container">
                <div className="pt-50">

                    {
                        formMessages &&
                        <div className={`alert alert-${formMessages?.type}`}>
                            { formMessages?.message }
                            <button type="button" className="btn-close" onClick={() => setFormMessages(null)}></button>
                        </div>
                    }

                    <form onSubmit={formik.handleSubmit}>
                        
                        <div className="mb-10 fb_flex fb_align-center fb_content-between">

                            <h1 className="mb-10">My Profile</h1>

                            {
                                isChange &&
                                <div className="fb_button-control fb_flex fb_content-end">
                                    <button className="fb_btn fb_btn__white small" type="submit">Cancel</button>
                                    <button className={`fb_btn fb_btn__theme ml-10 ${isLoading ? 'loading' : ''}`} type="submit">Save</button>
                                </div>
                            }
                        </div>

                        <div className="fb_form-image">
                            {
                                formik?.values?.profileImage !== '' ?
                                <div className="fb_form-image-preview">
                                    <img src={URL.createObjectURL(formik?.values?.profileImage)} alt="User" />
                                </div>
                                :
                                <Avatar user={_USER} size={120} />
                            }

                            <label htmlFor="profileImage">
                                <input type="file" id="profileImage" name="profileImage" onChange={handle.change} />
                            </label>

                            <div className="fb_form-image-edit">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z" fill="#FFFFFF"/>
                                </svg>
                            </div>                       

                        </div>

                        <div className="fb_form-control-half">

                            <div className="fb_form-control">
                                <label htmlFor="username">Name</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik?.values?.username || ''}
                                />
                                
                                { formik?.touched?.username && formik?.errors?.username && <span className="fb_form-control-error">{formik?.errors?.username}</span> }
                            </div>

                            <div className="fb_form-control">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    disabled
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik?.values?.email || ''}
                                />
                                
                                { formik?.touched?.email && formik?.errors?.email && <span className="fb_form-control-error">{formik?.errors?.email}</span> }
                            </div>
                            
                        </div>

                    </form>

                </div>
            </div>
        </React.Fragment>
    )
}

export default Profile;
