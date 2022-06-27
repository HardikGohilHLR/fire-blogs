/*
** Main Component
*/

import React, { lazy } from 'react';

import { Route, Routes } from "react-router-dom";
import Footer from '../components/footer';

// Components
import Navbar from "../components/navbar";

// Routes
const Home = lazy(() => import('./home'));
const BlogDetail = lazy(() => import('./blog-detail'));

// import Login from './auth/login';
// import Signup from './auth/signup';
// import Profile from './user/profile';
// import AddBlog from './add-blog';
// import BlogDetail from './blog-detail';
// import BlogList from './admin/blog-list';

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
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/blog/:id" element={<BlogDetail />} />
            </Routes>

            {/* Footer */}
            <Footer />
        </React.Fragment>
	)
}

export default FireBlogs;
