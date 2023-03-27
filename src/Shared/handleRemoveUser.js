import { toast } from "react-hot-toast";

export const handleRemoveUser = ({ email, refetch, user }) => {
  console.log(user);
  fetch(`https://baby-shop-server.vercel.app/remove-user/${email}`, {
    method: "DELETE",
    headers: {
      'content-type':'application/json',
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({email: user?.email})
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.deletedCount) {
        refetch();
        toast.success("user remove successfully");
      }
    });
};
