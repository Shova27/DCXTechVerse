import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
 
const ProductContext = createContext();
 
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
 

    useEffect(() => {
      axios.get("http://localhost:5000/products")  // Fetch from backend API
        .then(response => setProducts(response.data))
        .catch(error => console.error("Error fetching products:", error));
    }, []);


 
  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
 
export { ProductContext, ProductProvider };