// context/ProductContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Create the context
const ProductContext = createContext();

// Initial state
const initialState = {
  selectedProduct: null,
  selectedCategory: null,
  productHistory: []
};

// Reducer function
const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SELECTED_PRODUCT':
      return {
        ...state,
        selectedProduct: action.product,
        selectedCategory: action.category,
        productHistory: [
          action.product,
          ...state.productHistory.filter(p => p._id !== action.product._id).slice(0, 9)
        ]
      };

    case 'CLEAR_SELECTED_PRODUCT':
      return {
        ...state,
        selectedProduct: null,
        selectedCategory: null
      };

    case 'CLEAR_PRODUCT_HISTORY':
      return {
        ...state,
        productHistory: []
      };

    default:
      return state;
  }
};

// Provider component
export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for accessing product context
export const useProductState = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductState must be used within a ProductProvider');
  }
  return context;
};
