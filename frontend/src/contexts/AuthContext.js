import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Example: State to hold user information

  // Example login function
  const login = async (email, password) => {
    // Perform login operation, set user state, etc.
    // Example:
    setUser({ email }); // Just an example, replace with actual login logic
  };

  // Example logout function
  const logout = async () => {
    // Perform logout operation, clear user state, etc.
    setUser(null); // Just an example, replace with actual logout logic
  };

  // Value to be provided by the context
  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
