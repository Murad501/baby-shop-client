import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { darkProvider } from "../../Context/DarkContext";

const RelatedProductsCard = ({ product }) => {
  const { picture, _id, price, name } = product;

  const { isDark } = useContext(darkProvider);

  return (
    <Link
      to={`/products/${_id}`}
      className={`mx-auto max-w-sm hover:shadow-md hover:text-rose-400 border ${
        isDark && "border-gray-800"
      } w-full p-5`}
    >
      <div className="h-40 mb-5">
        <img className={` h-full mx-auto`} src={picture} alt="categoryImage" />
      </div>
      <div>
        <h2 className="text-normal font-semibold">
          {name.length > 30 ? name.slice(0, 30) + "..." : name}
        </h2>
        <p>${price} USD</p>
      </div>
    </Link>
  );
};

export default RelatedProductsCard;
