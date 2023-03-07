import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import DarkContext from "./Context/DarkContext";
import UserContext from "./Context/UserContext";
import LoadingContext from "./Context/LoadingContext";
import { QueryClient, QueryClientProvider } from "react-query";
import CategoryContext from "./Context/CategoryContext";
import ProductContext from "./Context/ProductContext";
import DashboardContext from "./Context/DashboardContext";

// Create a client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DarkContext>
        <ProductContext>
          <UserContext>
            <CategoryContext>
              <LoadingContext>
                <DashboardContext>
                  <App />
                </DashboardContext>
              </LoadingContext>
            </CategoryContext>
          </UserContext>
        </ProductContext>
      </DarkContext>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
