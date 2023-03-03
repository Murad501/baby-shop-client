import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { loadingProvider } from "../Context/LoadingContext";
import { userProvider } from "../Context/UserContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(userProvider);
  const { setIsLoading } = useContext(loadingProvider);
  const location = useLocation();

  if (loading) {
    return setIsLoading(true);
  } else {
    setIsLoading(false);
  }

  if (user) {
    setIsLoading(false);
    return children;
  }
  return <Navigate to="/signin" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
