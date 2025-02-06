import React, { createContext, useContext, useReducer, useState} from 'react';
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
//   Auth provider
  const [user, setUser] = useState(null);

  const login = (userData) => {
      setUser(userData);
  };

  const logout = () => {
      setUser(null);
      localStorage.removeItem("token");
  };
  return (
    <StateContext.Provider value={{ state, dispatch,user, login, logout }}>
      {children}
    </StateContext.Provider>
  );
};
//pulls information from the data layer
export const useStateValue = () => useContext(StateContext);

export default Context;