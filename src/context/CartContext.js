import React, { createContext, useContext, useState, useReducer, useEffect } from 'react';
import { AuthContext } from './AuthContext';

const DEFAULT_STATE = { cart: [] };

export const CartContext = createContext({
  state: DEFAULT_STATE,
  dispatch: () => null,
});

const cartReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item._id === action.item._id);
      if (existingItem) {
        newState = {
          ...state,
          cart: state.cart.map(item =>
            item._id === action.item._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        const newItem = {
          ...action.item,
          quantity: action.item.quantity || 1,
        };
        newState = { ...state, cart: [...state.cart, newItem] };
      }
      return newState;
    }
    case 'REMOVE_FROM_CART': {
      newState = { ...state, cart: state.cart.filter(item => item._id !== action._id) };
      return newState;
    }
    case 'UPDATE_QUANTITY': {
      newState = {
        ...state,
        cart: state.cart.map(item =>
          item._id === action._id
            ? { ...item, quantity: action.quantity }
            : item
        )
      };
      return newState;
    }
    case 'CLEAR_CART': {
      return { ...state, cart: [] };
    }
    case 'REPLACE_CART': {
      return { ...state, cart: action.cart };
    }
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user; // Extract user directly
  
  const [state, dispatch] = useReducer(cartReducer, DEFAULT_STATE);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);

  // Load cart when user changes
  useEffect(() => {
    const userEmail = user?.email;
    
    // Only reload if the email has actually changed
    if (userEmail !== currentUserEmail) {
      console.log("Loading cart for user:", userEmail || "guest");
      setCurrentUserEmail(userEmail);
      
      const cartKey = userEmail ? `cart_${userEmail}` : "cart_guest";
      const savedCart = localStorage.getItem(cartKey);
      
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          console.log("Found saved cart with", parsedCart.length, "items");
          dispatch({ type: 'REPLACE_CART', cart: parsedCart });
        } catch (error) {
          console.error('Error parsing cart data:', error);
          dispatch({ type: 'REPLACE_CART', cart: [] });
        }
      } else {
        console.log("No saved cart found for", cartKey);
        dispatch({ type: 'REPLACE_CART', cart: [] });
      }
    }
  }, [user, currentUserEmail]);

  // Save cart when it changes
  useEffect(() => {
    if (state.cart && (state.cart.length > 0 || currentUserEmail !== null)) {
      const cartKey = currentUserEmail ? `cart_${currentUserEmail}` : "cart_guest";
      
      console.log("Saving cart with", state.cart.length, "items for", cartKey);
      localStorage.setItem(cartKey, JSON.stringify(state.cart));
    }
  }, [state.cart, currentUserEmail]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useStateValue = () => {
  const context = useContext(CartContext);
  if (!context) {
    console.error('useStateValue must be used within a CartProvider');
    return { state: DEFAULT_STATE, dispatch: () => null };
  }
  return context;
};

export default CartProvider;