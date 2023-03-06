import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { darkProvider } from "../../Context/DarkContext";

const RelatedProductsCard = ({ product }) => {
  const { picture, _id, price, name } = product;

  const { isDark } = useContext(darkProvider);

  return (
    <Link
      to={`/products/${_id}`}
      className={`mx-auto max-w-sm hover:shadow-md hover:text-rose-400 border ${isDark && "border-gray-800"} w-full p-5`}
    >
      <img
        className={`h-60 mx-auto`}
        src={picture}
        alt="categoryImage"
      />
      <div className="mt-5">
      <h2 className="text-normal font-semibold">{name}</h2>
      <p>${price} USD</p>
      </div>
    </Link>
  );
};

export default RelatedProductsCard;
