/*
** Navbar
*/
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    
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
                            <div className="fb_header-btns">
                                <Link to="/login" className="fb_btn fb_btn__theme"> Login </Link> 
                                <Link to="/signup" className="fb_btn fb_btn__white"> Signup </Link> 
                            </div>
                        </nav>
                    </div>

                </div>
            </header>
            
        </React.Fragment>
    )
}

export default Navbar;
