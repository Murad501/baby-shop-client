import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { loadingProvider } from "../Context/LoadingContext";
import { userProvider } from "../Context/UserContext";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { setIsLoading } = useContext(loadingProvider);
  const { loading } = useContext(userProvider);
  const { isAdmin, adminLoading } = useAdmin();
  const location = useLocation();

  if (adminLoading || loading) {
    return setIsLoading(true);
  }
  if (isAdmin) {
    setIsLoading(false);
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default AdminRoute;
