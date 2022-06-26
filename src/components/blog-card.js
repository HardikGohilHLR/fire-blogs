/*
** Blog Card
*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserImage, formatDate } from '../common/functions';

const BlogCard = ({blogData}) => {  

    const navigate = useNavigate()

    const [user,] = useState({});
    
    // useEffect(() => {
    //     getUserName(props?.blogData?.user);
    // }, [props?.blogData])
    
    // const getUserName = async (userId) => {
    //     const response = db.collection('users');     
    //     const data = await response.where('id', '==' , userId).get();  
    //     data?.forEach(doc => setUser(doc.data()));  
    // }
    
    const viewBlog = () => {
        navigate(`/blog/${blogData?.id}`);
    }
    
    return (
        <React.Fragment>
            <div className="fb_blog-post" onClick={viewBlog}>

                <div className="fb_blog-post__image">
                    <img src={blogData?.blogImage} alt="Placeholder" />
                </div>

                <div className="fb_blog-post__content">

                    <div className="fb_blog-post__desc">
                        <h3 className="fb_ellipsis fb_ellipsis-2">{ blogData?.title }</h3>
                        <p className="fb_ellipsis fb_ellipsis-3">{ blogData?.content }</p>  
                    </div>

                    <div className="fb_blog-post__author">
                        
                        <div className="fb_blog-post__author-avatar">
                            <img src={getUserImage(user)} alt="Placeholder" />
                        </div>

                        <div className="fb_blog-post__author-info">
                            <h4>{user?.username || 'John Doe'}</h4>
                            <span> { formatDate(blogData?.date?.toDate(), 'ddd, MMM Do, YYYY') } </span>
                        </div>

                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default BlogCard;