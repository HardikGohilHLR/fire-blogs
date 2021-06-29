/*
** Blog Card
*/
import React from 'react';

const BlogCard = (props) => {
    console.log(props?.blogData)
    return (
        <React.Fragment>
            <div className="card">
                <div className="card-image">
                    <figure className="image is-16by9">
                        <img src={`https://loremflickr.com/320/240?random=${props?.blogData?._id}`} alt="Placeholder" />
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
                        <p className="title is-7">11:09 PM - 1 Jan 2016</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BlogCard;