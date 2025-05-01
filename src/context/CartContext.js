import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const DEFAULT_STATE = { cart: [] };

export const CartContext = createContext({
  state: DEFAULT_STATE,
  dispatch: () => null,
});

const Reducer = (state, action) => {
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
      // Updated to use action._id instead of action.id
      newState = { ...state, cart: state.cart.filter(item => item._id !== action._id) };
      return newState;
    }
    case 'UPDATE_QUANTITY': {
      // Updated to use action._id instead of action.id
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
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(Reducer, DEFAULT_STATE);

  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user._id}`);
      if (savedCart) {
        dispatch({ type: 'REPLACE_CART', cart: JSON.parse(savedCart) });
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user._id}`, JSON.stringify(state.cart));
    }
  }, [state.cart, user]);

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