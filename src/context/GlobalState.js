import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Create CTX
export const GloablContext = createContext(initialState);

export const GlobalProvier = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    return (
        <GloablContext.Provider>
            { children }
        </GloablContext.Provider>
    );
}