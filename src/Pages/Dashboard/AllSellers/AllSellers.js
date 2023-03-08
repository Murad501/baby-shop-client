import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { darkProvider } from "../../../Context/DarkContext";
import { handleRemoveUser } from "../../../Shared/handleRemoveUser";

const AllSellers = () => {
  const { isDark } = useContext(darkProvider);
  const {
    data: sellers = [],
    // isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: () =>
      fetch("http://localhost:5000/sellers").then((res) => res.json()),
  });

  const handleVerifySeller = (id) => {
    fetch(`http://localhost:5000/seller/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          toast.success("user verified successful");
        }
      });
  };

  return (
    <div>
      <h1
        className={`text-4xl font-bold text-center mb-10 ${
          !isDark && "text-rose-400"
        }`}
      >
        Seller List
      </h1>
      <div className="overflow-x-auto">
        <table className={`table w-full border ${isDark && "border-gray-800"}`}>
          {/* head */}
          <thead>
            <tr className={`border-b ${isDark && "border-gray-800"} `}>
              <th className="bg-transparent font-bold text-[14px] text-center">
                SN
              </th>
              <th className="bg-transparent font-bold text-[14px] text-center w-2/5">
                Name
              </th>
              <th className="bg-transparent font-bold text-[14px] text-center w-3/5">
                Email
              </th>
              <th className="bg-transparent font-bold text-[14px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, idx) => (
              <tr
                key={seller._id}
                className={`border-b ${isDark && "border-gray-800"} `}
              >
                <th className="bg-transparent text-center">{idx + 1}</th>
                <td className="bg-transparent text-center">{seller.name}</td>
                <td className="bg-transparent text-center">{seller.email}</td>
                <td className="bg-transparent flex gap-5 justify-center items-center">
                  <button
                    disabled={seller.isVerified}
                    onClick={() => handleVerifySeller(seller._id)}
                    className={`px-3 py-2 border ${
                      seller.isVerified && "bg-rose-400 text-white"
                    } ${isDark && "border-gray-800"} ${
                      !seller.isVerified && "hover:text-rose-400"
                    }`}
                  >
                    {seller.isVerified ? "Verified" : "Verify"}
                  </button>
                  <button
                    onClick={() => handleRemoveUser({email: seller.email, refetch})}
                    className={`px-3 py-2 border ${
                      isDark && "border-gray-800"
                    } hover:text-rose-400`}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSellers;
