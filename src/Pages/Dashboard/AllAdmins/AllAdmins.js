import React, { useContext } from "react";
import { useQuery } from "react-query";
import { darkProvider } from "../../../Context/DarkContext";
import { userProvider } from "../../../Context/UserContext";
import { handleRemoveUser } from "../../../Shared/handleRemoveUser";

const AllAdmins = () => {
  const { isDark } = useContext(darkProvider);
  const { user } = useContext(userProvider);
  const {
    data: admins = [],
    // isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admins"],
    queryFn: () =>
      fetch(`http://localhost:5000/admins/${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json()),
  });

  return (
    <div>
      <h1
        className={`text-4xl font-bold text-center mb-10 ${
          !isDark && "text-rose-400"
        }`}
      >
        Admin List
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
            {admins.map((admin, idx) => (
              <tr
                key={admin._id}
                className={`border-b ${isDark && "border-gray-800"} `}
              >
                <th className="bg-transparent text-center">{idx + 1}</th>
                <td className="bg-transparent text-center">{admin.name}</td>
                <td className="bg-transparent text-center">{admin.email}</td>
                <td className="bg-transparent flex gap-5 justify-center items-center">
                  <button
                    onClick={() =>
                      handleRemoveUser({ email: admin.email, refetch, user: user })
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

export default AllAdmins;
