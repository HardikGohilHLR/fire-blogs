/*
** Change Password
*/

import React, { useState } from 'react';

import { useFireContext } from '../../fire-context';

// Packages
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Firebase
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider, auth } from '../../../firebase.config';

const ChangePassword = ({close, setData}) => {

    const _USER = useFireContext(e => e?.userInfo);

    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            password: '',
            cPassword: '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            oldPassword: Yup.string().required("Old Password is required."),
            password: Yup.string().required("Password is required."),
            cPassword: Yup.string().required("Confirm Password is required.").when("password", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf( [Yup.ref("password")], "Both password need to be the same" )
            }),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);

            const credential = EmailAuthProvider.credential(
                _USER?.email,
                values?.oldPassword
            );

            reauthenticateWithCredential(auth?.currentUser, credential).then(() => {

                updatePassword(auth?.currentUser, values?.password).then(() => {
                    setIsLoading(false);
                    setData({type: 'success', message: 'Password updated successfully!'});
                }).catch((error) => {
                    setIsLoading(false);
                    setData({type: 'error', message: error?.message});
                });

            }).catch((error) => {
                setIsLoading(false);
                setData({type: 'error', message: error?.message});
            });
        },
    });

    return (
        <React.Fragment>
            
            <div className="fb_modal">

                <div className="fb_modal-overlay"></div>

                <div className="fb_modal-body">
                    <div className="fb_modal-header">
                        <h4>Change Password</h4>

                        <span className="fb_modal-close" onClick={close}>&#10006;</span>
                    </div>

                    <div className="fb_modal-content">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="fb_form-control">
                                <label htmlFor="oldPassword">Old Password</label>
                                <input
                                    id="oldPassword"
                                    name="oldPassword"
                                    type="password"
                                    onChange={formik.handleChange}
                                    value={formik?.values?.oldPassword || ''}
                                />
                                
                                { formik?.touched?.oldPassword && formik?.errors?.oldPassword && <span className="fb_form-control-error">{formik?.errors?.oldPassword}</span> }
                            </div>

                            <div className="fb_form-control">
                                <label htmlFor="password">New Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={formik.handleChange}
                                    value={formik?.values?.password || ''}
                                />
                                
                                { formik?.touched?.password && formik?.errors?.password && <span className="fb_form-control-error">{formik?.errors?.password}</span> }
                            </div>

                            <div className="fb_form-control">
                                <label htmlFor="cPassword">Confirm Password</label>
                                <input
                                    id="cPassword"
                                    name="cPassword"
                                    type="password"
                                    onChange={formik.handleChange}
                                    value={formik?.values?.cPassword || ''}
                                />
                                
                                { formik?.touched?.cPassword && formik?.errors?.cPassword && <span className="fb_form-control-error">{formik?.errors?.cPassword}</span> }
                            </div>

                            <div className="fb_modal-footer">
                                <button className="fb_btn fb_btn__white small" type="button" onClick={close}>Cancel</button>
                                <button className={`fb_btn fb_btn__theme ml-10 small ${isLoading ? 'loading' : ''}`} type="submit">Save</button>
                            </div>

                        </form>
                    </div>

                </div>

            </div>
        </React.Fragment>
    )
}

export default ChangePassword;
