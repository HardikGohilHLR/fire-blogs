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
            console.log('action?.payload?.userInfo', action?.payload?.userInfo);
            const { email } = action?.payload?.userInfo;
            
            return { 
                ...state, 
                userInfo: {
                    ...state.userInfo,
                    email: email
                }
            };
        case 'LOGIN': 
            return { ...state, ...action.payload };
        case 'LOGOUT': 
            return {};
        default:
            return;
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
