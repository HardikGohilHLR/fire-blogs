/*
** Main Component
*/

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Navbar from "../components/navbar";
import Home from './home';
import About from './about';

const FireBlogs = () => {
	return (
        <React.Fragment>
            <Router>
                <Navbar/>

                <Switch>
                    <div className="container px-4 py-5">
                        <Route exact path="/" component={Home} />  
                        <Route exact path="/about" component={About} />  
                    </div>
                </Switch>

            </Router>
        </React.Fragment>
	)
}

export default FireBlogs;
