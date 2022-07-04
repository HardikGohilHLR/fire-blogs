/*
** Navbar
*/
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useFireContext } from '../app-fire-blogs/fire-context';
import { useOutsideClick } from '../common/hooks/useOusideClick';

import { auth, signOut } from '../firebase.config'; 
import Avatar from './avatar';

const Navbar = () => {

    const navigate = useNavigate();
    const optionsRef = useRef();
    const location = useLocation();

    const _USER = useFireContext(e => e?.userInfo);

    useEffect(() => {
        setUserOptions(false);
    }, [location]);    

    const [userOptions, setUserOptions] = useState(false);
    
    const logout = () => {
        signOut(auth).then(() => {
            navigate('/login');
        });
    }
    
    useOutsideClick(optionsRef, () => { setUserOptions(false); });
    
    return (
        <React.Fragment>
            <header>
                <div className="fb_container">
                    <div className="fb_header">

                        <div className="fb_header-logo">
                            <Link to="/">
                                <img src="/images/fireblogs.svg" alt="Fireblogs" title="Fireblogs"/>    
                            </Link> 
                        </div>
                        
                        <nav>                            
                            {
                                _USER?.email &&
                                <div className="fb_user-info" ref={optionsRef}>

                                    <div className="fb_user-info__desc" onClick={() => setUserOptions(!userOptions)}>

                                        <Avatar user={_USER} />

                                        <div className="fb_user-info__details">
                                            <p className="fb_ellipsis fb_ellipsis-1">{_USER?.username || 'John Doe'}</p>
                                            <span className="fb_ellipsis fb_ellipsis-1">{_USER?.email}</span>
                                        </div>

                                    </div>

                                    {
                                        userOptions &&
                                        <div className="fb_user-info-options">
                                            <ul>
                                                <li>
                                                    <Link to="/profile">Profile</Link>
                                                </li>
                                                <li onClick={logout}>
                                                    <span>Logout</span>
                                                </li>
                                            </ul>
                                        </div>
                                    }
                                </div>
                            }
                            <div className="fb_header-btns">
                                {                                        
                                    _USER?.email ? 
                                    <>
                                        <Link to="/blog/add" className="fb_btn fb_btn__theme"> Add Blog </Link> 
                                    </>
                                    :
                                    <>
                                        <Link to="/login" className="fb_btn fb_btn__theme"> Login </Link> 
                                        <Link to="/signup" className="fb_btn fb_btn__white"> Signup </Link> 
                                    </>
                                }
                            </div>                            
                        </nav>
                    </div>

                </div>
            </header>
            
        </React.Fragment>
    )
}

export default Navbar;
