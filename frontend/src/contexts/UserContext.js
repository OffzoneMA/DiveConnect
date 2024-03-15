import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  users: [],
};

const userReducer = (state, action) => {
  switch (action.type) {
    // Add your reducer logic here if needed
    default:
      return state;
  }
};

export const UserContext = createContext();

export const useUsers = () => useContext(UserContext); // Export useUsers hook

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Add your context provider logic here

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};