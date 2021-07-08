/*
** Login
*/

import React, { useRef, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useForceUpdate } from '../../common/hooks/useForceUpdate';
import fire from '../../firebase.config';

// Packages
import Validator from 'simple-react-validator';

const Login = (props) => { 
    const forceUpdate = useForceUpdate();
    const auth = fire.auth();
    const history = useHistory(); 
    const validator = useRef(new Validator({ element: message => <>{message}</>, autoForceUpdate: {forceUpdate} })); 
          
    const [fieldValues, setFieldValues] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if(error) { setTimeout(() => setError(''), 5000); }
    }, [error]);
 
    const handle = {
        change: (e, name) => {
            setFieldValues({...fieldValues, [name]: e});
        },
    }

    const submitForm = () => { 
        if (validator?.current?.allValid()) {
            auth.signInWithEmailAndPassword(fieldValues?.email, fieldValues?.password).then(cred => {
                history.push('/');
            })
            .catch(e => setError(e));
        } else {
            validator?.current?.showMessages(); 
        }
    }

    return (
        <React.Fragment>
            <div className="fb_login">
                <div className="container px-4 py-5">
                    <div className="fb-title mb-4 has-text-centered">
                        <h1 className="is-size-3 has-text-weight-semibold">Login</h1>
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
                                        />
                                    </div>
                                    <p className="help is-danger">{ validator?.current?.message('password', fieldValues?.password, 'required|min:6')}</p> 
                                </div>
        
                                <p className="is-size-6 mb-4">Don't have an account? <NavLink to="/create-account">Create Account</NavLink>.</p>

                                <button type="button" className="button is-link" onClick={submitForm}>Submit</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;
