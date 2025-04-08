import React, { createContext, useContext, useReducer, useEffect } from 'react';

export const WishlistContext = createContext();

const Reducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      // Check if item already exists
      const existingItem = state.wishlist.find(item => item.id === action.item.id);
      
      if (existingItem) {
        // Item already exists, no need to add again
        return state;
      } else {
        // Ensure item has all needed properties
        const newItem = {
          ...action.item,
          title: action.item.title || action.item.name, // Handle both title and name
          name: action.item.name || action.item.title,  // Include both for compatibility
        };
        
        newState = {
          ...state,
          wishlist: [...state.wishlist, newItem]
        };
      }
      console.log('Wishlist after adding item:', newState.wishlist);
      return newState;
    
    case 'REMOVE_FROM_WISHLIST':
      newState = {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.id)
      };
      console.log('Wishlist after removing item:', newState.wishlist);
      return newState;
    
    default:
      return state;
  }
};

const WishlistProvider = ({ children }) => {
  // Initialize with data from localStorage if available
  const getInitialState = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? { wishlist: JSON.parse(savedWishlist) } : { wishlist: [] };
  };
  
  const [state, dispatch] = useReducer(Reducer, getInitialState());
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    console.log('Current wishlist state saved to localStorage:', state.wishlist);
  }, [state.wishlist]);
  
  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useStateValue = () => useContext(WishlistContext);

export default WishlistProvider;