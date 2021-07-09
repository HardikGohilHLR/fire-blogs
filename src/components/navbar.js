/*
** Navbar
*/

import React, { useState, useEffect } from 'react';
import { useLocation, NavLink, useHistory } from "react-router-dom";
import fire from '../firebase.config';

const Navbar = (props) => {
    const db = fire.firestore();
    const location = useLocation();
    const history = useHistory();
    const [navbarToggle, setNavbarToggle] = useState(false);
    
    const [user, setUser] = useState(false);

    useEffect(() => {
        setNavbarToggle(false); 
    }, [location]);

    useEffect(async () => {              
        const response = db.collection('users').doc(props?.userData?.uid);
        const data = await response.get(); 
        if(data.data()) {
            setUser({
                ...user,
                id: data?.id,
                username: data.data()?.username,
                email: data.data()?.email,
                isAdmin: data.data()?.isAdmin,
                image: data.data()?.image
            });
        }
    }, [props?.userData]);

    const logout = () => {
        props?.userLogOut();
        setUser(false);
    } 

    const toggleNavbar = () => {
        setNavbarToggle(!navbarToggle);
    }

    const userProfile = () => {
        history.push(`/profile/${user?.id}`);
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
                            user?.isAdmin && 
                            <NavLink exact activeClassName="is-active" to={'/blog/add'} className="navbar-item">Add Blog</NavLink> 
                        }
                        </div>

                        <div className="navbar-end is-align-items-center pl-2">
                            {
                                props &&
                                    <>{
                                        user ?
                                            <> 
                                            <div className="is-flex is-align-items-center mr-4" style={{ cursor: 'pointer' }} onClick={userProfile}>
                                                <figure className="image is-32x32 mr-3">
                                                    <img className="is-rounded" style={{height: '100%'}} src={user?.image ? user?.image : 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png' } />

                                                </figure>
                                                <p>{user?.username}</p> 
                                            </div>

                                            <button onClick={logout} className="button is-dark">Sign Out</button>
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
            </nav>
        </React.Fragment>
    )
}

export default Navbar;
