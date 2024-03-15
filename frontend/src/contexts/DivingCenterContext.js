import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  divingCenters: [],
};

const divingCenterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DIVING_CENTERS':
      return {
        ...state,
        divingCenters: action.payload,
      };
    default:
      return state;
  }
};

export const DivingCenterContext = createContext();

export const useDivingCenters = () => useContext(DivingCenterContext); // Export useDivingCenters hook

export const DivingCenterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(divingCenterReducer, initialState);

  // Add your context provider logic here

  return (
    <DivingCenterContext.Provider value={{ state, dispatch }}>
      {children}
    </DivingCenterContext.Provider>
  );
};
