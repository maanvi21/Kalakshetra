import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

const initialState = { wishlist: [] };
export const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
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
  const authContext = useContext(AuthContext);
  const user = authContext?.user; // Extract user directly
  
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);

  // Load wishlist when user changes
  useEffect(() => {
    const userEmail = user?.email;
    
    // Only reload if the email has actually changed
    if (userEmail !== currentUserEmail) {
      console.log("Loading wishlist for user:", userEmail || "guest");
      setCurrentUserEmail(userEmail);
      
      const wishlistKey = userEmail ? `wishlist_${userEmail}` : "wishlist_guest";
      const savedWishlist = localStorage.getItem(wishlistKey);
      
      if (savedWishlist) {
        try {
          const parsedWishlist = JSON.parse(savedWishlist);
          console.log("Found saved wishlist with", parsedWishlist.length, "items");
          dispatch({ type: 'REPLACE_WISHLIST', wishlist: parsedWishlist });
        } catch (error) {
          console.error('Error parsing wishlist data:', error);
          dispatch({ type: 'REPLACE_WISHLIST', wishlist: [] });
        }
      } else {
        console.log("No saved wishlist found for", wishlistKey);
        dispatch({ type: 'REPLACE_WISHLIST', wishlist: [] });
      }
    }
  }, [user, currentUserEmail]);

  // Save wishlist when it changes
  useEffect(() => {
    if (state.wishlist && (state.wishlist.length > 0 || currentUserEmail !== null)) {
      const wishlistKey = currentUserEmail ? `wishlist_${currentUserEmail}` : "wishlist_guest";
      
      console.log("Saving wishlist with", state.wishlist.length, "items for", wishlistKey);
      localStorage.setItem(wishlistKey, JSON.stringify(state.wishlist));
    }
  }, [state.wishlist, currentUserEmail]);

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