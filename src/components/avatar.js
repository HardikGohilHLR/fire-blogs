// Avatar
import React from 'react';

import { getUserImage } from '../common/functions';

const Avatar = ({user, size}) => {
    return (
        <React.Fragment>
            
            <div className="fb_user-avatar" style={{ width: `${size}px`, height: `${size}px` }}>
                <img src={getUserImage(user?.profileImage)} alt="Placeholder" />
            </div>

        </React.Fragment>
    )
}

export default Avatar;