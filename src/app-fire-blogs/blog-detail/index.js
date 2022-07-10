/*
** Blog page
*/

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { formatDate } from '../../common/functions';

// Firebase
import { db, doc, getDoc } from '../../firebase.config';

import Skeleton from '../../components/skeleton';
import Avatar from '../../components/avatar';

const BlogDetail = () => {
    
    const { id } = useParams();

    const [blog, setBlog] = useState('');
    const [dataLoading, setDataLoading] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        getBlogDetail();
    }, [id]);

    const getBlogDetail = async () => {
        const blogsRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(blogsRef);
        
        if (docSnap.exists()) {
            setBlog(docSnap.data());
            setDataLoading(false); 
            getUser(docSnap.data()?.user);
        }
    }

    const getUser = async (user) => { 
        const usersRef = doc(db, 'users', user);
        const docSnap = await getDoc(usersRef);
        
        if (docSnap.exists()) {
            setUser(docSnap.data());
        }
    }

    return (
        <React.Fragment>            
            <div className="fb_blog-details">
                
                <div className="fb_blog-details__header">
                    <div className="fb_container"> 
                    {
                        dataLoading ? 
                        <Skeleton width="100%" height="44px" /> :
                        <h1>{blog?.title}</h1>
                    }
                    </div>
                </div>

                <div className="fb_container"> 
                    <div className="fb_blog-details__wpr">

                        <div className="fb_blog-details__image">
                            {
                                dataLoading ? 
                                <Skeleton width="100%" height="450px" /> :
                                <img src={blog?.image} alt={blog?.title} title={blog?.title}/>
                            }
                        </div>

                        <div className="fb_blog-post__author">
                        
                            <div className="fb_blog-post__author-avatar">
                                {
                                    dataLoading ? 
                                    <Skeleton width="50px" height="50px" round /> :
                                    <Avatar user={user} size={40} />
                                }
                            </div>

                            {
                                dataLoading ?
                                    <div>  
                                        <Skeleton width="150px" height="14px" cn="mb-10 fb_block" />
                                        <Skeleton width="150px" height="14px" />
                                    </div>
                                    :
                                <div className="fb_blog-post__author-info">
                                    <h4>{user?.username}</h4>
                                    <span> { formatDate(blog?.date?.toDate(), 'ddd, MMM Do, YYYY') } </span>
                                </div>
                            }

                        </div>

                        {
                            dataLoading ?
                            <div className="mt-20">           
                                {
                                    [...Array(10)?.fill('')].map((item, index) => {
                                        return <Skeleton width="100%" height="20px" cn="mb-3" key={index} />
                                    })
                                }
                            </div>
                            :
                            <div className="fb_blog-details__content" dangerouslySetInnerHTML={{ __html: blog?.content}} />
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BlogDetail;
