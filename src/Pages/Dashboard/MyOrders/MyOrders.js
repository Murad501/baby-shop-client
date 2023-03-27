import React, { useContext } from "react";
import { FaDownload } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { darkProvider } from "../../../Context/DarkContext";
import { userProvider } from "../../../Context/UserContext";

const MyOrders = () => {
  const { user } = useContext(userProvider);
  const { isDark } = useContext(darkProvider);
  const { data: myOrders = [] } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () =>
      fetch(`http://localhost:5000/my-orders/${user.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json()),
  });

  const handleInvoiceDownload = async (invoiceId) => {
    try {
      console.log(invoiceId);
      const response = await fetch(
        `http://localhost:5000/invoices/${invoiceId}/download`
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {myOrders.length ? (
        <div>
          <h1
            className={`text-4xl font-bold text-center mb-10 ${
              !isDark && "text-rose-400"
            }`}
          >
            order List
          </h1>
          <div className="overflow-x-auto">
            <table
              className={`table w-full border ${isDark && "border-gray-800"}`}
            >
              {/* head */}
              <thead>
                <tr className={`border-b ${isDark && "border-gray-800"} `}>
                  <th className="bg-transparent font-bold text-[14px] text-center">
                    SN
                  </th>
                  <th className="bg-transparent font-bold text-[14px] text-center w-2/5">
                    Product Name
                  </th>
                  <th className="bg-transparent font-bold text-[14px] text-center w-3/5">
                    Transition Id
                  </th>
                  <th className="bg-transparent font-bold text-[14px] text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order, idx) => (
                  <tr
                    key={order._id}
                    className={`border-b ${isDark && "border-gray-800"} `}
                  >
                    <th className="bg-transparent text-center">{idx + 1}</th>
                    <td className="bg-transparent text-center">
                      {order.productName}
                    </td>
                    <td className="bg-transparent text-center">
                      {order.transitionId}
                    </td>
                    <td className="bg-transparent flex gap-5 justify-center items-center">
                      <button
                        onClick={() => handleInvoiceDownload(order?.productId)}
                        className={`px-3 py-2 border ${
                          isDark && "border-gray-800"
                        } hover:text-rose-400 flex justify-center items-center gap-2`}
                      >
                        <FaDownload></FaDownload>
                        Download Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl">
            Your order list is empty.{" "}
            <Link to="/shop" className="font-semibold text-rose-400">
              Shop Now
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default MyOrders;
