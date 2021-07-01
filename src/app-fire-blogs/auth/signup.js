/*
** Create Account
*/

import React, { useRef, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForceUpdate } from '../../common/hooks/useForceUpdate'; 
import fire from '../../firebase.config';

// Packages
import Validator from 'simple-react-validator';

const Signup = () => { 
    const auth = fire.auth();
    const db = fire.firestore();
    const forceUpdate = useForceUpdate();

    const validator = useRef(new Validator({ element: message => <>{message}</>, autoForceUpdate: {forceUpdate} })); 
    const [fieldValues, setFieldValues] = useState({
        username: '',
        email: '',
        password: '', 
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if(error) {
            setTimeout(() => setError(''), 5000);
        }
    }, [error]);

    const handle = {
        change: (e, name) => {
            setFieldValues({...fieldValues, [name]: e});
        },
    }

    const submitForm = () => { 
        if (validator?.current?.allValid()) { 
            auth.createUserWithEmailAndPassword(fieldValues?.email, fieldValues?.password)
                .then(result => {
                        // Add display name
                        result.user.updateProfile({
                            displayName: fieldValues?.username
                        }); 
                        console.log(result);
                        addUser(result);
                    }
                )
                .catch(e => setError(e));
        } else { 
            validator?.current?.showMessages(); 
        }
    }

    const addUser = async(user) => {
        // Add user
        db.collection("users").doc(user?.user?.uid).set({
            id: user?.user?.uid,
            email: fieldValues?.email,
            username: fieldValues?.username
        });        
    } 

    return (
        <React.Fragment>
            <div className="fb_signup">
                <div className="container px-4 py-5">
                    <div className="fb-title mb-4 has-text-centered">
                        <h1 className="is-size-3 has-text-weight-semibold">Create Account</h1>
                    </div>

                    <div className="columns">
                    <div className="column column is-half is-offset-one-quarter">

                        <form>
                            {
                                error &&
                                <div className="notification is-danger is-light mb-2 p-3">
                                    <button className="delete" onClick={() => setError('')}></button>
                                    <p>{error?.message}</p>
                                </div>
                            }

                                
                            <div className="field">
                                <label className="label">Username</label>
                                <div className="control">
                                    <input 
                                        className={`input ${validator?.current?.messagesShown && validator?.current?.errorMessages?.username ? 'is-danger' : ''}`} 
                                        onChange={(e) => handle.change(e.target.value, 'username')} 
                                        type="text" 
                                        placeholder="Enter Username" 
                                        autoComplete="off"
                                        value={fieldValues?.username}
                                    />  
                                </div>   
                                <p className="help is-danger">{ validator?.current?.message('username', fieldValues?.username, 'required')}</p> 
                            </div>

                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input
                                        className={`input ${validator?.current?.messagesShown && validator?.current?.errorMessages?.email ? 'is-danger' : ''}`}
                                        onChange={(e) => handle.change(e.target.value, 'email')}
                                        type="email"
                                        placeholder="Enter Email"
                                        autoComplete="off"
                                        value={fieldValues?.email}
                                    />                               
                                </div> 
                                <p className="help is-danger">{ validator?.current?.message('email', fieldValues?.email, 'required|email')}</p> 
                            </div>

                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input
                                        className={`input ${validator?.current?.messagesShown && validator?.current?.errorMessages?.password ? 'is-danger' : ''}`}
                                        onChange={(e) => handle.change(e.target.value, 'password')}
                                        type="password"
                                        placeholder="Enter Password" 
                                        autoComplete="off"
                                        value={fieldValues?.password}
                                    />
                                </div>
                                <p className="help is-danger">{ validator?.current?.message('password', fieldValues?.password, 'required|min:6')}</p> 
                            </div>

                            <p className="is-size-6 mb-4">Already have an account? <NavLink to="/login">Login</NavLink>.</p>

                            <button type="button" className="button is-link" onClick={submitForm}>Submit</button>

                        </form>
                    </div>
                </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Signup;
