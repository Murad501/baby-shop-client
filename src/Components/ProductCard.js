import React, { useContext } from "react";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { ImPriceTags } from "react-icons/im";
import { MdDiscount } from "react-icons/md";
import { darkProvider } from "../Context/DarkContext";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { isDark } = useContext(darkProvider);
  const {
    picture,
    name,
    description,
    price,
    buyingPrice,
    date,
    location,
    usesYears,
    _id
  } = product;
  const dateObj = parseISO(date);
  const formateDate = format(dateObj, "MMMM dd, yyyy");
  return (
    <Link to={`/products/${_id}`}
      className={`card  max-w-lg mx-auto border ${
        isDark && "border-gray-800"
      } rounded-sm`}
    >
      <div>
        <img className="h-80 mx-auto" src={picture} alt="ProductImage" />
      </div>

      <div className="card-body p-3">
        <div>
          <h2 className="text-normal font-bold">{name}</h2>
          <p className="text-xs">
            {description.length > 150
              ? description.slice(0, 150) + "..."
              : description}
          </p>
        </div>
        <div>
          <span className="font-semibold text-sm flex justify-start items-center gap-2">
            Murad Hossain <FaCheckCircle></FaCheckCircle>
          </span>
          <div className="flex gap-3 my-2 justify-between">
            <span className="flex items-center gap-1 text-xs font-semibold">
              <ImPriceTags></ImPriceTags> ${price}
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold">
              <MdDiscount></MdDiscount> ${buyingPrice}
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold">
              <IoLocationSharp></IoLocationSharp> {location}
            </span>
          </div>
          <div className="text-sm grid grid-cols-2 gap-3 my-4 justify-between">
            <span className="flex items-center gap-1 text-xs">
              <FaEdit></FaEdit> {formateDate}
            </span>
            <p className="flex items-center gap-1 text-xs">
              <span className="font-semibold">{usesYears}</span> Years of use
            </p>
          </div>
        </div>
        <div className="mx-auto">
          <button
            className={`${
              isDark
                ? "hover:text-gray-200 hover:border-gray-200 border-gray-800"
                : "text-rose-400 border-rose-400"
            } font-semibold px-5 border py-2`}
          >
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
