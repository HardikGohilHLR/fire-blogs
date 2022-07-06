// App

import React, { useEffect } from 'react';

import AppFireBlogs from "./app-fire-blogs";

import { useFireUpdateContext } from './app-fire-blogs/fire-context';

// Firebase
import { auth, onAuthStateChanged, db, getDocs, collection, where, query } from './firebase.config';

const App = () => {

    const dispatch = useFireUpdateContext();

    useEffect(() => { 
        onAuthStateChanged(auth, async (user) => {
            const queryResult = query(collection(db, 'users'), where("id", "==", user?.uid));

            const result = await getDocs(queryResult);
            result.forEach((doc) => {
                dispatch({type: 'SET_USERINFO', payload: { userInfo: {...user, ...doc.data()} }});
            });
        });
    }, [dispatch]);

	return (
        <React.Fragment>
		    <AppFireBlogs />
        </React.Fragment>
	)
}

export default App;
