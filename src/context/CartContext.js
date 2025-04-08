import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create context with default values to prevent undefined errors
const DEFAULT_STATE = { cart: [] };
export const CartContext = createContext({
  state: DEFAULT_STATE,
  dispatch: () => null, // Placeholder function
});

const Reducer = (state, action) => {
  // Default state protection
  if (!state || !state.cart) {
    console.error('Reducer received undefined state!');
    state = DEFAULT_STATE;
  }

  let newState;
  
  console.log('Reducer called with action:', action);
  console.log('Current state before action:', state);
  
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if item already exists (with safety)
      const existingItem = state.cart.find(item => item.id === action.item.id);
      
      if (existingItem) {
        console.log('Item already exists in cart, updating quantity', existingItem);
        newState = {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.item.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        console.log('Adding new item to cart', action.item);
        // Ensure the item has all necessary properties with good defaults
        const newItem = {
          ...action.item,
          id: action.item.id, // Ensure ID exists
          quantity: action.item.quantity || 1,
          name: action.item.name || action.item.title || 'Unnamed Product',
          title: action.item.title || action.item.name || 'Unnamed Product',
          price: action.item.price || 0,
          image: action.item.image || '',
        };
        
        newState = {
          ...state,
          cart: [...state.cart, newItem]
        };
      }
      console.log('Cart after adding item:', newState.cart);
      return newState;
    
    case 'REMOVE_FROM_CART':
      console.log('Removing item from cart', action.id);
      newState = {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id)
      };
      console.log('Cart after removing item:', newState.cart);
      return newState;
    
    case 'UPDATE_QUANTITY':
      console.log('Updating quantity for item', action.id);
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
    
    case 'CLEAR_CART':
      console.log('Clearing cart');
      return {
        ...state,
        cart: []
      };
      
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  // Initialize with data from localStorage if available
  const getInitialState = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      console.log('Retrieved from localStorage:', savedCart);
      
      if (savedCart && savedCart !== "undefined" && savedCart !== "null") {
        try {
          const parsedCart = JSON.parse(savedCart);
          console.log('Parsed cart from localStorage:', parsedCart);
          return { cart: Array.isArray(parsedCart) ? parsedCart : [] };
        } catch (err) {
          console.error('Failed to parse cart from localStorage:', err);
          return DEFAULT_STATE;
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
    
    console.log('Using default empty cart');
    return DEFAULT_STATE;
  };
  
  const [state, dispatch] = useReducer(Reducer, getInitialState());

  // Ensure state always has cart array
  const safeState = state && state.cart ? state : DEFAULT_STATE;

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      if (safeState && safeState.cart) {
        console.log('Saving cart to localStorage:', safeState.cart);
        localStorage.setItem('cart', JSON.stringify(safeState.cart));
      }
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [safeState.cart]);

  return (
    <CartContext.Provider value={{ state: safeState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useStateValue = () => {
  const context = useContext(CartContext);
  
  // Safety check
  if (!context) {
    console.error('useStateValue must be used within a CartProvider');
    return { state: DEFAULT_STATE, dispatch: () => null };
  }
  
  return context;
};

export default CartProvider;