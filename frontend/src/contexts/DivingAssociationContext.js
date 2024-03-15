import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  divingAssociations: [],
};

const divingAssociationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DIVING_ASSOCIATIONS':
      return {
        ...state,
        divingAssociations: action.payload,
      };
    default:
      return state;
  }
};

export const DivingAssociationContext = createContext();

export const useDivingAssociations = () => useContext(DivingAssociationContext); // Export useDivingAssociations hook

export const DivingAssociationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(divingAssociationReducer, initialState);

  // Add your context provider logic here

  return (
    <DivingAssociationContext.Provider value={{ state, dispatch }}>
      {children}
    </DivingAssociationContext.Provider>
  );
};
