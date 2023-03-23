import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { loadingProvider } from "../Context/LoadingContext";
import { userProvider } from "../Context/UserContext";
import useSeller from "../Hooks/useSeller";

const SellerRoute = ({ children }) => {
  const { setIsLoading } = useContext(loadingProvider);
  const { loading } = useContext(userProvider);
  const { isSeller, sellerLoading } = useSeller();
  const location = useLocation();

  if (sellerLoading || loading) {
    return setIsLoading(true);
  }
  if (isSeller) {
    setIsLoading(false);
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default SellerRoute;