/*
** Navbar
*/

import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from "react-router-dom";

const Navbar = (props) => {
    const location = useLocation();
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


    console.log(props?.userData);
    return (
        <React.Fragment>
            <nav className="navbar is-link">
                <div className="container">
                    <div className="navbar-brand"> 
                        <NavLink to={'/'} className="navbar-item">FireBlogs</NavLink> 
                        
                        <a className={`navbar-burger ${navbarToggle ? 'is-active' : ''}`} data-target="navMenu" aria-label="menu" aria-expanded="false" onClick={toggleNavbar}>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div className={`navbar-menu ${navbarToggle ? 'is-active' : ''}`}>
                        <div className="navbar-start"> 
                        {
                            props?.userData?.isAdmin && 
                            <NavLink exact activeClassName="is-active" to={'/blog/add'} className="navbar-item">Add Blog</NavLink> 
                        }
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item is-flex is-align-items-center">
                                {
                                    props &&
                                        <>{
                                            props?.userData ?
                                                <>
                                                <p>{props?.userData?.username}</p> 
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
                            </div>
                        </div>
                    </div>
                
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Navbar;
