/*
** Navbar
*/

import React from 'react';
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <React.Fragment>
            <nav className="navbar is-link">
                <div className="container">
                    <div className="navbar-brand"> 
                        <NavLink to={'/'} className="navbar-item">FireBlogs</NavLink> 
                    </div>

                    <div className="navbar-menu">
                        <div className="navbar-start">
                            <NavLink to={'/'} className="navbar-item">Home</NavLink> 
                            <NavLink to={'/about'} className="navbar-item">About</NavLink> 
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <NavLink to={'/create-account'} className="button is-dark"><strong>Sign up</strong></NavLink>
                                    <NavLink to={'/login'} className="button is-light">Log in</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Navbar;
