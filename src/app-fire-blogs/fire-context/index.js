// Context
import React, { createContext, useContext, useReducer } from 'react';

const FireContext = createContext();
const FireUpdateContext = createContext();

// State
const initialState = {
    userInfo: null,
};

// Reducer
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERINFO': 
            return { 
                ...state, 
                userInfo: {
                    ...state.userInfo,
                    _id: action?.payload?.userInfo?.userId,
                    id: action?.payload?.userInfo?.uid,
                    email: action?.payload?.userInfo?.email,
                    username: action?.payload?.userInfo?.username,
                    profileImage: action?.payload?.userInfo?.profileImage,
                }
            };
        case 'LOGIN': 
            return { ...state, ...action.payload };
        case 'LOGOUT': 
            return {};
        default:
            return state;
    }
}

// Use context
export const useFireContext = (cb) => {
    return cb(useContext(FireContext));
}

export const useFireUpdateContext = () => {
    return useContext(FireUpdateContext);
}

// Provider
export const FireContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(loginReducer, initialState);

    return (
        <FireContext.Provider value={state}>
            <FireUpdateContext.Provider value={dispatch}>
                {children}
            </FireUpdateContext.Provider>
        </FireContext.Provider>
    )
}
