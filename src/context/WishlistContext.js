
import React, { createContext, useContext, useReducer, useState} from 'react';
//prepares the data layer
export const WishlistContext =createContext();




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
const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, { wishlist: [] });

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};
//pulls information from the data layer
export const useStateValue = () => useContext(WishlistContext);

export default WishlistProvider;