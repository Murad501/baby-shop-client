import React, { useContext } from "react";
import { darkProvider } from "../../../Context/DarkContext";
import imageOne from "../../../Assets/categoryImage/gear.png";
import imageTwo from "../../../Assets/categoryImage/sustain.png";
import imageThree from "../../../Assets/categoryImage/clothings.png";
import imageFour from "../../../Assets/categoryImage/toys.png";
import CategoryCard from "./CategoryCard";

const TopCategories = () => {
  const { isDark } = useContext(darkProvider);
  const categories = [
    {
      img: imageOne,
      name: "Gear",
    },
    {
      img: imageTwo,
      name: "Sustains",
    },
    {
      img: imageThree,
      name: "Clothings",
    },
    {
      img: imageFour,
      name: "Toys",
    },
  ];
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
        {categories.map((category, idx) => (
          <CategoryCard key={idx} category={category}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
