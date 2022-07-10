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
    return image || '/images/avatar.png';
}