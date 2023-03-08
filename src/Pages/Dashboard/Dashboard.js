import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  BsFillBagCheckFill,
  BsFillBagPlusFill,
  BsFillBoxFill,
} from "react-icons/bs";
import { HiUserGroup, HiUsers } from "react-icons/hi";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { MdReportOff } from "react-icons/md";
import { dashboardProvider } from "../../Context/DashboardContext";
import { darkProvider } from "../../Context/DarkContext";

const Dashboard = () => {
  const { showFullMenu } = useContext(dashboardProvider);
  const { isDark } = useContext(darkProvider);
  const commonClass = `text-xl font-medium bg-transparent hover:text-rose-400 flex items-center ${
    showFullMenu ? "justify-center lg:justify-start" : "justify-center"
  } gap-3 whitespace-nowrap overflow-hidden`;

  return (
    <div
      className={`flex bg-white flex-row md:flex-col justify-evenly gap-8 p-3 border-b ${
        isDark && "border-gray-800" 
      } md:border-b-0 md:py-5`}
    >
      <span>
        <Link title="My Orders" className={`${commonClass}`} to="/dashboard">
          <span>
            <BsFillBagCheckFill className="h-7"></BsFillBagCheckFill>
          </span>
          {showFullMenu && <p className="hidden lg:block">My Orders</p>}
        </Link>
      </span>
      <span>
        <Link
          title="Add Product"
          className={`${commonClass}`}
          to="/dashboard/add-product"
        >
          <span>
            <BsFillBagPlusFill className="h-7"></BsFillBagPlusFill>
          </span>
          {showFullMenu && <p className="hidden lg:block">Add Product</p>}
        </Link>
      </span>
      <span>
        <Link
          title="My Product"
          className={`${commonClass}`}
          to="/dashboard/my-products"
        >
          <span>
            <BsFillBoxFill className="h-7"></BsFillBoxFill>
          </span>
          {showFullMenu && <p className="hidden lg:block">My Product</p>}
        </Link>
      </span>
      <span>
        <Link
          title="My Buyers"
          className={`${commonClass}`}
          to="/dashboard/my-buyers"
        >
          <span>
            <HiUserGroup className="h-7"></HiUserGroup>
          </span>
          {showFullMenu && <p className="hidden lg:block">My Buyers</p>}
        </Link>
      </span>
      <span>
        <Link
          title="Add Category"
          className={`${commonClass}`}
          to="/dashboard/add-category"
        >
          <span>
            <HiOutlineSquaresPlus className="h-7"></HiOutlineSquaresPlus>
          </span>
          {showFullMenu && <p className="hidden lg:block">Add Category</p>}
        </Link>
      </span>
      <span>
        <Link
          title="All Sellers"
          className={`${commonClass}`}
          to="/dashboard/all-sellers"
        >
          <span>
            <HiUsers className="h-7"></HiUsers>
          </span>
          {showFullMenu && <p className="hidden lg:block">All Sellers</p>}
        </Link>
      </span>
      <span>
        <Link
          title="All Buyers"
          className={`${commonClass}`}
          to="/dashboard/all-buyers"
        >
          <span>
            <FaUsers className="h-7"></FaUsers>
          </span>
          {showFullMenu && <p className="hidden lg:block">All Buyers</p>}
        </Link>
      </span>
      <span>
        <Link
          title="Reported Items"
          className={`${commonClass}`}
          to="/dashboard/reported-items"
        >
          <span>
            <MdReportOff className="h-7"></MdReportOff>
          </span>
          {showFullMenu && <p className="hidden lg:block">Reported Items</p>}
        </Link>
      </span>
    </div>
  );
};

export default Dashboard;
