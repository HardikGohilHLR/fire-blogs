/*
** Home
*/

import React, { useState, useEffect } from 'react';

import BlogCard from '../../components/blog-card';

// Firebase
import { db, collection, getDocs, query, orderBy } from '../../firebase.config';

const Home = () => {

    const [allBlogs, setAllBlogs] = useState([]);
    
    useEffect(() => {
        fetchBlogs();
    }, []);

    // Fetch All blogs
    const fetchBlogs = async () => {

        let blogsList = [];        
        
        const queryRef = query(collection(db, 'blogs'), orderBy('date', 'desc'));
        const response = await getDocs(queryRef);

        response.forEach((doc) => {
            blogsList?.push({id: doc.id, ...doc.data()});
        });

        console.log('blogsList',blogsList);
        
        setAllBlogs(blogsList);
    }

    return (
        <React.Fragment>
            <div className="fb_home">
                <div className="fb_container">

                    <div className="fb_title-header">
                        <h1>Blogs</h1>
                    </div>

                    <div className="fb_blog-list">
                    {
                        allBlogs?.map(blog => {
                            return (
                                <BlogCard blogData={blog} key={blog?.id}/>
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
