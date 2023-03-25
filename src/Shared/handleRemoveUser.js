import { toast } from "react-hot-toast";

export const handleRemoveUser = ({ email, refetch }) => {
  fetch(`http://localhost:5000/remove-user/${email}`, {
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
