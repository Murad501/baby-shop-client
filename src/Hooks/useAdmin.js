import { useContext, useEffect, useState } from "react";
import { userProvider } from "../Context/UserContext";

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const { user } = useContext(userProvider);

  useEffect(() => {
    setAdminLoading(true);
    if (user) {
      fetch(`https://baby-shop-server.vercel.app/admin/${user.email}`)
        .then((res) => res.json())
        .then((result) => {
          setIsAdmin(result.isAdmin);
          setAdminLoading(false);
        });
    }
  }, [user]);
  return {isAdmin, adminLoading};
};

export default useAdmin;
