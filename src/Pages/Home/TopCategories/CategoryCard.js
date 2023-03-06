import React, { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { darkProvider } from "../../../Context/DarkContext";

const CategoryCard = ({ category }) => {
  const { isDark } = useContext(darkProvider);
  const { _id, picture, name } = category;
  return (
    <Link
      to={`/categories/${_id}`}
      className="mx-auto max-w-sm hover:text-rose-400"
    >
      <img
        className={`border hover:shadow-md ${isDark && "border-gray-800"}`}
        src={picture}
        alt="categoryImage"
      />
      <span className="my-2 font-semibold flex justify-center items-center gap-2">
        {name} <FaArrowRight></FaArrowRight>
      </span>
    </Link>
  );
};

export default CategoryCard;
