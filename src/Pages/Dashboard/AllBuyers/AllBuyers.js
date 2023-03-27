import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { darkProvider } from "../../../Context/DarkContext";
import { userProvider } from "../../../Context/UserContext";
import { handleRemoveUser } from "../../../Shared/handleRemoveUser";

const AllBuyers = () => {
  const { isDark } = useContext(darkProvider);
  const { user } = useContext(userProvider);
  const {
    data: buyers = [],
    // isLoading,
    refetch,
  } = useQuery({
    queryKey: ["buyers"],
    queryFn: () =>
      fetch(`https://baby-shop-server.vercel.app/buyers/${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json()),
  });

  const handleMakeAdmin = (id) => {
    fetch(`https://baby-shop-server.vercel.app/admin/${id}`, {
      method: "PUT",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ email: user?.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          toast.success("admin make successfully");
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
        Buyer List
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
            {buyers.map((buyer, idx) => (
              <tr
                key={buyer._id}
                className={`border-b ${isDark && "border-gray-800"} `}
              >
                <th className="bg-transparent text-center">{idx + 1}</th>
                <td className="bg-transparent text-center">{buyer.name}</td>
                <td className="bg-transparent text-center">{buyer.email}</td>
                <td className="bg-transparent flex gap-5 justify-center items-center">
                  <button
                    onClick={() => handleMakeAdmin(buyer._id)}
                    className={`px-3 py-2 border ${
                      isDark && "border-gray-800"
                    } hover:text-rose-400`}
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() =>
                      handleRemoveUser({ email: buyer.email, refetch, user: user })
                    }
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

export default AllBuyers;
