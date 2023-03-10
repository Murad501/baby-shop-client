import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  BsFillBagCheckFill,
  BsFillBagPlusFill,
  BsFillBoxFill,
} from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
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
    <nav
      className={`flex flex-row md:flex-col justify-evenly gap-8 p-3 border-b ${
        isDark && "border-gray-800"
      } md:border-b-0 md:py-5`}
    >
      <NavLink
        title="My Orders"
        className={`${commonClass}`}
        to="/dashboard"
        end
      >
        {({ isActive }) => (
          <div className={isActive && "text-rose-400"}>
            <span className={`${commonClass}`}>
              <BsFillBagCheckFill className="h-7"></BsFillBagCheckFill>
              {showFullMenu && <p className="hidden lg:block">My Orders</p>}
            </span>
          </div>
        )}
      </NavLink>
      <NavLink title="Add Product" to="/dashboard/add-product">
        {({ isActive }) => (
          <div className={isActive && "text-rose-400"}>
            <span className={`${commonClass}`}>
              <BsFillBagPlusFill className="h-7"></BsFillBagPlusFill>
              {showFullMenu && <p className="hidden lg:block">Add Product</p>}
            </span>
          </div>
        )}
      </NavLink>
      <NavLink title="My Product" to="/dashboard/my-products">
        {({ isActive }) => (
          <div className={isActive && "text-rose-400"}>
            <span className={`${commonClass}`}>
              <BsFillBoxFill className="h-7"></BsFillBoxFill>
              {showFullMenu && <p className="hidden lg:block">My Product</p>}
            </span>
          </div>
        )}
      </NavLink>

      <NavLink title="Add Category" to="/dashboard/add-category">
        {({ isActive }) => (
          <div className={isActive && "text-rose-400"}>
            <span className={`${commonClass}`}>
              <HiOutlineSquaresPlus className="h-7"></HiOutlineSquaresPlus>

              {showFullMenu && <p className="hidden lg:block">Add Category</p>}
            </span>
          </div>
        )}
      </NavLink>
      <NavLink title="All Sellers" to="/dashboard/all-sellers">
        {({ isActive }) => (
          <div className={isActive && "text-rose-400"}>
            <span className={`${commonClass}`}>
              <HiUsers className="h-7"></HiUsers>
              {showFullMenu && <p className="hidden lg:block">All Sellers</p>}
            </span>
          </div>
        )}
      </NavLink>
      <NavLink title="All Buyers" to="/dashboard/all-buyers">
        {({ isActive }) => (
          <div className={isActive && "text-rose-400"}>
            <span className={`${commonClass}`}>
              <FaUsers className="h-7"></FaUsers>
              {showFullMenu && <p className="hidden lg:block">All Buyers</p>}
            </span>
          </div>
        )}
      </NavLink>
      <NavLink title="All Admins" to="/dashboard/all-admins">
        {({ isActive }) => (
          <div className={isActive && "text-rose-400"}>
            <span className={`${commonClass}`}>
              <RiAdminFill className="h-7"></RiAdminFill>
              {showFullMenu && <p className="hidden lg:block">All Admins</p>}
            </span>
          </div>
        )}
      </NavLink>
      <NavLink title="Reported Items" to="/dashboard/reported-items">
        {({ isActive }) => (
          <div className={isActive && "text-rose-400"}>
            <span className={`${commonClass}`}>
              <MdReportOff className="h-7"></MdReportOff>
              {showFullMenu && (
                <p className="hidden lg:block">Reported Items</p>
              )}
            </span>
          </div>
        )}
      </NavLink>
    </nav>
  );
};

export default Dashboard;
