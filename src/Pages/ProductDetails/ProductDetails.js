import React, { useContext } from "react";
import { FaCheckCircle, FaEdit, FaShoppingCart } from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";
import { IoLocationSharp } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { darkProvider } from "../../Context/DarkContext";

import RelatedProductsCard from "./RelatedProductsCard";
import { productProvider } from "../../Context/ProductContext";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { products } = useContext(productProvider);
  const product = products.find((product) => product._id === id);
  const categoryProducts = products.filter(
    (prod) => prod.category._id === product.category._id
  );
  const relatedProducts = categoryProducts.filter(product => product._id !== id).slice(0, 4)
  const {
    picture,
    price,
    buyingPrice,
    location,
    condition,
    usesYears,
    name,
    description,
    date,
  } = product;

  const dateObj = parseISO(date);
  const formateDate = format(dateObj, "MMMM dd, yyyy");
  // const categoryProducts = [
  //   {
  //     img: imageOne,
  //     name: "Gear",
  //     price: 23,
  //   },
  //   {
  //     img: imageTwo,
  //     name: "Sustains",
  //     price: 45,
  //   },
  //   {
  //     img: imageThree,
  //     name: "Clothings",
  //     price: 11,
  //   },
  //   {
  //     img: imageFour,
  //     name: "Toys",
  //     price: 32,
  //   },
  // ];
  const { isDark } = useContext(darkProvider);
  return (
    <div className="py-10">
      <div className="grid justify-center items-center gird-cols-1 md:grid-cols-2 lg:grid-cols-9 ">
        <img
          className="lg:col-span-6 mx-auto"
          src={picture}
          alt="productImage"
        />
        <div className="lg:col-span-3">
          <h2 className="font-semibold text-3xl mb-10">{name}</h2>
          <div className="flex flex-col gap-5">
            <span className="font-semibold flex justify-start text-xl items-center gap-2">
              Murad Hossain <FaCheckCircle></FaCheckCircle>
            </span>
            <span className="flex items-center gap-1  font-semibold">
              <ImPriceTags></ImPriceTags>Price: ${price}
            </span>
            <span className="flex items-center gap-1  font-semibold">
              <MdDiscount></MdDiscount>Buying Price: ${buyingPrice}
            </span>
            <span className="flex items-center gap-1 font-semibold">
              <IoLocationSharp></IoLocationSharp> {location}
            </span>
            <p>
              <span className="font-semibold">{usesYears}</span> Years of use
            </p>
            <span className="flex items-center gap-1 ">
              <FaEdit></FaEdit> Posted: {formateDate}
            </span>
            <p>
              Quantity: <span className="font-semibold">1</span>
            </p>
            <p>
              Condition: <span className="font-semibold">{condition}</span>
            </p>
          </div>
          <button
            type="submit"
            className={`${
              isDark
                ? "border-gray-800 border hover:text-white"
                : "bg-rose-400 text-white"
            } font-semibold px-4 py-3 rounded-none mt-5 flex items-center gap-2`}
          >
            <FaShoppingCart></FaShoppingCart>
            Add to Cart
          </button>
          <p className="text-lg mt-5">{description}</p>
        </div>
      </div>
      <div className="flex justify-center items-center my-10">
        <button
          type="submit"
          className={`${
            isDark
              ? "border-gray-800 border hover:text-white"
              : "bg-rose-400 text-white"
          } font-semibold px-4 py-3 rounded-none mt-5`}
        >
          Checkout
        </button>
      </div>
      {/* related products */}
      <div className="my-10">
        <h1
          className={`text-3xl font-bold mb-10 ${!isDark && "text-rose-400"}`}
        >
          Related Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-x-5 gap-y-10">
          {relatedProducts.map((product, idx) => (
            <RelatedProductsCard
              key={idx}
              product={product}
            ></RelatedProductsCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
