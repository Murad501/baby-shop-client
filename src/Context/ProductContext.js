import React, { createContext } from "react";
import { useQuery } from "react-query";

export const productProvider = createContext();
const ProductContext = ({ children }) => {
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://localhost:5000/products").then((res) => res.json()),
  });

  const value = {
    products,
    refetch,
    isLoading,
  };
  return (
    <productProvider.Provider value={value}>
      {children}
    </productProvider.Provider>
  );
};

export default ProductContext;
