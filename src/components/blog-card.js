/*
** Blog Card
*/
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { formatDate } from '../common/functions';

import Avatar from './avatar';
import Skeleton from './skeleton';

import { getDoc, doc, db } from '../firebase.config';

const BlogCard = ({blogData, dataLoading}) => {  

    const navigate = useNavigate();

    const [user, setUser] = useState({});

    useEffect(() => {
        blogData?.user && getUser();
    }, [blogData?.user]);
    
    const getUser = async () => {

        const usersRef = doc(db, 'users', blogData?.user);
        const docSnap = await getDoc(usersRef);
        
        if (docSnap.exists()) {
            setUser(docSnap.data());
        }
    }
    
    const viewBlog = () => {
        navigate(`/blog/${blogData?.id}`);
    }
    
    return (
        <React.Fragment>
            <div className="fb_blog-post" onClick={() => !dataLoading && viewBlog()}>
                {
                    dataLoading ? <BlogCardSkeleton /> :

                    <>  
                        <div className="fb_blog-post__image">
                            <img src={blogData?.image} alt="Placeholder" />
                        </div>

                        <div className="fb_blog-post__content">

                            <div className="fb_blog-post__desc">
                                <h3 className="fb_ellipsis fb_ellipsis-2">{ blogData?.title }</h3>
                                <div className="fb_ellipsis fb_ellipsis-3" dangerouslySetInnerHTML={{ __html: blogData?.content}} />
                            </div>

                            <div className="fb_blog-post__author">
                                
                                <div className="fb_blog-post__author-avatar">
                                    <Avatar user={user} size={45} />
                                </div>

                                <div className="fb_blog-post__author-info">
                                    <h4>{user?.username || 'John Doe'}</h4>
                                    <span> { formatDate(blogData?.date?.toDate(), 'ddd, MMM Do, YYYY') } </span>
                                </div>

                            </div>

                        </div>
                    </>
                }
            </div>
        </React.Fragment>
    )
}

const BlogCardSkeleton = () => {
    return (
        <React.Fragment>
            
            <div className="fb_blog-post__image">
                <Skeleton width="100%" height="260px" />
            </div>

            <div className="fb_blog-post__content">

                <div className="fb_blog-post__desc">
                    <Skeleton width="100%" height="24px" cn="mb-5"/>
                    <Skeleton width="100%" height="24px" cn="mb-10" />

                    <div>
                        <Skeleton width="100%" height="20px" cn="mb-2" />
                        <Skeleton width="100%" height="20px" cn="mb-2" />
                        <Skeleton width="100%" height="20px" cn="mb-2" />
                    </div>

                </div>

                <div className="fb_blog-post__author">
                    
                    <div className="fb_blog-post__author-avatar">
                        <Skeleton width="50px" height="50px" round />
                    </div>

                    <div>
                        <Skeleton width="100px" height="14px" cn="mb-10 fb_block" />
                        <Skeleton width="100px" height="14px" />
                    </div>

                </div>

            </div>

        </React.Fragment>
    )
}

export default BlogCard;