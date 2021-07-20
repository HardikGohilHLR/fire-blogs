/*
** Main Component
*/

import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom"; 
import fire from '../firebase.config';

// Components
import Navbar from "../components/navbar";
import Home from './home';
import Login from './auth/login';
import Signup from './auth/signup';
import Profile from './user/profile';
import AddBlog from './add-blog';
import BlogDetail from './blog-detail';
import BlogList from './admin/blog-list';

const FireBlogs = () => {
    const auth = fire.auth();
    const db = fire.firestore();

    const [user, setUser] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user);  
            if(user?.uid)  { 
                fetchUser(user) 
            } else {
                setUser(false);
            }
        });          
    }, []);

    // Fetch All blogs
    const fetchUser = async (user) => { 
        const response = db.collection('users');  
        const id = user?.uid;
        if(id) {
            const data = await response.where('id', '==' , user?.uid).get();  
            data?.forEach(doc => { 
                setUser({...user, ...doc.data()});
            });      
        }
    }

    const userLogOut = () => {
        auth.signOut();
        setUser('');
    }

	return (
        <React.Fragment>
            <Router>
                <Navbar userData={user} userLogOut={userLogOut} />

                <Switch>       
                    <Route exact path="/" render={(props) => <Home userInfo={user} {...props} />} />       
                    <Route exact path="/login" render={props => ( !user ? <Login userInfo={user} {...props} /> : <Redirect to="/" /> )} />
                    <Route exact path="/create-account" render={props => ( !user ? <Signup userInfo={user} {...props} /> : <Redirect to="/" /> )} />
                    <Route exact path="/blog/add" render={props => ( user ? <AddBlog userInfo={user} {...props} /> : <Redirect to="/" /> )} />
                    <Route exact path="/profile/:id" render={props => ( user ? <Profile userInfo={user} {...props} /> : <Redirect to="/login" /> )} />
                    <Route exact path="/blog/:id" render={props => <BlogDetail userInfo={user} {...props} />} />

                    {/* Admin */}
                    <Route exact path="/blog-list" render={props => ( user ? <BlogList userInfo={user} {...props} /> : <Redirect to="/login" /> )} />
                    
                </Switch>

            </Router>
        </React.Fragment>
	)
}

export default FireBlogs;
