import { useContext, useEffect, useState } from "react";
import { userProvider } from "../Context/UserContext";

const useSeller = () => {
  const [isSeller, setIsSeller] = useState(false);
  const [sellerLoading, setSellerLoading] = useState(true);
  const { user } = useContext(userProvider);

  useEffect(() => {
    setSellerLoading(true);
    if (user) {
      fetch(`https://baby-shop-server.vercel.app/is-seller/${user.email}`)
        .then((res) => res.json())
        .then((result) => {
          setIsSeller(result.isseller);
          setSellerLoading(false);
        });
    }
  }, [user]);
  return { isSeller, sellerLoading };
};

export default useSeller;
