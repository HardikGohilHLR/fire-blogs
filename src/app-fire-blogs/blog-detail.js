/*
** Blog page
*/

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fire from '../firebase.config';

const BlogDetail = (props) => {
    const db = fire.firestore();
    const params = useParams();

    const [blog, setBlog] = useState('');

    useEffect(() => {
       getBlog();
    }, []);

    const getBlog = async () => {  
        const response = db.collection('blogs').doc(params?.id);
        const data = await response.get();  
        setBlog(data.data());
    }

    return (
        <React.Fragment>            
            <div className="fb-profile">
                <div className="container px-4 py-5"> 
                    <h1 className="is-size-2 has-text-weight-semibold mb-5">{blog?.title}</h1>
                    {
                        blog?.blogImage &&
                        <div className="columns is-mobile mb-5">
                            <div className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop">    
                                <figure className="image is-2by1">
                                    <img src={blog?.blogImage} alt={blog?.title} title={blog?.title}/>
                                </figure>
                            </div>
                        </div>
                    }
                    <p>{blog?.content}</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BlogDetail;
