import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [triggerEffect, setTriggerEffect] = useState(false);

    return (
        <AppContext.Provider value={{ triggerEffect, setTriggerEffect }}>
            {children}
        </AppContext.Provider>
    );
};