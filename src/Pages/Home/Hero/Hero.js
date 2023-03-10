import React, { useContext } from "react";
import { Link } from "react-router-dom";
import image from "../../../Assets/heroImage.png";
import { darkProvider } from "../../../Context/DarkContext";

const Hero = () => {
    const {isDark} = useContext(darkProvider)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-center items-center py-10">
      <div>
        <h1 className={`hidden xl:block text-3xl ${!isDark && 'text-rose-400'}  lg:text-4xl font-bold lg:leading-relaxed`}>Shop or Sell Gently Used <br /> Baby + Kid Stuff</h1>
        <p className={`hidden xl:block py-6 text-xl ${!isDark && 'text-rose-400'} lg:text-2xl`}>
        Browse our curated selection of used baby items and kid <br /> gear – online thrift store shopping at its best.
        </p>
        <h1 className={`xl:hidden text-3xl ${!isDark && 'text-rose-400'} lg:text-4xl font-bold lg:leading-relaxed`}>Shop or Sell Gently Used Baby + Kid Stuff</h1>
        <p className={`xl:hidden py-6 text-xl ${!isDark && 'text-rose-400'} lg:text-2xl`}>
        Browse our curated selection of used baby items and kid gear – online thrift store shopping at its best.
        </p>
        <Link to='/all-products' className={`${
              isDark ? "text-gray-200 border-gray-800" : "text-rose-400 border-rose-400"
            } font-semibold px-5 border py-2`}>Shop Now</Link>
      </div>
      <div>
        <img src={image} alt="heroImage" />
      </div>
    </div>
  );
};

export default Hero;
