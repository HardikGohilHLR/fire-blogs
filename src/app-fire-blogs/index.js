/*
** Main Component
*/

import React, { lazy, Suspense } from 'react';

import { Route, Routes } from "react-router-dom";
import Footer from '../components/footer';

// Components
import Navbar from "../components/navbar";

// Routes
const Home = lazy(() => import('./home'));
const BlogDetail = lazy(() => import('./blog-detail'));
const Login = lazy(() => import('./auth/login'));
const Signup = lazy(() => import('./auth/signup'));

const FireBlogs = () => {
    
	return (
        <React.Fragment>
            
            {/* Navbar */}
            <Navbar />
            
            {/* Content */}
            <Suspense fallback={<p>loading</p>}>

                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/blog/:id" element={<BlogDetail />} />

                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                
                </Routes>
            </Suspense>

            {/* Footer */}
            <Footer />
        </React.Fragment>
	)
}

export default FireBlogs;
