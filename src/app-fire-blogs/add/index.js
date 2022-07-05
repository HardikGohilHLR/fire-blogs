/*
** User Profile
*/
import React, { useEffect, useState } from 'react';

// Packages
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { EditorState } from 'draft-js';

import BlogEditor from './components/editor';

import { db, getStorage, ref, uploadBytes, getDownloadURL, setDoc, collection, doc } from '../../firebase.config';

const AddBlog = () => { 

    const storage = getStorage();

    const [isLoading, setIsLoading] = useState(false);
    const [formMessages, setFormMessages] = useState('');

    const [editorState, ] = useState(EditorState.createEmpty());

    useEffect(() => {
        if(formMessages) {
            setTimeout(() => {
                setFormMessages(null)
            }, 5000);
        }
    }, [formMessages]);

    const handle = {
        change: (e) => { 
            formik.setFieldValue('content', e);
        },
        uploadImage: (e) => { 
            formik.setFieldValue('image', e?.target?.files[0]);
        }
    }  
 
    const formik = useFormik({
        initialValues: {
            title: '',
            image: '',
            content: ''
        },
        validationSchema: Yup.object({
            title: Yup.string()
            .required('Title is required.'),
            image: Yup.mixed().required('Image is required.')
        }),
        onSubmit: values => {
            setIsLoading(true);

            const storageRef = ref(storage, `images/${values?.image?.name}`);
            uploadBytes(storageRef, values?.image).then(() => {
                setIsLoading(true);

                getDownloadURL(ref(storage, `images/${values?.image?.name}`))
                .then(async (url) => {
                    const blogsRef = doc(collection(db, 'blogs'));
    
                    await setDoc(blogsRef, {
                        title: values?.title,
                        content: values?.content,
                        image: url,
                        date: new Date(),
                    });
  
                    setIsLoading(false);
                    setFormMessages({type: 'success', message: 'Blog added successfully!'});
                    formik.setFieldValue('content', '');
                    formik.setFieldValue('image', '');
                    formik.handleReset();
                })
                .catch(error => {
                    setIsLoading(false);
                    setFormMessages({type: 'error', message: error?.message});
                });
            }).catch(error => {
                setIsLoading(false);
                setFormMessages({type: 'error', message: error?.message});
            });
              
        }
    });

    return (
        <React.Fragment>
            <div className="fb_add_blog">
                <div className="fb_container">

                    <div className="fb_title-header">
                        <h1>Add Blog</h1>
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
                            <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik?.values?.title}
                            />
                            
                            { formik?.touched?.title && formik?.errors?.title && <span className="fb_form-control-error">{formik?.errors?.title}</span> }
                            
                        </div>

                        <div className="fb_form-control">
                            <label>Content</label>
                            <BlogEditor content={editorState} onChange={handle.change} /> 
                        </div>

                        <div className="fb_form-control fb_file-control">

                            <label htmlFor="image">Image</label>

                            <div className="fb_file-control-input">

                                <label>
                                    <input 
                                        type="file" 
                                        name="image" 
                                        id="image" 
                                        onChange={handle.uploadImage}
                                    />                                    
                                </label>
                                
                            </div>
                            
                            { formik?.touched?.image && formik?.errors?.image && <span className="fb_form-control-error">{formik?.errors?.image}</span> }
                        </div>
                        
                        <div className="fb_button-control">
                            <button className={`fb_btn fb_btn__theme ${isLoading ? 'loading' : ''}`} type="submit">Add</button>
                        </div>

                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddBlog;
