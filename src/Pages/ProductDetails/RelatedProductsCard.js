import React, { useContext } from "react";
import { darkProvider } from "../../Context/DarkContext";

const RelatedProductsCard = ({ product }) => {
  const { isDark } = useContext(darkProvider);

  return (
    <div className="mx-auto max-w-sm hover:text-rose-400">
      <img
        className={`border hover:shadow-md ${isDark && "border-gray-800"}`}
        src={product.img}
        alt="categoryImage"
      />
      <h2 className="text-normal font-semibold">
        PlanToys Birthday Cake Set - Incomplete
      </h2>
      <p>$24.99 USD</p>
    </div>
  );
};

export default RelatedProductsCard;
