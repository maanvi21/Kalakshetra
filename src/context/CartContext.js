import React, { createContext, useContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

const Reducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if item already exists
      const existingItem = state.cart.find(item => item.id === action.item.id);
      
      if (existingItem) {
        newState = {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.item.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        newState = {
          ...state,
          cart: [...state.cart, { ...action.item, quantity: 1 }]
        };
      }
      console.log('Cart after adding item:', newState.cart);
      return newState;

    case 'REMOVE_FROM_CART':
      newState = {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id)
      };
      console.log('Cart after removing item:', newState.cart);
      return newState;

    case 'UPDATE_QUANTITY':
      newState = {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.id
            ? { ...item, quantity: action.quantity }
            : item
        )
      };
      console.log('Cart after updating quantity:', newState.cart);
      return newState;

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, { cart: [] });

  // Log cart changes
  useEffect(() => {
    console.log('Current cart state:', state.cart);
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useStateValue = () => useContext(CartContext);

export default CartProvider;