import React, { useContext } from 'react';
import ProductCard from '../../../Components/ProductCard';
import { darkProvider } from '../../../Context/DarkContext';

const AdvertisedProducts = () => {
    const {isDark} = useContext(darkProvider)
    return (
        <div className="mt-10 mb-20 mx-auto">
      <h1
        className={`text-4xl font-bold text-center mb-10 ${
          !isDark && "text-rose-400"
        }`}
      >
        Advertised Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  justify-center items-center gap-2">
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
      </div>
    </div>
    );
};

export default AdvertisedProducts;