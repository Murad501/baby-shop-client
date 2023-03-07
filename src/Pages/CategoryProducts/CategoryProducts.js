import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/ProductCard";
import { darkProvider } from "../../Context/DarkContext";
import { productProvider } from "../../Context/ProductContext";

const CategoryProducts = () => {
  const { isDark } = useContext(darkProvider);
  const { id } = useParams();
  const { products } = useContext(productProvider);
  const categoryProducts = products.filter(
    (product) => product?.category?._id === id
  );
  const categoryName = categoryProducts[0]?.category?.name;

  return (
    <>
      {categoryProducts.length ? (
        <div className="mt-10 mb-20 mx-auto">
          <h1
            className={`text-4xl font-bold text-center mb-10 ${
              !isDark && "text-rose-400"
            }`}
          >
            {categoryName}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  justify-center items-center gap-2">
            {categoryProducts.length &&
              categoryProducts.map((product) => (
                <ProductCard key={product?._id} product={product}></ProductCard>
              ))}
          </div>
        </div>
      ) : (
        <h1
          className={`text-4xl font-bold text-center my-10 ${
            !isDark && "text-rose-400"
          }`}
        >
          No products found in this category
        </h1>
      )}
    </>
  );
};

export default CategoryProducts;
