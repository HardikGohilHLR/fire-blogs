/*
** Login
*/

import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForceUpdate } from '../../common/hooks/useForceUpdate';

// Packages
import Validator from 'simple-react-validator';

const Signup = () => { 
    const forceUpdate = useForceUpdate();

    const validator = useRef(new Validator({ autoForceUpdate: {forceUpdate} }));
      
    const [fieldValues, setFieldValues] = useState({
        username: '',
        email: '',
    });

    const handle = {
        change: (e, name) => {
            setFieldValues({...fieldValues, [name]: e});
        },
    }

    const submitForm = () => { 
        if (validator?.current?.allValid()) {
            alert('You submitted the form and stuff!'); 
        } else {
            validator?.current?.showMessages();
            console.log(validator?.current);
        }
    }

    return (
        <div className="fb_signup">
            <div className="fb-title mb-4 has-text-centered">
                <h1 className="is-size-3 has-text-weight-semibold">Login</h1>
            </div>

            <div className="columns">
                <div className="column column is-half is-offset-one-quarter">

                    <form>
                              
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control">
                                <input 
                                    className={`input ${validator?.current?.errorMessages?.username ? 'is-danger' : ''}`} 
                                    onChange={(e) => handle.change(e.target.value, 'username')} 
                                    type="text" 
                                    placeholder="Enter Username" 
                                    autoComplete="off"
                                />  
                            </div>   
                            <p className="help is-danger">{ validator?.current?.message('username', fieldValues?.username, 'required')}</p> 
                        </div>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input
                                    className={`input ${validator?.current?.errorMessages?.email ? 'is-danger' : ''}`}
                                    onChange={(e) => handle.change(e.target.value, 'email')}
                                    type="email"
                                    placeholder="Enter Email"
                                    autoComplete="off"
                                />                               
                            </div> 
                            <p className="help is-danger">{ validator?.current?.message('email', fieldValues?.email, 'required|email')}</p> 
                        </div>
 
                        <p className="is-size-6 mb-4">Don't have an account? <NavLink to="/create-account">Create Account</NavLink>.</p>

                        <button type="button" className="button is-link" onClick={submitForm}>Submit</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;
