/*
** Main Component
*/

import React, { lazy } from 'react';

import { Route, Routes } from "react-router-dom"; 

// Components
// import Navbar from "../components/navbar";

const Home = lazy(() => import('./home/home'));

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
            
            {/* <Navbar userData={user} userLogOut={userLogOut} /> */}
            
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
        </React.Fragment>
	)
}

export default FireBlogs;
