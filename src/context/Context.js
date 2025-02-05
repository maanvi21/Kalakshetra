import React, { createContext, useContext, useReducer } from 'react';
//prepares the data layer
export const StateContext =createContext();

const Reducer=(state,action)=>{
  switch (action.type){
    case 'ADD_TO_WISHLIST':

    return { ...state, wishlist: [...state.wishlist, action.item] };

  case 'REMOVE_FROM_WISHLIST':
    return { 
      ...state, 
      wishlist: state.wishlist.filter((item) => item.id !== action.id) 
    };

  default :
  return state;
    
  }
}


//wraps our app and provides the data layer to the entire app
const Context = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, { wishlist: [] });

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
//pulls information from the data layer
export const useStateValue = () => useContext(StateContext);

export default Context;