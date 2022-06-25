/*
** Home
*/

import React, { useState, useEffect } from 'react';

import BlogCard from '../../components/blog-card';

// Firebase
import { db, collection, getDocs } from '../../firebase.config';

const Home = () => {

    const [allBlogs, setAllBlogs] = useState([]);
    
    useEffect(() => {
        fetchBlogs();
    }, []);

    // Fetch All blogs
    const fetchBlogs = async () => {

        let blogsList = [];
        
        const response = await getDocs(collection(db, "blogs"));
        response.forEach((doc) => {
            blogsList?.push({id: doc.id, ...doc.data()});
        });
        
        setAllBlogs(blogsList);
    }

    return (
        <React.Fragment>
            <div className="fb-home">
                <div className="fb_container">

                    <div className="fb-title mb-4">
                        <h1 className="is-size-3 has-text-weight-semibold">Blogs</h1>
                    </div>

                    <div className="fb_blog-list">
                    {
                        allBlogs?.map(blog => {
                            return (
                                blog?.isVisible && <BlogCard blogData={blog} key={blog?.id}/>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home
