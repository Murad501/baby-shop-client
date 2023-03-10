import {
  CardElement,
  ElementsConsumer,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { darkProvider } from "../../Context/DarkContext";
import { userProvider } from "../../Context/UserContext";
import LoadingButton from "../LoadingButton";

const CheckoutForm = ({ product, setIsSold, setTransitionId }) => {
  const { user } = useContext(userProvider);
  const { isDark } = useContext(darkProvider);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (product) {
      fetch("https://baby-shop-server.vercel.app/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: product?.price }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [product]);

  const handleSubmit = async (event) => {
    setProcessing(true);
    event.preventDefault();
    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }
    
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const soldProduct = {
        productId: product._id,
        productName: product.name,
        buyerName: user.displayName,
        buyerEmail: user.email,
        sellerEmail: product.postedBy,
        transitionId: paymentIntent.id,
      };
      fetch(`https://baby-shop-server.vercel.app/sold-product/${product._id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(soldProduct),
      })
        .then((res) => res.json())
        .then(() => {
          setProcessing(false);
          setIsSold(true);
          setTransitionId(paymentIntent.id);
        });
    }
  };

  return (
    <div className="w-full">
      <div className="text-center my-5">
        <p>Card No. 371449635398431</p>
        <p>Card No. 5200828282828210</p>
      </div>
      <p className="text-red-500 font-medium py-2">{cardError}</p>
      <form
        className={`border hover:border-rose-400 p-2 ${
          isDark && "border-gray-800"
        }`}
        onSubmit={handleSubmit}
      >
        <div className="text-white">
          <CardElement
            options={{
              style: {
                base: {
                  color: "rgb(156 163 175)",
                  fontSize: "16px",
                },
                invalid: {
                  color: "rgb(239 68 68)",
                },
              },
            }}
          />
        </div>
        {!processing ? <button
          type="submit"
          className={`border px-6 py-[4px] mt-5 hover:bg-rose-400 hover:text-white font-semibold ${
            isDark && "border-gray-800"
          }`}
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button> : <LoadingButton btnStyle={'mt-5'}></LoadingButton>}
        
      </form>
    </div>
  );
};

export const InjectedCheckoutForm = () => {
  return (
    <ElementsConsumer>
      {({ elements, stripe }) => (
        <CheckoutForm elements={elements} stripe={stripe} />
      )}
    </ElementsConsumer>
  );
};

export default CheckoutForm;
