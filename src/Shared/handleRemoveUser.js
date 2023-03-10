import { toast } from "react-hot-toast";

export const handleRemoveUser = ({ email, refetch }) => {
  fetch(`https://baby-shop-server.vercel.app/remove-user/${email}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.deletedCount) {
        refetch();
        toast.success("user remove successfully");
      }
    });
};
