// App

import React, { useEffect } from 'react';

import AppFireBlogs from "./app-fire-blogs";

import { useFireUpdateContext } from './app-fire-blogs/fire-context';

// Firebase
import { auth, onAuthStateChanged } from './firebase.config';

const App = () => {

    const dispatch = useFireUpdateContext();

    useEffect(() => { 
        onAuthStateChanged(auth, (user) => {
            dispatch({type: 'SET_USERINFO', payload: { userInfo: user }});
        });
    }, [dispatch]);

	return (
        <React.Fragment>
		    <AppFireBlogs />
        </React.Fragment>
	)
}

export default App;
