import React, { useContext } from "react";
import { darkProvider } from "../../../Context/DarkContext";
import CategoryCard from "./CategoryCard";
import { categoryProvider } from "../../../Context/CategoryContext";

const TopCategories = () => {
  const { isDark } = useContext(darkProvider);
  const { categories } = useContext(categoryProvider);

  return (
    <div className="my-10 max-w-6xl mx-auto">
      <h1
        className={`text-4xl font-bold text-center mb-10 ${
          !isDark && "text-rose-400"
        }`}
      >
        Top Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-2">
        {categories.map((category) => (
          <CategoryCard key={category?._id} category={category}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
