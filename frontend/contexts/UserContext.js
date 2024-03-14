import React, { createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Add your context provider logic here
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};
