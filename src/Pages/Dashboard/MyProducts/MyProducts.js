import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { dashboardProvider } from "../../../Context/DashboardContext";
import { productProvider } from "../../../Context/ProductContext";
import { userProvider } from "../../../Context/UserContext";
import MyProductCard from "./MyProductCard";

const MyProducts = () => {
  const { products, refetch } = useContext(productProvider);
  const { user } = useContext(userProvider);
  const { showFullMenu } = useContext(dashboardProvider);
  let addedProducts = [];

  if (user && products.length) {
    addedProducts = products.filter(
      (product) => product.postedBy === user.email
    );
  }

  return (
    <div>
      {addedProducts.length ? (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            showFullMenu ? "lg:grid-cols-2 xl:grid-cols-3" : "lg:grid-cols-3"
          }  gap-5`}
        >
          {addedProducts.map((product) => (
            <MyProductCard key={product._id} product={product} refetch={refetch}></MyProductCard>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl">
            You haven't added any products yet.{" "}
            <Link to="/add-product" className="font-semibold text-rose-400">
              Add Now
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
