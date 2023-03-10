import { format, parseISO } from "date-fns";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { BsFillPatchExclamationFill } from "react-icons/bs";
import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";
import { IoLocationSharp } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { darkProvider } from "../../../Context/DarkContext";

const MyProductCard = ({ product, refetch }) => {
  const { isDark } = useContext(darkProvider);
  const [hoverIcon, setHoverIcon] = useState(false);
  const [showEditRemoveButton, setShowEditRemoveButton] = useState(false);
  const {
    picture,
    name,
    description,
    price,
    buyingPrice,
    date,
    location,
    usesYears,
    _id,
    postedBy,
    advertised
  } = product;

  const {
    data: seller = [],
  } = useQuery({
    queryKey: ["seller"],
    queryFn: () =>
      fetch(`https://baby-shop-server.vercel.app/seller/${postedBy}`).then((res) =>
        res.json()
      ),
  });

  const dateObj = parseISO(date);
  const formateDate = format(dateObj, "MMMM dd, yyyy");

  const handleDeleteProduct = (id) => {
    fetch(`https://baby-shop-server.vercel.app/remove-product/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.success("product remove successfully");
          refetch();
        }
      });
  };

  const handleAdvertiseProduct = (id)=>{
    fetch(`https://baby-shop-server.vercel.app/advertise-product/${id}`, {
      method: "PUT",

    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("product advertised successfully");
          refetch();
        }
      });
  }

  return (
    <div
      className={`card w-full mx-auto border ${
        isDark && "border-gray-800"
      } rounded-sm`}
    >
      <BsFillPatchExclamationFill
        onMouseOver={() => setHoverIcon(true)}
        onMouseLeave={() =>
          setTimeout(() => {
            if (showEditRemoveButton) {
              setHoverIcon(true);
            } else {
              setHoverIcon(false);
            }
          }, 1000)
        }
        className="absolute top-1 right-1"
      ></BsFillPatchExclamationFill>
      <div
        onMouseOver={() => setShowEditRemoveButton(true)}
        onMouseLeave={() => setShowEditRemoveButton(false)}
        className={`absolute top-1 right-6 p-2 border ${
          isDark ? "bg-black border-gray-800" : "bg-white"
        } ${showEditRemoveButton || hoverIcon ? "block" : "hidden"}`}
      >
        <Link
          to={`/dashboard/product/edit/${_id}`}
          className="flex items-center gap-2 mt-1 mb-2 hover:text-rose-400"
        >
          <FaEdit></FaEdit> Edit
        </Link>
        <button
          onClick={() => handleDeleteProduct(_id)}
          className="flex items-center gap-2 mt-1 hover:text-red-600"
        >
          <FaTrash></FaTrash> Remove
        </button>
      </div>
      <div>
        <img
          className="h-60 w-auto mx-auto z-0"
          src={picture}
          alt="ProductImage"
        />
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
            {seller ? seller?.name : ""}{" "}
            <FaCheckCircle className="text-rose-400"></FaCheckCircle>
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
              <span className="font-semibold">{usesYears}</span> Years of used
            </p>
          </div>
        </div>
        <div className="mx-auto">
          <button
          disabled={advertised}
          onClick={()=>handleAdvertiseProduct(_id)}
            className={`${
              isDark
                ? "hover:text-gray-200 hover:border-gray-200 border-gray-800"
                : "text-rose-400 border-rose-400"
            }
            ${advertised && 'bg-rose-400 text-white'} font-semibold px-5 border py-2`}
          >
            {advertised ? 'Advertised' : 'Advertise'}
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default MyProductCard;
