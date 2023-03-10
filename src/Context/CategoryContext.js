import React, { createContext } from "react";
import { useQuery } from "react-query";

export const categoryProvider = createContext();
const CategoryContext = ({ children }) => {
  const {
    data: categories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("https://baby-shop-server.vercel.app/categories").then((res) => res.json()),
  });

  const value = {
    categories,
    refetch,
    isLoading,
  };
  return (
    <categoryProvider.Provider value={value}>
      {children}
    </categoryProvider.Provider>
  );
};

export default CategoryContext;
