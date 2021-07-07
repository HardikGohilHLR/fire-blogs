/*
** Blog Card
*/
import React from 'react';
import { useHistory } from 'react-router-dom';

const BlogCard = (props) => {  
    const history = useHistory();

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
                                <img src={`https://i.pravatar.cc/150?img=${props?.blogData?.user}`} alt="Placeholder" className="is-rounded"/>
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-6">John Smith</p>
                        </div>
                    </div>

                    <div className="content">
                        <h3 className="is-size-5 ellipsis is-ellipsis-1">{ props?.blogData?.title }</h3>
                        <p className="ellipsis is-ellipsis-2">{ props?.blogData?.content }</p>                    
                        <p className="title is-7">
                            { props?.blogData?.date.toDate().toLocaleDateString(undefined, {
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