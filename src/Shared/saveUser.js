export const saveUser = (user) => {
  fetch(`https://baby-shop-server.vercel.app/user`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then(() => {});
};
