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
const AddBlog = lazy(() => import('./add'));
const Profile = lazy(() => import('./profile'));

const FireBlogs = () => {
    
	return (
        <React.Fragment>
            <div className="fb_layout">
                
                {/* Navbar */}
                <Navbar />
            
                <div className="fb_content">
                    {/* Content */}
                    <Suspense fallback={<div className="fb_preloader"><img src="/images/preloader.svg" alt="Loading..." /></div>}>

                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route exact path="/blog/add" element={<AddBlog />} />
                            <Route exact path="/blog/:id" element={<BlogDetail />} />

                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="/signup" element={<Signup />} />

                            <Route exact path="/profile" element={<Profile />} />
                        
                        </Routes>
                    </Suspense>
                
                </div>

                {/* Footer */}
                <Footer />
            </div>

        </React.Fragment>
	)
}

export default FireBlogs;
