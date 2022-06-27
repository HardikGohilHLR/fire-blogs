/*
** Navbar
*/
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFireContext } from '../app-fire-blogs/fire-context';

const Navbar = () => {

    const _USER = useFireContext(e => e);

    console.log('_USER', _USER);
    
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
                                _USER ? 
                                <p>{_USER?.userInfo?.email}</p>
                                :
                                <div className="fb_header-btns">
                                    <Link to="/login" className="fb_btn fb_btn__theme"> Login </Link> 
                                    <Link to="/signup" className="fb_btn fb_btn__white"> Signup </Link> 
                                </div>
                            }
                        </nav>
                    </div>

                </div>
            </header>
            
        </React.Fragment>
    )
}

export default Navbar;
