import React, { useContext } from "react";
import { useQuery } from "react-query";
import { darkProvider } from "../../../Context/DarkContext";

const AllSellers = () => {
  const { isDark } = useContext(darkProvider);
  const {
    data: sellers = [],
    // isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: () =>
      fetch("http://localhost:5000/sellers").then((res) => res.json()),
  });
  console.log(sellers);

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
              <th className="bg-transparent font-bold text-[14px]">SN</th>
              <th className="bg-transparent font-bold text-[14px]">Name</th>
              <th className="bg-transparent font-bold text-[14px]">Email</th>
              <th className="bg-transparent font-bold text-[14px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th className="bg-transparent" >1</th>
              <td className="bg-transparent">Cy Ganderton</td>
              <td className="bg-transparent" >Quality Control Specialist</td>
              <td className="bg-transparent" >Blue</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th className="bg-transparent" >2</th>
              <td className="bg-transparent" >Hart Hagerty</td>
              <td className="bg-transparent" >Desktop Support Technician</td>
              <td className="bg-transparent" >Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th className="bg-transparent">3</th>
              <td className="bg-transparent">Brice Swyre</td>
              <td className="bg-transparent">Tax Accountant</td>
              <td className="bg-transparent">Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSellers;
