/*
** Home
*/

import React, { useState, useEffect } from 'react';

import BlogCard from '../../components/blog-card';

// Firebase
import { db, collection, getDocs, query, orderBy } from '../../firebase.config';

const Home = () => {

    const [allBlogs, setAllBlogs] = useState([...Array(10).fill('')]);
    const [dataLoading, setDataLoading] = useState(true);
    
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
        
        setAllBlogs(blogsList);
        setDataLoading(false);
    }

    return (
        <React.Fragment>
            <div className="fb_home">
                <div className="fb_container">

                    <div className="fb_title-header">
                        <h1>Blogs</h1>
                    </div>

                    {
                        allBlogs?.length !== 0 ?
                        <div className="fb_blog-list">
                            {
                                allBlogs?.map(blog => {
                                    return (
                                        <BlogCard blogData={blog} key={blog?.id} dataLoading={dataLoading} />
                                    )
                                })
                            }
                        </div>
                        :
                        <h4 className="fb_text-center pb-40 pt-30">No Data Found.</h4>
                    }

                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;
