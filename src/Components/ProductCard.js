import React, { useContext } from "react";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { ImPriceTags } from "react-icons/im";
import { MdDiscount } from "react-icons/md";
import image from "../Assets/PlanToys.png";
import { darkProvider } from "../Context/DarkContext";

const ProductCard = () => {
  const { isDark } = useContext(darkProvider);
  return (
    <div className={`card  max-w-lg mx-auto border ${isDark && 'border-gray-800'} rounded-sm`}>
      <img src={image} alt="ProductImage" />

      <div className="card-body p-3">
        <div>
          <h2 className="text-normal font-bold">
            PlanToys Birthday Cake Set - Incomplete
          </h2>
          <p className="text-xs">
            PlanToys Hair Dresser Set - NOTE: This fun Hair Dresser Set from
            PlanToys is a bit different...
          </p>
        </div>
        <div>
          <span className="font-semibold text-sm flex justify-start items-center gap-2">
            Murad Hossain <FaCheckCircle></FaCheckCircle>
          </span>
          <div className="flex gap-3 my-2 justify-between">
            <span className="flex items-center gap-1 text-xs font-semibold">
              <ImPriceTags></ImPriceTags> $12
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold">
              <MdDiscount></MdDiscount> $18
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold">
              <IoLocationSharp></IoLocationSharp> Texas, USA
            </span>
          </div>
          <div className="text-sm grid grid-cols-2 gap-3 my-4 justify-between">
            <span className="flex items-center gap-1 text-xs">
              <FaEdit></FaEdit> 12 March 2023
            </span>
            <p className="flex items-center gap-1 text-xs">
              <span className="font-semibold">2</span> Years of use
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
    </div>
  );
};

export default ProductCard;
