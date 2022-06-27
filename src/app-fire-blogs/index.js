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
    // const auth = fire.auth();
    // const db = fire.firestore();

    // const [user, setUser] = useState(true);

    // useEffect(() => {
    //     auth.onAuthStateChanged(user => {
    //         setUser(user);  
    //         if(user?.uid)  { 
    //             fetchUser(user) 
    //         } else {
    //             setUser(false);
    //         }
    //     });          
    // }, []);

    // Fetch All blogs
    // const fetchUser = async (user) => { 
    //     const response = db.collection('users');  
    //     const id = user?.uid;
    //     if(id) {
    //         const data = await response.where('id', '==' , user?.uid).get();  
    //         data?.forEach(doc => { 
    //             setUser({...user, ...doc.data()});
    //         });      
    //     }
    // }

    // const userLogOut = () => {
    //     auth.signOut();
    //     setUser('');
    // }

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
