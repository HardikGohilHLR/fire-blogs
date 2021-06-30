/*
** Home
*/

import React, { useState, useEffect } from 'react'
import BlogCard from '../components/blog-card'
import fire from '../firebase.config';

const Home = () => {
    const db = fire.firestore();
    const [allBlogs, setAllBlogs] = useState([]);
    
    useEffect(() => {
        fetchBlogs();
    }, []);

    // Fetch All blogs
    const fetchBlogs = async () => {
        const response = db.collection('blogs');
        const data = await response.get();
        let allBlogsData = [];
        data.forEach(doc => {
            allBlogsData.push({...doc.data(), _id: doc?.id});
        });     
        setAllBlogs(allBlogsData);
    }

    return (
        <React.Fragment>
            <div className="fb-home">
                <div className="fb-title mb-4">
                    <h1 className="is-size-3 has-text-weight-semibold">Blogs</h1>
                </div>

                <div className="fb-all-blogs"> 
                    <div className="columns is-multiline is-variable is-4">
                        {
                            allBlogs?.map(blog => {
                                return <div className="column is-3" key={blog?._id}>
                                    <BlogCard blogData={blog}/>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home
