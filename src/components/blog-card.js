/*
** Blog Card
*/
import React from 'react';

const BlogCard = (props) => {
    
    return (
        <React.Fragment>
            <div className="card">
                <div className="card-image">
                    <figure className="image is-16by9">
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                    </figure>
                </div>
                <div className="card-content p-4">
                    <div className="media mb-3 is-flex is-align-items-center">
                        <div className="media-left">
                            <figure className="image is-32x32">
                                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" className="is-rounded"/>
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-6">John Smith</p>
                        </div>
                    </div>

                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.</p>                    
                        <p className="title is-7">11:09 PM - 1 Jan 2016</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BlogCard;