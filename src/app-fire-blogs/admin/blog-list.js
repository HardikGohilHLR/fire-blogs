/*
** User Profile
*/

import React, { useEffect, useState } from 'react';
import fire from '../../firebase.config';
import { useForceUpdate } from '../../common/hooks/useForceUpdate'; 
import { useHistory } from 'react-router-dom';

const BlogList = () => {

    const db = fire.firestore();
    const history = useHistory();

    const [allBlogs, setAllBlogs] = useState([]);
    const [allValues, setAllValues] = useState({
        isAllBlogsSelected: false,
        isAnyBlogsSelected: false,
        error: '', 
        success: ''
    });

    useEffect(() => {
        getAllBlogs();
    }, []);

    useEffect(() => {
        if(allValues?.error) { setTimeout(() => setAllValues({...allValues, error: ''}), 5000); }
        if(allValues?.success) { setTimeout(() => setAllValues({...allValues, success: ''}), 5000); }
    }, [allValues?.error, allValues?.success]);

    const getAllBlogs = async () => {
        const response = db.collection('blogs');
        const data = await response.get();
        let allBlogsList = [];
        data.forEach(doc => {
            let user = getuser(doc.data()?.user);
            console.log('user', user);
            allBlogsList.push({...doc.data(), id: doc?.id, isSelected: false});
        }); 
        setAllBlogs(allBlogsList);
    }   
    
    const getuser = async (id) => {
        const getUserResponse = db.collection('users');     
        const userData = await getUserResponse.where('id', '==' , id).get();  
        let user = {};
        userData?.forEach(doc => user = doc.data());
        return user;
    }

    const selectAllBlogs = (e) => {
        let allBlogList = [...allBlogs];
        allBlogList?.forEach(blog => {
            blog.isSelected = e?.target?.checked;
        });
        setAllValues({...allValues, isAllBlogsSelected: e?.target?.checked, isAnyBlogsSelected: allBlogList?.some(_ => _?.isSelected === true)});
        setAllBlogs(allBlogList);
    }

    const selectBlog = (e, blog) => {
        let allBlogList = [...allBlogs];
        const blogIndex = allBlogList?.findIndex(_ => _?.id === blog?.id);
        allBlogList[blogIndex].isSelected = e.target.checked; 
        setAllBlogs(allBlogList); 
        setAllValues({...allValues, isAllBlogsSelected: allBlogList?.every(_ => _?.isSelected === true), isAnyBlogsSelected: allBlogList?.some(_ => _?.isSelected === true)});
    }

    const deleteBlog = (blog) => { 
        let allBlogList = [...allBlogs];
        const blogIndex = allBlogList?.findIndex(_ => _?.id === blog?.id);
        allBlogList.splice(blogIndex, 1);
        db.collection('blogs').doc(blog?.id).delete()
        .then(() => {
            setAllValues({...allValues, success: true}); 
            setAllBlogs(allBlogList); 
        })
        .catch(e => setAllValues({...allValues, error: e}));;
    }

    const hideBlog = (blog) => {
        let allBlogList = [...allBlogs];
        const blogIndex = allBlogList?.findIndex(_ => _?.id === blog?.id);
        allBlogList[blogIndex].isVisible = !allBlogList[blogIndex].isVisible; 
        db.collection('blogs').doc(blog?.id).update({ 
            isVisible: allBlogList[blogIndex].isVisible
        }).then(() => {
            setAllValues({...allValues, success: true});
            setAllBlogs(allBlogList);
        }).catch(e => setAllValues({...allValues, error: e}));
    }

    const deleteAllBlogs = () => {        
        let allBlogList = [...allBlogs];
        allBlogList?.filter((blog, i) => {  
            if(blog?.isSelected) { 
                db.collection('blogs').doc(blog?.id).delete(); 
            }
        });    
        getAllBlogs();        
    }

    const hideAllBlogs = () => { 
        let allBlogList = [...allBlogs];
        allBlogList?.filter((blog) => {  
            if(blog?.isSelected) {
                db.collection('blogs').doc(blog?.id).update({ 
                    isVisible: false
                }); 
                allBlogList[allBlogList.findIndex(_ => _.id === blog?.id)].isVisible = false;
                allBlogList[allBlogList.findIndex(_ => _.id === blog?.id)].isSelected = false;
            }
        });      
        setAllBlogs(allBlogList);        
        setAllValues({...allValues, isAllBlogsSelected: false, isAnyBlogsSelected: false});
    }

    const previewBlog = (blog) => {
        history.push(`/blog/${blog?.id}`);
    }

    return (
        <React.Fragment>
            <div className="fb_blog_list">
                <div className="container px-4 py-5">                    
                    <div className="is-flex is-align-items-center is-justify-content-space-between fb-title mb-4">
                        <h1 className="is-size-3 has-text-weight-semibold">All Blogs</h1>
                        {                            
                            (allValues?.isAllBlogsSelected || allValues?.isAnyBlogsSelected) && 
                            <div className="is-flex is-align-items-center is-justify-content-flex-end">
                                <button className="button is-small is-danger" onClick={deleteAllBlogs}>
                                    Delete All Blogs
                                </button>
                                <button className="button is-small is-info ml-3" onClick={hideAllBlogs}>
                                    Hide All Blogs
                                </button>
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
                            <p>Successfully updated.</p>
                        </div>
                    }

                    <table className="table is-fullwidth"> 
                        <thead>
                            <tr>
                                <td>
                                    <label className="checkbox">
                                        <input type="checkbox" checked={allValues?.isAllBlogsSelected} onChange={(e) => selectAllBlogs(e)} />
                                    </label>
                                </td>
                                <td>Image</td>
                                <td>Title</td>
                                <td>Content</td>
                                {/* <td>Posted by</td> */}
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allBlogs?.map((blog, index) => {
                                    return (
                                        <tr key={blog?.id}>
                                            <td>
                                                <label className="checkbox">
                                                    <input type="checkbox" checked={blog?.isSelected} onChange={(e) => selectBlog(e, blog)} />
                                                </label>
                                            </td>
                                            <td style={{ width: '120px' }}>
                                                { 
                                                    blog?.blogImage ?
                                                    <figure className="image">
                                                        <img src={blog?.blogImage} alt={blog?.title} title={blog?.title} />
                                                    </figure>
                                                    : '-' 
                                                }
                                            </td>
                                            <td style={{ width: '40%' }}><p className="ellipsis is-ellipsis-2">{blog?.title}</p></td>
                                            <td style={{ width: '30%' }}>
                                                <p className="ellipsis is-ellipsis-2">{blog?.content}</p>
                                            </td>
                                            {/* <td>{blog?.user}</td> */}
                                            <td>
                                                <div className="is-flex is-align-items-center">
                                                    <button className="button is-small is-primary ml-3" onClick={() => previewBlog(blog)}>
                                                        <span className="icon">
                                                            <i className="fas fa-external-link-alt"></i>
                                                        </span>
                                                    </button>
                                                    <button className="button is-small is-danger ml-3" onClick={() => deleteBlog(blog)}>
                                                        <span className="icon">
                                                            <i className="fas fa-trash"></i>
                                                        </span>
                                                    </button>
                                                    <button className="button is-small is-info ml-3" onClick={() => hideBlog(blog)}>
                                                        <span className="icon">                                                            
                                                        {
                                                            blog?.isVisible ?
                                                                <i className="fas fa-eye"></i>
                                                            :
                                                            <i className="fas fa-eye-slash"></i>
                                                        }
                                                        </span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            {
                                allBlogs?.length === 0 &&
                                <tr>
                                    <td colSpan="6" className="has-text-centered">No Data Found.</td>
                                </tr>
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </React.Fragment>
    )
}

export default BlogList;
