import React, { useContext } from "react";
import ProductCard from "../../Components/ProductCard";
import { darkProvider } from "../../Context/DarkContext";
import { productProvider } from "../../Context/ProductContext";

const AllProducts = () => {
  const { isDark } = useContext(darkProvider);
  const { products } = useContext(productProvider);
  return (
    <div className="mt-10 mb-20 mx-auto">
      <h1
        className={`text-4xl font-bold text-center mb-10 ${
          !isDark && "text-rose-400"
        }`}
      >
        All
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  justify-center items-center gap-2">
        {products.map((product) => (
          <ProductCard key={product?._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
