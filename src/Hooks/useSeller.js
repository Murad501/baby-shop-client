import { useContext, useEffect, useState } from "react";
import { userProvider } from "../Context/UserContext";

const useSeller = () => {
  const [isSeller, setIsSeller] = useState(false);
  const [sellerLoading, setSellerLoading] = useState(true);
  const { user } = useContext(userProvider);

  useEffect(() => {
    setSellerLoading(true);
    if (user) {
      console.log('isSeller loading');
      fetch(`http://localhost:5000/is-seller/${user.email}`)
        .then((res) => res.json())
        .then((result) => {
          console.log(result)
          setIsSeller(result.isSeller);
          setSellerLoading(false);
        });
    }
  }, [user]);
  return { isSeller, sellerLoading };
};

export default useSeller;
