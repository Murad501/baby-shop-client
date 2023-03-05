import { createBrowserRouter } from "react-router-dom";
import Page404 from "../Components/Page404";
import Main from "../Layout/Main";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Blog from "../Pages/Blog/Blog";
import Home from "../Pages/Home/Home";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import SignIn from "../Pages/SignIn/SignIn";
import Signup from "../Pages/SignUp/SignUp";

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
        path: 'signup',
        element: <Signup></Signup>
      },
      {
        path: '/products/:id',
        element: <ProductDetails></ProductDetails>
      }
    ],
  },
]);
