import React, { createContext,useContext } from 'react'
//prepares the data layer
export const StateContext =createContext();
//wraps our app and provides the data layer to the entire app
const Context = ({reducer,initialState,children}) => {
  return (
    <StateContext.Provider>
      {children}
    </StateContext.Provider>
  )
};
//pulls information from the data layer
export const useStateValue= () => useContext(StateContext);
export default Context;