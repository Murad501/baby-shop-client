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
      fetch("http://localhost:5000/categories").then((res) => res.json()),
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
