/*
** Home
*/

import React, { useState } from 'react'
import BlogCard from '../components/blog-card'

const Home = () => {

    const [allBlogs, setAllBlogs] = useState([ { _id: 1 }, { _id: 2 }, { _id: 3 }, { _id: 4 }, { _id: 5 }, { _id: 6 }, { _id: 7 }, { _id: 8 }, ]);

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
                                    <BlogCard blog={blog}/>
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
