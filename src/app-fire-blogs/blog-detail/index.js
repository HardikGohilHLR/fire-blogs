/*
** Blog page
*/

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Firebase
import { db, doc, getDoc } from '../../firebase.config';

import { getUserImage, formatDate } from '../../common/functions';

const BlogDetail = () => {
    
    const { id } = useParams();

    const [blog, setBlog] = useState('');

    useEffect(() => {
        getBlogDetail();
    }, [id]);

    const getBlogDetail = async () => {
        const blogsRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(blogsRef);

        if (docSnap.exists()) {
            setBlog(docSnap.data());
        }
    }

    const user = '';

    return (
        <React.Fragment>            
            <div className="fb_blog-details">
                
                <div className="fb_blog-details__header">
                    <div className="fb_container"> 
                        <h1>{blog?.title}</h1>
                    </div>
                </div>

                <div className="fb_container"> 
                    <div className="fb_blog-details__wpr">

                        <div className="fb_blog-details__image">
                            <img src={blog?.blogImage} alt={blog?.title} title={blog?.title}/>
                        </div>

                        <div className="fb_blog-post__author">
                        
                            <div className="fb_blog-post__author-avatar">
                                <img src={getUserImage(user)} alt="Placeholder" />
                            </div>

                            <div className="fb_blog-post__author-info">
                                <h4>{user?.username || 'John Doe'}</h4>
                                <span> { formatDate(blog?.date?.toDate(), 'ddd, MMM Do, YYYY') } </span>
                            </div>

                        </div>

                        <div className="fb_blog-details__content">
                            <p>{blog?.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BlogDetail;
