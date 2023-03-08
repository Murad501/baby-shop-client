import React from 'react';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    return (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl">
            Your order list is empty.{" "}
            <Link to="/all-products" className="font-semibold text-rose-400">
              Shop Now
            </Link>
          </p>
        </div>
    );
};

export default MyOrders;