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
import EditProduct from "../Pages/Dashboard/EditProduct/EditProduct";
import AllBuyers from "../Pages/Dashboard/AllBuyers/AllBuyers";
import AllAdmins from "../Pages/Dashboard/AllAdmins/AllAdmins";
import ReportedProducts from "../Pages/Dashboard/ReportedProducts/ReportedProducts";
import PaymentDetails from "../Components/PaymentDetails/PaymentDetails";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

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
        path: "/shop",
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
        path: "/products/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/categories/:id",
        element: <CategoryProducts></CategoryProducts>,
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <PaymentDetails></PaymentDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
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
        element: (
          <AdminRoute>
            <AddCategory></AddCategory>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-sellers",
        element: (
          <AdminRoute>
            <AllSellers></AllSellers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-buyers",
        element: (
          <AdminRoute>
            <AllBuyers></AllBuyers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-admins",
        element: (
          <AdminRoute>
            <AllAdmins></AllAdmins>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/my-products",
        element: <MyProducts></MyProducts>,
      },

      {
        path: "/dashboard/reported-items",
        element: (
          <AdminRoute>
            <ReportedProducts></ReportedProducts>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/product/edit/:id",
        element: <EditProduct></EditProduct>,
      },
    ],
  },
]);
