/*
** User Profile
*/
import React, { useRef, useEffect, useState } from 'react';
import { useForceUpdate } from '../common/hooks/useForceUpdate'; 
import fire from '../firebase.config';

// Packages
import Validator from 'simple-react-validator';

const AddBlog = (props) => {
    const db = fire.firestore();

    const forceUpdate = useForceUpdate();
    const validator = useRef(new Validator({ autoForceUpdate: {forceUpdate} }));
      
    const [fieldValues, setFieldValues] = useState({
        title: '',
        content: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if(error) { setTimeout(() => setError(''), 5000); }
        if(success) { setTimeout(() => setSuccess(''), 5000); }
    }, [error, success]);

    const handle = {
        change: (e, name) => {
            setFieldValues({...fieldValues, [name]: e});
        },
    }

    const submitForm = () => { 
        if (validator?.current?.allValid()) { 
            // Add user
            db.collection("blogs").add({
                title: fieldValues?.title,
                country: fieldValues?.content, 
                date: new Date(),
                user: props?.userInfo?.uid
            }).then(function() {
                setSuccess(true);
                setFieldValues({...fieldValues, title: '', content: ''});
            }).catch(e => setError(e));
        } else {
            validator?.current?.showMessages(); 
        }
    }

    return (
        <React.Fragment>
            <div className="fb_signup">
                <div className="container px-4 py-5">
                    <div className="fb-title mb-4 has-text-centered">
                        <h1 className="is-size-3 has-text-weight-semibold">Add Blog</h1>
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
                                {
                                    success &&
                                    <div className="notification is-success is-light mb-2 p-3">
                                        <button className="delete" onClick={() => setSuccess('')}></button>
                                        <p>Blog Added.</p>
                                    </div>
                                }
                                
                                <div className="field">
                                    <label className="label">Title</label>
                                    <div className="control">
                                        <input 
                                            className={`input ${validator?.current?.messagesShown && validator?.current?.errorMessages?.title ? 'is-danger' : ''}`} 
                                            onChange={(e) => handle.change(e.target.value, 'title')} 
                                            type="text" 
                                            placeholder="Enter Blog Title" 
                                            autoComplete="off"
                                            value={fieldValues?.title}
                                        />  
                                    </div>   
                                    <p className="help is-danger">{ validator?.current?.message('title', fieldValues?.title, 'required')}</p> 
                                </div> 

                                <div className="field">
                                    <label className="label">Content</label>
                                    <div className="control">
                                        <textarea className={`textarea ${validator?.current?.messagesShown && validator?.current?.errorMessages?.content ? 'is-danger' : ''}`} value={fieldValues?.content} placeholder="Content" onChange={(e) => handle.change(e.target.value, 'content')} ></textarea>
                                        <p className="help is-danger">{ validator?.current?.message('content', fieldValues?.content, 'required')}</p> 
                                    </div>
                                </div>


                                <button type="button" className="button is-link" onClick={submitForm}>Add</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddBlog;
