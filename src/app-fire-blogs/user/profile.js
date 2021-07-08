/*
** User Profile
*/

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fire from '../../firebase.config';

const Profile = () => {
    const db = fire.firestore();
    const params = useParams();
    const storage = fire.storage();

    const [fieldValues, setFieldValues] = useState({
        username: '',
        email: '',
        isAdmin: false,
        image: '',
        imageBase64: '',
        imageURL: ''
    });

    const [allValues, setAllValues] = useState({
        isEditable: true,
        error: '', 
        success: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { 
        setFieldValuesProps(); 
    }, []);

    useEffect(() => {
        if(allValues?.error) { setTimeout(() => setAllValues({...allValues, error: ''}), 5000); }
        if(allValues?.success) { setTimeout(() => setAllValues({...allValues, success: ''}), 5000); }
    }, [allValues?.error, allValues?.success]);

    const setFieldValuesProps = async () => {        
        const response = db.collection('users').doc(params?.id);
        const data = await response.get(); 
        console.log(data.data());
        setFieldValues({
            ...fieldValues,
            id: data?.id,
            username: data.data()?.username,
            email: data.data()?.email,
            isAdmin: data.data()?.isAdmin,
            image: data.data()?.image
        });
    }

    const handle = {
        change: (e, name) => { 
            setFieldValues({...fieldValues, [name]: e});
        },
        editProfile: () => {
            setAllValues({...allValues, isEditable: false});
        },
        uploadImage: (e, name) => { 
            const image = e.target.files[0]; 
            console.log(image);
            setFieldValues({...fieldValues, image: image, imageBase64: URL.createObjectURL(image)});
        },
        saveProfile: async () => {   
            setIsLoading(true);
            const uploadTask = storage.ref(`/images/${fieldValues?.image?.name}`).put(fieldValues?.image);
            uploadTask.on('state_changed', () => {}, 
                err => {  
                    setAllValues({...allValues, error: err});
                    setIsLoading(false);
                    return false;
                }, () => { 
                storage.ref('images').child(fieldValues?.image?.name).getDownloadURL()
                .then(fireBaseUrl => {
                    setFieldValues({...fieldValues, imageURL: fireBaseUrl});
                    db.collection("users").doc(fieldValues?.id).set({ 
                        id: fieldValues?.id,
                        email: fieldValues?.email,
                        username: fieldValues?.username,
                        isAdmin: fieldValues?.isAdmin,
                        image: fireBaseUrl
                    })                    
                    .then(() => setAllValues({...allValues, success: true, isEditable: true}))
                    .catch(e => setAllValues({...allValues, error: e}));
                })
            });  
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
                        <div className="field column is-flex is-align-items-center is-12"> 
                            <figure class="image is-128x128 mr-5">
                                <img class="is-rounded" style={{height: '100%'}} src={`${fieldValues?.imageBase64 ? fieldValues?.imageBase64 : fieldValues?.image ? fieldValues?.image : '' }`} />
                            </figure>
                            <div className="field"> 
                                <div className="control">
                                    <div className="file is-small is-info has-name">
                                        <label className="file-label">
                                            <input className="file-input" type="file" name="image" 
                                                onChange={(e) => handle.uploadImage(e, 'image')}
                                            />
                                            <span className="file-cta">
                                                <span className="file-icon"> <i className="fas fa-upload"></i> </span>
                                                <span className="file-label">
                                                    Upload Profile Photo
                                                </span>
                                            </span>
                                            {
                                                fieldValues?.image?.name && 
                                                    <span className="file-name"> { fieldValues?.image?.name } </span>
                                            }
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
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
