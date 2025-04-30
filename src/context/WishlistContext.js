import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

export const WishlistContext = createContext();

const initialState = { wishlist: [] };

const Reducer = (state, action) => {
  let newState;

  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      const exists = state.wishlist.find(item => item.id === action.item.id);
      if (exists) return state;

      const newItem = {
        ...action.item,
        title: action.item.title || action.item.name,
        name: action.item.name || action.item.title,
      };

      newState = { ...state, wishlist: [...state.wishlist, newItem] };
      console.log('Wishlist after adding:', newState.wishlist);
      return newState;

    case 'REMOVE_FROM_WISHLIST':
      newState = {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.id)
      };
      console.log('Wishlist after removing:', newState.wishlist);
      return newState;

    case 'REPLACE_WISHLIST':
      return {
        ...state,
        wishlist: Array.isArray(action.wishlist) ? action.wishlist : []
      };

    default:
      return state;
  }
};

const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(Reducer, initialState);

  // Load wishlist from localStorage after user is defined
  useEffect(() => {
    if (user) {
      try {
        const saved = localStorage.getItem(`wishlist_${user.id}`);
        if (saved) {
          dispatch({ type: 'REPLACE_WISHLIST', wishlist: JSON.parse(saved) });
        }
      } catch (err) {
        console.error('Failed to load wishlist:', err);
      }
    }
  }, [user]);

  // Save wishlist when it changes
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(state.wishlist));
      } catch (error) {
        console.error('Error saving wishlist:', error);
      }
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
