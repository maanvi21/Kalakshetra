import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const initialState = { wishlist: [] };
export const WishlistContext = createContext();

const Reducer = (state, action) => {
  let newState;

  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const exists = state.wishlist.find(item => item._id === action.item._id);
      if (exists) return state;

      const newItem = {
        ...action.item,
        title: action.item.title || action.item.name,
        name: action.item.name || action.item.title,
      };
      newState = { ...state, wishlist: [...state.wishlist, newItem] };
      return newState;
    }
    case 'REMOVE_FROM_WISHLIST': {
      newState = { ...state, wishlist: state.wishlist.filter(item => item._id !== action._id) };
      return newState;
    }
    case 'REPLACE_WISHLIST': {
      return { ...state, wishlist: Array.isArray(action.wishlist) ? action.wishlist : [] };
    }
    default:
      return state;
  }
};

const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    if (user) {
      const savedWishlist = localStorage.getItem(`wishlist_${user._id}`);
      if (savedWishlist) {
        dispatch({ type: 'REPLACE_WISHLIST', wishlist: JSON.parse(savedWishlist) });
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist_${user._id}`, JSON.stringify(state.wishlist));
    }
  }, [state.wishlist, user]);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useStateValue = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    console.error('useStateValue must be used within a WishlistProvider');
    return { state: initialState, dispatch: () => null };
  }
  return context;
};

export default WishlistProvider;
