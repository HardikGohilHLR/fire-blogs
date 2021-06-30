/*
** Main Component
*/

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Navbar from "../components/navbar";
import Home from './home';
import About from './about';
import Login from './auth/login';
import Signup from './auth/signup';

const FireBlogs = () => {
	return (
        <React.Fragment>
            <Router>
                <Navbar/>

                <Switch>
                    <div className="container px-4 py-5">
                        <Route exact path="/" component={Home} />  
                        <Route exact path="/about" component={About} />  
                        <Route exact path="/login" component={Login} />  
                        <Route exact path="/create-account" component={Signup} />  
                    </div>
                </Switch>

            </Router>
        </React.Fragment>
	)
}

export default FireBlogs;
