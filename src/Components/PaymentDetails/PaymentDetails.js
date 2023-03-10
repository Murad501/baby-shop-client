import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useState } from "react";
import { BsFillBagCheckFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { darkProvider } from "../../Context/DarkContext";
import { productProvider } from "../../Context/ProductContext";
import { userProvider } from "../../Context/UserContext";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const PaymentDetails = () => {
  const { user } = useContext(userProvider);
  const { id } = useParams();
  const { isDark } = useContext(darkProvider);
  const { products } = useContext(productProvider);
  const product = products.find((product) => product._id === id);
  const stripePromise = loadStripe(process.env.REACT_APP_LoadStripePK);
  const [transitionId, setTransitionId] = useState("");
  const [isSold, setIsSold] = useState(!product?.available);
  return (
    <>
      {isSold ? (
        <div className="mx-auto flex justify-center items-center py-10 mt-12 px-1">
          <div
            className={`border text-center relative max-w-lg pt-12 pb-5 px-3 ${
              isDark && "border-gray-800"
            }`}
          >
            <span className="flex justify-center items-center mx-auto text-7xl absolute p-2 bg-rose-200 rounded-full w-20 h-20 -top-10 left-0 right-0">
              <FaCheckCircle className="text-rose-400"></FaCheckCircle>
            </span>
            <p className="font-semibold text-lg text-rose-400">Great!</p>
            <h3 className="font-medium text-[16px]">
              Hello, <span className="font-bold">{user?.displayName}</span> . We’ve confirmed your payment. Thank
              you for shopping with us.
            </h3>
            <p className="my-2">Transition Id: {transitionId}</p>
            <Link
            to='/dashboard'
              className={`flex justify-center items-center gap-2 border w-36 py-2 mx-auto mt-5 ${
                isDark && "border-gray-800"
              }`}
            >
              <BsFillBagCheckFill></BsFillBagCheckFill> My Orders
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-96 flex justify-center items-center mx-auto my-10">
          <Elements stripe={stripePromise}>
            <CheckoutForm product={product} setIsSold={setIsSold} setTransitionId={setTransitionId}></CheckoutForm>
          </Elements>
        </div>
      )}
    </>
  );
};

export default PaymentDetails;
