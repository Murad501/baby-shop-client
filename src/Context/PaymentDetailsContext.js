import React, { createContext, useContext, useEffect, useState } from "react";
import { userProvider } from "./UserContext";

export const paymentDetailsProvider = createContext();
const PaymentDetailsContext = ({ children }) => {
  const { user } = useContext(userProvider);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/payment-details/${user?.email}`)
      .then(res => res.json())
      .then(data => {
        setPaymentDetails(data.paymentDetails)
      })
    }
  }, [user]);

  const value = {
    paymentDetails,
  };
  return (
    <paymentDetailsProvider.Provider value={value}>
      {children}
    </paymentDetailsProvider.Provider>
  );
};

export default PaymentDetailsContext;
