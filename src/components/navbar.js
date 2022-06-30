/*
** Navbar
*/
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useFireContext } from '../app-fire-blogs/fire-context';

import { auth, signOut } from '../firebase.config'; 

const Navbar = () => {
    const navigate = useNavigate();

    const _USER = useFireContext(e => e?.userInfo);
    
    const logout = () => {
        signOut(auth).then(() => {
            navigate('/login');
        });
    }
    
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
                                {                                        
                                    _USER?.email ? 
                                    <>
                                        <p>{_USER?.email}</p>  
                                        <button className="fb_btn fb_btn__white" onClick={logout}> Logout </button> 
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
