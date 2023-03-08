import { createBrowserRouter } from "react-router-dom";
import Page404 from "../Components/Page404";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import AddCategory from "../Pages/Dashboard/AddCategory/AddCategory";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Blog from "../Pages/Blog/Blog";
import CategoryProducts from "../Pages/CategoryProducts/CategoryProducts";
import Home from "../Pages/Home/Home";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import SignIn from "../Pages/SignIn/SignIn";
import Signup from "../Pages/SignUp/SignUp";
import MyProducts from "../Pages/Dashboard/MyProducts/MyProducts";
import AllSellers from "../Pages/Dashboard/AllSellers/AllSellers";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Page404></Page404>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "all-products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "/add-product",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/add-category",
        element: <AddCategory></AddCategory>,
      },
      {
        path: "all-products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/products/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/categories/:id",
        element: <CategoryProducts></CategoryProducts>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    errorElement: <Page404></Page404>,
    children: [
      {
        path: "/dashboard",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/add-product",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/add-category",
        element: <AddCategory></AddCategory>,
      },
      {
        path: "/dashboard/all-sellers",
        element: <AllSellers></AllSellers>,
      },
      {
        path: "/dashboard/my-products",
        element: <MyProducts></MyProducts>,
      },
    ],
  },
]);
