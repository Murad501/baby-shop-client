import React, { useContext } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { darkProvider } from "../Context/DarkContext";
import { dashboardProvider } from "../Context/DashboardContext";
import Dashboard from "../Pages/Dashboard/Dashboard";

const DashboardLayout = () => {
  const { showFullMenu, setShowFullMenu } = useContext(dashboardProvider);
  const {isDark} = useContext(darkProvider)
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative">
        <Navbar></Navbar>
      </div>
      <div className="flex-1">
        <div className="flex flex-col md:flex-row">
          <div
            className={` ${
              showFullMenu ? "md:w-20 lg:w-60" : "md:w-20"
            } w-full h-full transition-width duration-1000 sticky top-0 md:left-0  md:block ${isDark ? 'bg-black border-gray-800': 'bg-white'}`}
          >
            <div className="hidden lg:block">
              {showFullMenu ? (
                <MdKeyboardArrowLeft
                  onClick={() => setShowFullMenu(false)}
                  className={`absolute top-2 -right-[14px] rounded-full border ${isDark ? 'bg-black border-gray-800 hover:bg-rose-400': 'bg-white'} hover:bg-rose-400 w-7 h-7 hover:text-white`}
                ></MdKeyboardArrowLeft>
              ) : (
                <MdKeyboardArrowRight
                  onClick={() => setShowFullMenu(true)}
                  className={`absolute top-2 -right-[14px] rounded-full border ${isDark ? 'bg-black border-gray-800 hover:bg-rose-400': 'bg-white'} hover:bg-rose-400 w-7 h-7 hover:text-white`}
                ></MdKeyboardArrowRight>
              )}
            </div>

            <Dashboard></Dashboard>
          </div>
          <div className="flex-1 p-1 md:p-5 md:border-l">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
