/*
** Blog Card
*/
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fire from '../firebase.config';

const BlogCard = (props) => {  
    const db = fire.firestore();
    const history = useHistory();     

    const [user, setUser] = useState({});
    
    useEffect(() => {
        getUserName(props?.blogData?.user);
    }, [props?.blogData])
    
    const getUserName = async (userId) => {
        const response = db.collection('users');     
        const data = await response.where('id', '==' , userId).get();  
        data?.forEach(doc => setUser(doc.data()));  
    }
    
    const viewBlog = () => {
        history.push(`/blog/${props?.blogData?._id}`);
    }
    
    return (
        <React.Fragment>
            <div className="card is-clickable" onClick={viewBlog}>
                <div className="card-image">
                    <figure className="image is-2by1">
                        <img src={props?.blogData?.blogImage} alt="Placeholder" />
                    </figure>
                </div>
                <div className="card-content p-4">
                    <div className="media mb-3 is-flex is-align-items-center">
                        <div className="media-left">
                            <figure className="image is-32x32">
                                <img src={user?.image ? user.image : 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png'} alt="Placeholder" className="is-rounded" style={{ 'height': '100%' }} />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-6">{user?.username}</p>
                        </div>
                    </div>

                    <div className="content">
                        <h3 className="is-size-5 ellipsis is-ellipsis-1">{ props?.blogData?.title }</h3>
                        <p className="ellipsis is-ellipsis-2">{ props?.blogData?.content }</p>                    
                        <p className="title is-7">
                            { props?.blogData?.date?.toDate().toLocaleDateString(undefined, {
                                weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) 
                            }
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BlogCard;