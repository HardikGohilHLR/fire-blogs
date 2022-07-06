// Common Functions

import moment from 'moment';

export const getCookie = (name) => {
    return (document.cookie.match('(^|;) *'+name+'=([^;]*)')||[])[2];
}

export const formatDate = (date, format) => {
    return moment(date).format(format);
}

// Get user image
export const getUserImage = (image) => {
    return image || 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png';
}