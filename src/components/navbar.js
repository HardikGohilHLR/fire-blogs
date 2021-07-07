/*
** Navbar
*/

import React, { useState, useEffect } from 'react';
import { useLocation, NavLink, useHistory } from "react-router-dom";

const Navbar = (props) => {
    const location = useLocation();
    const history = useHistory();
    const [navbarToggle, setNavbarToggle] = useState(false);

    useEffect(() => {
        setNavbarToggle(false); 
    }, [location]);

    const logout = () => {
        props?.userLogOut();
    } 

    const toggleNavbar = () => {
        setNavbarToggle(!navbarToggle);
    }

    const userProfile = () => {
        history.push(`/profile/${props?.userData?.uid}`);
    }

    return (
        <React.Fragment>
            <nav className="navbar is-link">
                <div className="container">
                    <div className="navbar-brand"> 
                        <NavLink to={'/'} className="navbar-item">FireBlogs</NavLink> 
                        
                        <button className={`navbar-burger ${navbarToggle ? 'is-active' : ''}`} data-target="navMenu" aria-label="menu" aria-expanded="false" onClick={toggleNavbar}>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </button>
                    </div>

                    <div className={`navbar-menu ${navbarToggle ? 'is-active' : ''}`}>
                        <div className="navbar-start"> 
                        {
                            props?.userData?.isAdmin && 
                            <NavLink exact activeClassName="is-active" to={'/blog/add'} className="navbar-item">Add Blog</NavLink> 
                        }
                        </div>

                        <div className="navbar-end is-align-items-center">
                            {/* <div className="is-flex is-align-items-center"> */}
                                {
                                    props &&
                                        <>{
                                            props?.userData ?
                                                <> 
                                                <div className="is-flex is-align-items-center" style={{ cursor: 'pointer' }} onClick={userProfile}>
                                                    <figure className="image is-32x32 mr-3">
                                                        <img className="is-rounded" src="https://bulma.io/images/placeholders/32x32.png" alt="user" title="user" />
                                                    </figure>
                                                    <p>{props?.userData?.username}</p> 
                                                </div>

                                                <button onClick={logout} className="button is-dark ml-4">Sign Out</button>
                                                </>
                                            :
                                            <div className="buttons">
                                                <NavLink to={'/create-account'} className="button is-dark"><strong>Sign up</strong></NavLink>
                                                <NavLink to={'/login'} className="button is-light">Log in</NavLink>
                                            </div>
                                        }
                                    </>
                                }
                            {/* </div> */}
                        </div>
                    </div>
                
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Navbar;
