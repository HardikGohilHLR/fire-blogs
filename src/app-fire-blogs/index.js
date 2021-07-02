/*
** Main Component
*/

import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
import fire from '../firebase.config';

// Components
import Navbar from "../components/navbar";
import Home from './home';
import Login from './auth/login';
import Signup from './auth/signup';
import AddBlog from './add-blog';

const FireBlogs = () => {
    const auth = fire.auth();
    const db = fire.firestore();

    const [user, setUser] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user); 
            if(user?.uid) fetchUser(user);
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
                    <Route exact path="/" component={Home} />   
                    <Route exact path="/login" component={Login} />  
                    <Route exact path="/create-account" component={Signup} />  
                    <Route exact path="/blog/add" render={(props) => <AddBlog userInfo={user} {...props} />} />  
                </Switch>

            </Router>
        </React.Fragment>
	)
}

export default FireBlogs;
