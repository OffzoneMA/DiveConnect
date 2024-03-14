import React, { createContext } from 'react';

export const DivingCenterContext = createContext();

export const DivingCenterProvider = ({ children }) => {
  // Add your context provider logic here
  return <DivingCenterContext.Provider value={{}}>{children}</DivingCenterContext.Provider>;
};
