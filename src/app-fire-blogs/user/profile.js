/*
** User Profile
*/

import React, { useEffect, useState } from 'react';
import fire from '../../firebase.config';

const Profile = ({ userInfo }) => {
    const db = fire.firestore();

    const [fieldValues, setFieldValues] = useState({
        username: '',
        email: '',
        isAdmin: false 
    });

    const [allValues, setAllValues] = useState({
        isEditable: true,
        erorr: '',
        success: ''
    });

    useEffect(() => { 
        setFieldValuesProps(); 
    }, [userInfo]);

    useEffect(() => {
        if(allValues?.error) { setTimeout(() => setAllValues({...allValues, error: ''}), 5000); }
        if(allValues?.success) { setTimeout(() => setAllValues({...allValues, success: ''}), 5000); }
    }, [allValues?.error, allValues?.success]);

    const setFieldValuesProps = () => {
        setFieldValues({
            ...fieldValues,
            username: userInfo?.username,
            email: userInfo?.email,
            isAdmin: userInfo?.isAdmin 
        });
    }

    const handle = {
        change: (e, name) => { 
            setFieldValues({...fieldValues, [name]: e});
        },
        editProfile: () => {
            setAllValues({...allValues, isEditable: false});
        },
        saveProfile: async () => {              
            db.collection("users").doc(userInfo?.uid).set({ 
                id: userInfo?.uid,
                email: fieldValues?.email,
                username: fieldValues?.username,
                isAdmin: fieldValues?.isAdmin
            }).then(() => setAllValues({...allValues, success: true, isEditable: true}))
            .catch(e => setAllValues({...allValues, error: e}));  
        },
        cancel: () => {
            setAllValues({...allValues, isEditable: true});
            setFieldValuesProps();
        }
    }

    return (
        
        <div className="fb-profile">
            <div className="container px-4 py-5">
                <div className="is-flex is-align-items-center is-justify-content-space-between fb-title mb-4">
                    <h1 className="is-size-3 has-text-weight-semibold">Profile</h1>

                    {
                        allValues?.isEditable ? 
                            <button className="button is-primary" onClick={handle.editProfile}>Edit</button>
                        :
                        <div>
                            <button className="button is-link mr-3" onClick={handle.saveProfile}>Save</button>
                            <button className="button is-light" onClick={handle.cancel}>Cancel</button>
                        </div>
                    }
                </div>

                {
                    allValues?.error &&
                    <div className="notification is-danger is-light mb-2 p-3">
                        <button className="delete" onClick={() => setAllValues({...allValues, error: ''})}></button>
                        <p>{allValues?.error?.message}</p>
                    </div>
                } 
                {
                    allValues?.success &&
                    <div className="notification is-success is-light mb-2 p-3"> 
                        <button className="delete" onClick={() => setAllValues({...allValues, success: ''})}></button>
                        <p>Profile Successfully updated.</p>
                    </div>
                }
 
                <form>
                    <div className="columns is-multiline">
                        <div className="field column is-6 mb-0">
                            <label className="label">Username</label>
                            <div className="control">
                                <input 
                                    className={`input`} 
                                    type="text" 
                                    placeholder="Enter Username" 
                                    autoComplete="off"
                                    value={fieldValues?.username}
                                    disabled={allValues?.isEditable} 
                                    onChange={e => handle.change(e.target.value, 'username')} 
                                />  
                            </div>   
                            <p className="help is-danger"></p> 
                        </div>
                        <div className="field column is-6 mb-0">
                            <label className="label">Email</label>
                            <div className="control">
                                <input 
                                    className={`input`} 
                                    type="text" 
                                    placeholder="Enter Email" 
                                    autoComplete="off"
                                    value={fieldValues?.email}
                                    disabled={allValues?.isEditable}
                                    onChange={e => handle.change(e.target.value, 'email')} 
                                />  
                            </div>   
                            <p className="help is-danger"></p> 
                        </div>

                        <div className="field column is-6">
                            <div className="control">
                                <label className="checkbox" htmlFor="isAdmin">
                                    <input 
                                        type="checkbox"
                                        id="isAdmin"
                                        name="isAdmin"
                                        className="mr-2" 
                                        onChange={e => handle.change(e.target.checked, 'isAdmin')} 
                                        checked={fieldValues?.isAdmin} 
                                        disabled={true}
                                    />
                                    Admin
                                </label>
                            </div>
                        </div>
                    </div>
                 </form> 

            </div>
        </div>
    )
}

export default Profile;
