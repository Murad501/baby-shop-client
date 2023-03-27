import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { BsFillBagCheckFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { darkProvider } from "../../Context/DarkContext";
import { paymentDetailsProvider } from "../../Context/PaymentDetailsContext";
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
  const {paymentDetails} = useContext(paymentDetailsProvider)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    country: "",
    state: "",
    zip: "",
    landmark: "",
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleAddPaymentDetails = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/save-payment-details/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ paymentDetails: formData }),
    })
      .then((res) => res.json())
      .then((result) => {
        if(result.acknowledged){
          toast.success('payment details saved')
        }
      });
  };

  return (
    <div>
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
              Hello, <span className="font-bold">{user?.displayName}</span> .
              We’ve confirmed your payment. Thank you for shopping with us.
            </h3>
            <p className="my-2">Transition Id: {transitionId}</p>
            <Link
              to="/dashboard"
              className={`flex justify-center items-center gap-2 border w-36 py-2 mx-auto mt-5 ${
                isDark && "border-gray-800"
              }`}
            >
              <BsFillBagCheckFill></BsFillBagCheckFill> My Orders
            </Link>
          </div>
        </div>
      ) : (
        <div className="my-10">
          <div className="text-center mb-10">
            <h3
              className={`text-3xl font-bold mb-5 ${
                !isDark && "text-rose-400"
              }`}
            >
              Payment Details
            </h3>
            <p className="font-medium">
              Complete your purchase by providing your payment details
            </p>
          </div>
          <div className="lg:flex justify-center gap-20 ">
            <div className="flex-1">
              <form onSubmit={handleAddPaymentDetails} className="my-10mx-2">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                  <div>
                    <h4
                      className={`text-xl font-bold mb-5 ${
                        !isDark && "text-rose-400"
                      }`}
                    >
                      Contact info
                    </h4>
                    <div className="mb-10">
                      <input
                        onChange={handleInputChange}
                        placeholder="First name"
                        type="text"
                        defaultValue={paymentDetails?.firstName}
                        name="firstName"
                        id="firstName"
                        className={`border-b bg-transparent p-2 w-full rounded-sm focus:outline-none ${
                          isDark
                            ? "border-gray-800 focus:text-rose-400"
                            : "border-gray-400 focus:border-rose-400"
                        }`}
                        required
                      />
                    </div>
                    <div className="mb-10">
                      <input
                        onChange={handleInputChange}
                        defaultValue={paymentDetails?.lastName}
                        placeholder="Last name"
                        type="text"
                        name="lastName"
                        id="lastName"
                        className={`border-b bg-transparent p-2 w-full rounded-sm focus:outline-none ${
                          isDark
                            ? "border-gray-800 focus:text-rose-400"
                            : "border-gray-400 focus:border-rose-400"
                        }`}
                        required
                      />
                    </div>
                    <div className="mb-10">
                      <input
                        onChange={handleInputChange}
                        placeholder="Email"
                        defaultValue={paymentDetails?.email}
                        type="email"
                        name="email"
                        id="email"
                        className={`border-b bg-transparent p-2 w-full rounded-sm focus:outline-none ${
                          isDark
                            ? "border-gray-800 focus:text-rose-400"
                            : "border-gray-400 focus:border-rose-400"
                        }`}
                        required
                      />
                    </div>
                    <div className="mb-10">
                      <input
                        onChange={handleInputChange}
                        placeholder="Phone number"
                        defaultValue={paymentDetails?.number}
                        type="number"
                        name="number"
                        id="number"
                        className={`border-b bg-transparent p-2 w-full rounded-sm focus:outline-none ${
                          isDark
                            ? "border-gray-800 focus:text-rose-400"
                            : "border-gray-400 focus:border-rose-400"
                        }`}
                        required
                      />
                    </div>
                  </div>
                  <div className="my-10 lg:my-0">
                    <h4
                      className={`text-xl font-bold mb-5 ${
                        !isDark && "text-rose-400"
                      }`}
                    >
                      Billing address
                    </h4>
                    <div className="mb-10">
                      <input
                        onChange={handleInputChange}
                        placeholder="Country"
                        defaultValue={paymentDetails?.country}
                        type="text"
                        name="country"
                        id="country"
                        className={`border-b bg-transparent p-2 w-full rounded-sm focus:outline-none ${
                          isDark
                            ? "border-gray-800 focus:text-rose-400"
                            : "border-gray-400 focus:border-rose-400"
                        }`}
                        required
                      />
                    </div>
                    <div className="mb-10">
                      <input
                        onChange={handleInputChange}
                        placeholder="State"
                        defaultValue={paymentDetails?.state}
                        type="text"
                        name="state"
                        id="state"
                        className={`border-b bg-transparent p-2 w-full rounded-sm focus:outline-none ${
                          isDark
                            ? "border-gray-800 focus:text-rose-400"
                            : "border-gray-400 focus:border-rose-400"
                        }`}
                        required
                      />
                    </div>
                    <div className="mb-10">
                      <input
                        onChange={handleInputChange}
                        placeholder="Zip code"
                        defaultValue={paymentDetails?.zip}
                        type="number"
                        name="zip"
                        id="zip"
                        className={`border-b bg-transparent p-2 w-full rounded-sm focus:outline-none ${
                          isDark
                            ? "border-gray-800 focus:text-rose-400"
                            : "border-gray-400 focus:border-rose-400"
                        }`}
                        required
                      />
                    </div>
                    <div className="mb-10">
                      <input
                        onChange={handleInputChange}
                        defaultValue={paymentDetails?.landmark}
                        id="landmark"
                        name="landmark"
                        type="text"
                        placeholder="E.g beside train station"
                        className={`border-b bg-transparent p-2 w-full rounded-sm focus:outline-none ${
                          isDark
                            ? "border-gray-800 focus:text-rose-400"
                            : "border-gray-400 focus:border-rose-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <button
                    type="submit"
                    className={`mb-5 bg-rose-400 text-white px-10 py-2 ${
                      !isDark && "text-rose-400"
                    }`}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
            <div className="md:min-w-[500px] mx-auto">
              <h4
                className={`text-xl font-bold mb-5 ${
                  !isDark && "text-rose-400"
                }`}
              >
                Order summary
              </h4>
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  product={product}
                  setIsSold={setIsSold}
                  setTransitionId={setTransitionId}
                ></CheckoutForm>
              </Elements>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
