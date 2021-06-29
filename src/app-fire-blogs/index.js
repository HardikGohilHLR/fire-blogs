import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
  
import Navbar from "../components/navbar";
import Home from './home';
import About from './about';

const FireBlogs = () => {
	return (
        <React.Fragment>
            <Router>
                <Navbar/>
                
                <Switch>
                    <Route exact path="/" component={Home} />  
                    <Route exact path="/about" component={About} />  
                </Switch>

            </Router>
        </React.Fragment>
	)
}

export default FireBlogs;
