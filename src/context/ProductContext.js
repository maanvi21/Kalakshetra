import React, { createContext, useState } from "react";
import productItems from "../data/ProductData";

// Creating the Context
export const ProductContext = createContext();

// Provider Component
export default function ProductProvider({ children }) {
  const [products, setProducts] = useState(productItems);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}
